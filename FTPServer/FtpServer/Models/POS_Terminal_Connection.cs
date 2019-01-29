using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpServer.Models
{
    public class POS_Terminal_Connection
    {
        public Guid System_Client_UID { get; set; }

        public Guid POS_Terminal_UID { get; set; }

        public Guid POS_Terminal_Connection_UID { get; set; }

        public string Username { get; set; }

        public POS_Terminal_Connection()
        {

        }
    }
}
