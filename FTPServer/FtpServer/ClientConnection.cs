using FtpServer.Models;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Configuration;

namespace FtpServer
{
    public class ClientConnection
    {
        private TcpClient _clientController;
        private TcpListener _passiveListener;
        private TcpClient _dataClient;

        private NetworkStream _nsController;
        private StreamReader _readerController;
        private StreamWriter _writerController;

        private DataConnectionType _dataConnectionType = DataConnectionType.Active;
        private DatabaseConnectionManager databaseConnectionManager;

        private string sUsername;
        private string _transferType;
        private string _currentDirectory;
        private string _root;
        private long _streamLength;
        private string ipConfiguration;
        private ConnectionFactory _factory;

        private List<string> _validCommands;
        private IPEndPoint _dataEndpoint;
        private StreamReader _dataReader;
        private StreamWriter _dataWriter;
        private POS_Terminal_Connection posLink;
        private POS_Terminal _posTerminal;
        private MemoryDirectory _memoryDirectory;
        private System_Folder _systemFolder;



        public ClientConnection(TcpClient client)
        {
            _clientController = client;
            _nsController = _clientController.GetStream();
            _readerController = new StreamReader(_nsController);
            _writerController = new StreamWriter(_nsController);
            _validCommands = new List<string>();
            posLink = new POS_Terminal_Connection();
            _memoryDirectory = new MemoryDirectory();
            _posTerminal = new POS_Terminal();
            _systemFolder = new System_Folder();
            ipConfiguration = ConfigurationManager.AppSettings.Get("publicAdress"); 
            _factory = new ConnectionFactory() { HostName = "localhost", RequestedHeartbeat = 30 };
            databaseConnectionManager = new DatabaseConnectionManager();
        }


