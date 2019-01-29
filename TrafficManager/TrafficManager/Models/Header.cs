using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrafficManager.Models
{
    public class Header
    {

        public string POS_Report_Header_UID { get; set; }

        public string POS_Terminal_UID { get; set; }

        public string System_Client_UID { get; set; }

        public int POS_Report_Header_Date { get; set; }

        public int POS_Report_Header_Number { get; set; }

        public Header()
        {

        }
    }
}
