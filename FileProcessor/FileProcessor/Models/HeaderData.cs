using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseComponent.Models
{
    public class HeaderData
    {
        public string POS_Report_Data_UID { get; set; }

        public string POS_Report_Header_UID { get; set; }

        public string POS_Terminal_UID { get; set; }

        public int POS_Report_Data_Date { get; set; }

        public int POS_Report_Data_Number { get; set; }

        public int POS_Report_Data_ItemNr { get; set; }

        public string POS_Report_Data_ItemName { get; set; }

        public int POS_Report_Data_ItemGrp { get; set; }

        public int POS_Report_Data_ItemDep { get; set; }

        public int POS_Report_Data_Quantity { get; set; }

        public decimal POS_Report_Data_Amount { get; set; }

        public int POS_Report_Data_DiscountQuantity { get; set; }

        public decimal POS_Report_Data_DiscountAmount { get; set; }

        public int POS_Report_Data_TypeID { get; set; }

        public HeaderData()
        {

        }
    }
}
