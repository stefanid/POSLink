using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DatabaseComponent.Models
{
    public class FileQueue
    {
        public string System_File_UID { get; set; }

        public string System_Client_UID { get; set; }

        public string System_File_FileName { get; set; }

        public byte[] System_File_BLOB { get; set; }

        public DateTime System_File_CreateDate { get; set; }

        public string System_File_SpecialUID1 { get; set; }



        public FileQueue()
        {

        }

        public List<string> readFile(byte[] file)
        {
           
            List<string> returnString = new List<string>();
            using (var ms = new MemoryStream(file))
            {
                TextReader tr = new StreamReader(ms);
                string line;
                while ((line = tr.ReadLine()) != null)
                {
                    returnString.Add(line);
                }
            }
            return returnString;
        }

        public string[] splitLine(string line)
        {
            if (line != null)
            {
                var lines = line.Split(',');
                for (int i = 0; i < lines.Length; i++)
                {
                    lines[i] = lines[i].Replace("\"", "");
                }
                return lines;
            }
            return null;
        }
    }
}
