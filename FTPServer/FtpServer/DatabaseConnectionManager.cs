using System.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpServer
{
    public class DatabaseConnectionManager
    {
        private string fileDBConnectionString;
        private string terminalDBConnectionString;

        public DatabaseConnectionManager()
        {
            fileDBConnectionString = ConfigurationManager.AppSettings.Get("fileConnectionString");
            terminalDBConnectionString = ConfigurationManager.AppSettings.Get("terminalConnectionString");
        }

        public DatabaseComponent.DatabaseAccessLayer connectToFileDB()
        {
            DatabaseComponent.DatabaseAccessLayer _dbFile = new DatabaseComponent.DatabaseAccessLayer(fileDBConnectionString);
            return _dbFile;
        }

        public DatabaseComponent.DatabaseAccessLayer connectToTerminalDB()
        {

            DatabaseComponent.DatabaseAccessLayer _dbTerminal = new DatabaseComponent.DatabaseAccessLayer(terminalDBConnectionString);
            return _dbTerminal;
        }

    }
}
