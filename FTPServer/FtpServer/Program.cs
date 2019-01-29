using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpServer
{
    class Program
    {
        static void Main(string[] args)
        {
            Server server = new Server();
            Console.WriteLine("FTP Server started");
            server.Start();
            



            Console.ReadKey();
        }
    }
}