        public void HandleClient(object obj)
        {
            _writerController.WriteLine("220 Service Ready.");
            _writerController.Flush();

            _validCommands.AddRange(new string[] { "AUTH", "USER", "PASS", "QUIT", "HELP", "NOOP" });

            string line;
            _dataClient = new TcpClient();
            string renameFrom = null;
            try
            {
                while ((line = _readerController.ReadLine()) != null)
                {
                    string response = null;

                    string[] command = line.Split(' ');

                    string cmd = command[0].ToUpperInvariant();
                    Console.WriteLine(cmd);
                    string arguments = command.Length > 1 ? line.Substring(command[0].Length + 1) : null;
                    if (arguments != null && arguments.Trim().Length == 0)
                    {
                        arguments = null;
                    }
                    if (cmd != "RNTO")
                    {
                        renameFrom = null;
                    }
                    if (response == null)
                    {
                        switch (cmd)
                        {
                            case "USER":
                                response = User(arguments);
                                break;
                            case "PASS":
                                response = Password(arguments, sUsername);
                                break;
                            case "CWD":
                                response = ChangeWorkingDirectory(arguments);
                                break;
                            case "CDUP":
                                response = ChangeWorkingDirectory("..");
                                break;
                            case "QUIT":
                                response = "221 Service closing control connection";
                                break;
                            case "PORT":
                                response = Port(arguments);
                                break;
                            case "PASV":
                                response = Passive();
                                break;
                            case "TYPE":
                                response = Type(command[1], command.Length == 3 ? command[2] : null);
                                break;
                            case "MODE":
                                response = Mode(arguments);
                                break;
                            case "RNFR":
                                renameFrom = arguments;
                                response = "350 Requested file action pending further information";
                                break;
                            case "RNTO":
                                response = Rename(renameFrom, arguments);
                                break;
                            case "DELE":
                                response = Delete(arguments);
                                break;
                            case "STOR":
                                response = Store(arguments);
                                break;
                            case "LIST":
                                response = List(arguments ?? _currentDirectory);
                                break;
                            case "FEAT":
                                response = FeatureList();
                                break;
                            case "AUTH":
                                response = Auth(arguments);
                                break;
                            case "OPTS":
                                response = Options(arguments);
                                break;

                            default:
                                response = "502 Command not implemented";
                                break;
                        }
                    }

                    if (_clientController == null || !_clientController.Connected)
                    {
                        break;
                    }
                    else
                    {
                        _writerController.WriteLine(response);
                        _writerController.Flush();

                        if (response.StartsWith("221"))
                        {
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        private string Delete(string pathname)
        {
            addToDatabase();
            return "250	Requested file action okay, completed.";
        }

        private string Mode(string mode)
        {
            if (mode.ToUpperInvariant() == "S")
            {
                return "200 OK";
            }
            else
            {
                return "504 Command not implemented for that parameter";
            }
            throw new NotImplementedException();
        }

        private string Auth(string authMode)
        {
            if (authMode == "TLS")
            {
                return "234 Enabling TLS Connection";
            }
            else
            {
                return "504 Unrecognized AUTH mode";
            }
        }

        private string Options(string arguments)
        {
            return "200 Looks good to me...";
        }

        private string Rename(string renameFrom, string renameTo)
        {
            if (string.IsNullOrWhiteSpace(renameFrom) || string.IsNullOrWhiteSpace(renameTo))
            {
                return "450 Requested file action not taken";
            }
            if (renameFrom != null && renameTo != null)
            {
                _memoryDirectory.IncomingFileName = renameFrom;
                _memoryDirectory.RealFileName = renameTo;

                return "250 Requested file action okay, completed";
            }

            return "450 Requested file action not taken";

        }

        private string addToDatabase()
        {
            if (Rename(_memoryDirectory.IncomingFileName, _memoryDirectory.RealFileName) == "250 Requested file action okay, completed")
            {
                var dbConnection = databaseConnectionManager.connectToFileDB();
                string spFolder = "AddUpdateFolder";
                dbConnection.AddParameter("_system_Folder_UID", null, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                dbConnection.AddParameter("_system_Client_UID", posLink.System_Client_UID.ToString(), MySql.Data.MySqlClient.MySqlDbType.VarChar);
                dbConnection.AddParameter("_system_Folder_PUID", null, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                dbConnection.AddParameter("_system_Folder_Name", _memoryDirectory.Path, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                DataSet folderDT = dbConnection.runSPDataSet(spFolder);
                if (folderDT.Tables[0].Rows.Count > 0)
                {
                    _systemFolder.System_Folder_UID = Guid.Parse(folderDT.Tables[0].Rows[0]["System_Folder_UID"].ToString());

                    string spFile = "AddUpdateFile";
                    dbConnection.AddParameter("_system_File_UID", null, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_Client_UID", posLink.System_Client_UID.ToString(), MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_FileName", _memoryDirectory.RealFileName, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_Path", _memoryDirectory.Path, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_ContentType", null, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_BLOB", _memoryDirectory.BinaryFile, MySql.Data.MySqlClient.MySqlDbType.Blob);
                    dbConnection.AddParameter("_system_File_SpecialUID1", posLink.POS_Terminal_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_SpecialUID2", null, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_SpecialUID3", null, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_Folder_UID", _systemFolder.System_Folder_UID.ToString(), MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    dbConnection.AddParameter("_system_File_TypeID", 10, MySql.Data.MySqlClient.MySqlDbType.Int32);
                    DataSet fileDT = dbConnection.runSPDataSet(spFile);
                    if (fileDT.Tables[0].Rows.Count > 0)
                    {
                        FileQueue fileQueue = new FileQueue();
                        fileQueue.System_File_UID = fileDT.Tables[0].Rows[0]["System_File_UID"].ToString();
                        fileQueue.System_Client_UID = posLink.System_Client_UID.ToString();
                        fileQueue.System_File_FileName = _memoryDirectory.RealFileName;
                        fileQueue.System_File_BLOB = _memoryDirectory.BinaryFile;
                        fileQueue.System_File_SpecialUID1 = posLink.POS_Terminal_UID.ToString();

                        try
                        {
                            using (var connection = _factory.CreateConnection())
                            {
                                using (var channel = connection.CreateModel())
                                {
                                    channel.QueueDeclare(queue: "FileQueue", durable: true, exclusive: false, autoDelete: false, arguments: null);
                                    var body = Encoding.UTF8.GetBytes(fileQueue.System_File_UID);
                                    var properties = channel.CreateBasicProperties();
                                    properties.Persistent = true;
                                    channel.BasicPublish(exchange: "", routingKey: "FileQueue", basicProperties: null, body: body);
                                    Console.WriteLine("File " + fileQueue.System_File_FileName + " is queued");
                                    return "250	Requested file action okay, completed.";
                                }
                            }
                        }
                        catch (RabbitMQ.Client.Exceptions.ConnectFailureException ex)
                        {
                            Log logDetails = new Log();
                            var exception = ex.Message;
                            logDetails.Exception = exception;
                            using (StreamWriter w = File.AppendText("Log.txt"))
                            {
                                Log(logDetails, w);
                            }
                        }


                    }

                }
            }
            return "450	Requested file action not taken.";
        }



        //Ftp commands

        private string User(string username)
        {
            var dbConnection = databaseConnectionManager.connectToTerminalDB();
            var getUserQuery = "SELECT Terminal_Connection_Username FROM terminal_connection" +
                               " WHERE Terminal_Connection_Username = @Terminal_Connection_Username";
            dbConnection.AddParameter("Terminal_Connection_Username", username, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            DataSet userDT = dbConnection.runSQLDataSet(getUserQuery);
            if (userDT.Tables[0].Rows.Count > 0)
            {
                sUsername = userDT.Tables[0].Rows[0]["Terminal_Connection_Username"].ToString();
                return "331 Username ok, need password";
            }

            return "530 Login incorrect.";

        }

        private string Password(string password, string username)
        {
            if (username != null || password != null)
            {
                var dbConnection = databaseConnectionManager.connectToTerminalDB();
                var getTerminalInformationConnectionQuery = "SELECT Terminal_Connection_UID, System_Client_UID, Terminal_Connection_Username, Terminal_UID" +
                                                          " FROM terminal_connection WHERE Terminal_Connection_Password = @Terminal_Connection_Password" +
                                                          " AND Terminal_Connection_Username = @Terminal_Connection_Username";
                dbConnection.AddParameter("Terminal_Connection_Password", password, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                dbConnection.AddParameter("Terminal_Connection_Username", username, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                DataSet userDT = dbConnection.runSQLDataSet(getTerminalInformationConnectionQuery);
                if (userDT.Tables[0].Rows.Count > 0)
                {
                    posLink.POS_Terminal_UID = Guid.Parse(userDT.Tables[0].Rows[0]["Terminal_UID"].ToString());
                    posLink.System_Client_UID = Guid.Parse(userDT.Tables[0].Rows[0]["System_Client_UID"].ToString());
                    posLink.Username = userDT.Tables[0].Rows[0]["Terminal_Connection_Username"].ToString();
                    var updateLastSynced = "UPDATE terminal_connection" +
                        " SET Terminal_Connection_LastSync = @Terminal_Connection_LastSync " +
                        "WHERE Terminal_UID = @Terminal_UID";                  
                    dbConnection.AddParameter("Terminal_Connection_LastSync", DateTime.Now, MySql.Data.MySqlClient.MySqlDbType.DateTime);
                    dbConnection.AddParameter("Terminal_UID", posLink.POS_Terminal_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
                    DataSet terminalDateSync = dbConnection.runSQLDataSet(updateLastSynced);
                    return "230 User logged in";
                }
                else
                {
                    Log failedLogin = new Log();
                    failedLogin.Username = username;
                    failedLogin.Password = password;

                    var ipAddress = _clientController.Client.LocalEndPoint.ToString();
                    int index = ipAddress.IndexOf(":");
                    ipAddress = ipAddress.Substring(0, index);
                    failedLogin.IPAddress = ipAddress;
                    using (StreamWriter w = File.AppendText("Log.txt"))
                    {
                        Log(failedLogin, w);
                    }
                    return "530 Login or password incorrect!";
                }
            }
            return "530 Login or password incorrect!";

        }

        private string Type(string typeCode, string formatControl)
        {
            string response = "";

            switch (typeCode)
            {
                case "A":
                case "I":
                    _transferType = typeCode;
                    response = "200 OK";
                    break;
                case "E":
                case "L":
                default:
                    return response = "504 Command not implemented for that parameter.";

            }

            if (formatControl != null)
            {
                switch (formatControl)
                {
                    case "N":
                        response = "200 OK";
                        break;
                    case "T":
                    case "C":
                    default:
                        return response = "504 Command not implemented for that parameter.";

                }
            }
            return string.Format("200 Type set to {0}", typeCode);

        }

        //tells the server to connect to specific address and port
        private string Port(string hostPort)
        {
            _dataConnectionType = DataConnectionType.Active;
            string[] ipAndPort = hostPort.Split(',');

            byte[] ipAddress = new byte[4];
            byte[] port = new byte[2];

            for (int i = 0; i < 4; i++)
            {
                ipAddress[i] = Convert.ToByte(ipAndPort[i]);
            }

            for (int i = 4; i < 6; i++)
            {
                port[i - 4] = Convert.ToByte(ipAndPort[i]);
            }

            if (BitConverter.IsLittleEndian)
                Array.Reverse(port);

            _dataEndpoint = new IPEndPoint(new IPAddress(ipAddress), BitConverter.ToInt16(port, 0));

            return "200 Data Connection Established";
        }

        //tells the server to open a port to listen to instead of connecting directly to client.
        private string Passive()
        {
            _dataConnectionType = DataConnectionType.Passive; 
            IPAddress localAddress = ((IPEndPoint)_clientController.Client.LocalEndPoint).Address;

            _passiveListener = new TcpListener(localAddress, 0);
            _passiveListener.Start();

            IPEndPoint localEndpoint = ((IPEndPoint)_passiveListener.LocalEndpoint);
            if(ipConfiguration != null)
            {
                IPAddress publicIP = IPAddress.Parse(ipConfiguration);
                localEndpoint.Address = publicIP;
            }
            byte[] address = localEndpoint.Address.GetAddressBytes();
            short port = (short)localEndpoint.Port;

            byte[] portArray = BitConverter.GetBytes(port);

            if (BitConverter.IsLittleEndian)
                Array.Reverse(portArray);
            string response = string.Format("227 Entering Passive Mode ({0},{1},{2},{3},{4},{5})",
                          address[0], address[1], address[2], address[3], portArray[0], portArray[1]);
            Console.WriteLine(response);

            return response;
        }

        //sends list of file system entries for the specified directory
        private string List(string pathname)
        {
            pathname = NormalizeFilename(pathname);
            if (pathname == null)
            {
                pathname = string.Empty;
            }
            else
            {
                if (_dataConnectionType == DataConnectionType.Active)
                {
                    _dataClient = new TcpClient();
                    _dataClient.BeginConnect(_dataEndpoint.Address, _dataEndpoint.Port, DoList, pathname);

                    return string.Format("150 Opening {0} mode data transfer for LIST", _dataConnectionType);
                }
                else
                {
                    _passiveListener.BeginAcceptTcpClient(DoList, pathname);
                }

                return string.Format("150 Opening {0} mode data transfer for LIST", _dataConnectionType);
            }
            return "450 Requested file action not taken";
        }


        private void DoList(IAsyncResult ar)
        {
            if (_dataConnectionType == DataConnectionType.Active)
            {
                _dataClient.EndConnect(ar);
            }
            else
            {
                _dataClient = _passiveListener.EndAcceptTcpClient(ar);
            }
            string pathname = (string)ar.AsyncState;
            pathname = _currentDirectory;

            using (NetworkStream dataStream = _dataClient.GetStream())
            {
                _dataReader = new StreamReader(dataStream, Encoding.ASCII);
                _dataWriter = new StreamWriter(dataStream, Encoding.ASCII);


                string date = _memoryDirectory.LastWriteTime < DateTime.Now - TimeSpan.FromDays(180) ?
                    _memoryDirectory.LastWriteTime.ToString("MMM dd  yyyy") :
                    _memoryDirectory.LastWriteTime.ToString("MMM dd HH:mm");

                string line = string.Format("drwxr-xr-x    2 2003     2003     {0,8} {1} {2}", "4096", date, _memoryDirectory.Path);

                _dataWriter.WriteLine(line);
                _dataWriter.Flush();


                date = _memoryDirectory.LastWriteTime < DateTime.Now - TimeSpan.FromDays(180) ?
                   _memoryDirectory.LastWriteTime.ToString("MMM dd  yyyy") :
                   _memoryDirectory.LastWriteTime.ToString("MMM dd HH:mm");

                line = string.Format("-rw-r--r--    2 2003     2003     {0,8} {1} {2}", _streamLength, date, _memoryDirectory.IncomingFileName);

                _dataWriter.WriteLine(line);
                _dataWriter.Flush();


                _dataClient.Close();
                _dataClient = null;

                _writerController.WriteLine("226 Transfer complete");
                _writerController.Flush();
            }
        }

        private bool isPathValid(string pathname)
        {
            return pathname.StartsWith(_root);
        }

        private string Store(string pathname)
        {
            _memoryDirectory.IncomingFileName = pathname;

            if (pathname != null)
            {
                if (_dataConnectionType == DataConnectionType.Active)
                {
                    _dataClient = new TcpClient(_dataEndpoint.AddressFamily);
                    _dataClient.BeginConnect(_dataEndpoint.Address, _dataEndpoint.Port, DoStore, pathname);

                    return "226 Closing data connection, file transfer successful";
                }
                else
                {
                    _passiveListener.BeginAcceptTcpClient(DoStore, pathname);
                    return string.Format("150 Opening {0} mode data transfer for STOR", _dataConnectionType);
                }
            }
            return "450 Requested file action not taken";
        }

        private void DoStore(IAsyncResult ar)
        {
            if (_dataConnectionType == DataConnectionType.Active)
            {
                _dataClient.EndConnect(ar);
            }
            else
            {
                _dataClient = _passiveListener.EndAcceptTcpClient(ar);
            }

            string pathname = (string)ar.AsyncState;
            _memoryDirectory.Path = _currentDirectory;
            _memoryDirectory.IncomingFileName = pathname;
            using (NetworkStream ns = _dataClient.GetStream())
            {

                string str;
                byte[] data = new byte[4096];
                using (_memoryDirectory.Blob = new MemoryStream())
                {

                    int numBytesRead;
                    while ((numBytesRead = ns.Read(data, 0, data.Length)) > 0)
                    {
                        _memoryDirectory.Blob.Write(data, 0, numBytesRead);


                    }
                    str = Encoding.ASCII.GetString(_memoryDirectory.Blob.ToArray(), 0, (int)_memoryDirectory.Blob.Length);
                    _memoryDirectory.BinaryFile = Encoding.UTF8.GetBytes(str);
                }

                _streamLength = _memoryDirectory.BinaryFile.Length;
            }
            _writerController.WriteLine("226 Closing data connection, file transfer successful");
            _writerController.Flush();
        }

        private string FeatureList()
        {
            _writerController.WriteLine("211- Extensions supported:");
            _writerController.WriteLine(" MDTM");
            _writerController.WriteLine(" REST STREAM");
            _writerController.WriteLine(" SIZE");
            _writerController.WriteLine(" MLST type*;size*;modify*;");
            _writerController.WriteLine(" LIST");
            _writerController.WriteLine(" UTF8");
            _writerController.WriteLine(" CLNT");
            _writerController.WriteLine(" MFMT");
            _writerController.WriteLine(" EPSV");
            _writerController.WriteLine(" EPRT");
            return "211 End";
        }

        private string ChangeWorkingDirectory(string pathname)
        {
            _root = pathname;
            _currentDirectory = _root;

            return "250 Changed to new directory";
        }

        private string NormalizeFilename(string path)
        {
            if (path == null)
            {
                path = string.Empty;
            }

            if (path == "/")
            {
                return _root;
            }
            else if (path.StartsWith("/"))
            {
                path = Path.Combine(_root, path.Substring(1));
            }
            else
            {
                path = Path.Combine(_currentDirectory, path);
            }

            return path;
        }

        public static void Log(Log logUser, TextWriter w)
        {

            w.Write("\r\nLog Entry : ");
            w.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
             DateTime.Now.ToLongDateString());
            w.WriteLine("**");
            w.WriteLine("Username: {0}, Password: {1}, IPAddress: {2}", logUser.Username, logUser.Password, logUser.IPAddress);
            w.WriteLine("-------------------------------");
        }


        //enums
        private enum DataConnectionType
        {
            Passive,
            Active,
        }
    }
}
