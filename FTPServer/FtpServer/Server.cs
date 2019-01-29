using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FtpServer
{
    public class Server
    {
        private TcpListener _server;


        public Server()
        {

        }

        public void Start()
        {
            //port 21 explicit FTP
            _server = new TcpListener(IPAddress.Any, 21);
            _server.Start();
            _server.BeginAcceptTcpClient(HandleAcceptTcpClient, _server);
           
        }

        private void HandleAcceptTcpClient(IAsyncResult ar)
        {
            _server.BeginAcceptTcpClient(HandleAcceptTcpClient, _server);
            
            TcpClient _client = _server.EndAcceptTcpClient(ar);
            ClientConnection conection = new ClientConnection(_client);

            ThreadPool.QueueUserWorkItem(conection.HandleClient, _client);
            Console.WriteLine("Client connected");
        }
    }
}
