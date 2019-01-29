using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace FtpServer
{
    public class MemoryDirectory
    {
        public Guid UID { get; set; }

        public string IncomingFileName { get; set; }

        public string RealFileName { get; set; }

        public string Path { get; set; }

        public MemoryStream Blob { get; set; }

        public byte[] BinaryFile { get; set; }


        public DateTime LastWriteTime { get; set; }


        public MemoryDirectory()
        {
           
        }
    }
}
