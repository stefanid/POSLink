using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpServer.Models
{
    public class Log
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string IPAddress { get; set; }

        public string FileName { get; set; }

        public string Exception { get; set; }
    }
}
