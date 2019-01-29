using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpServer.Models
{
    public class FileQueue
    {
        public string System_File_UID { get; set; }

        public string System_Client_UID { get; set; }

        public string System_File_FileName { get; set; }

        public byte[] System_File_BLOB { get; set; }

        public DateTime System_File_CreateDate { get; set; }

        public string System_File_SpecialUID1 { get; set; }
    }
}
