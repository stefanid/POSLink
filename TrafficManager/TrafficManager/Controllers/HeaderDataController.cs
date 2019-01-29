using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using DatabaseComponent;
using TrafficManager.Models;
using System.Data;

namespace TrafficManager.Controllers
{
    public class HeaderDataController
    {
      
        private string _headerDataConnnectionString = ConfigurationManager.AppSettings.Get("headerDataConnectionString");
        private string _integrationConnectionString = ConfigurationManager.AppSettings.Get("integrationConnectionString");
        public HeaderDataController()
        {
        }

        public bool getHeaderData(string Header_UID)
        {
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_headerDataConnnectionString);
            List<int> preContainedTypeIds = new List<int>() { 312, 313, 314, 315, 316 };
            List<int> typeIDs = new List<int>();
            string getHeaderDataQuery = "SELECT POS_Report_Data_TypeID FROM pos_report_data WHERE POS_Report_Header_UID = @POS_Report_Header_UID";
            _dbLayer.AddParameter("@POS_Report_Header_UID", Header_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            DataSet dataSet = _dbLayer.runSQLDataSet(getHeaderDataQuery);
            if (dataSet.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                {
                    var POS_Report_Data_TypeID = Int32.Parse(dataSet.Tables[0].Rows[i]["POS_Report_Data_TypeID"].ToString());
                    typeIDs.Add(POS_Report_Data_TypeID);
                }
                var distinct = typeIDs.Distinct().ToList();
                if (distinct.All(x => preContainedTypeIds.Contains(x)))
                {
                    return true;
                }
                else
                {
                    return false;
                }                
            }
            return false;
        }

        public string getClient(string Header_UID)
        {
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_headerDataConnnectionString);
            string Client_UID = null;
            string getClient = "SELECT System_Client_UID FROM pos_report_header WHERE POS_Report_Header_UID = @POS_Report_Header_UID";
            _dbLayer.AddParameter("@POS_Report_Header_UID", Header_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            DataSet headerDT = _dbLayer.runSQLDataSet(getClient);
            if(headerDT.Tables[0].Rows.Count > 0)
            {
                 Client_UID = headerDT.Tables[0].Rows[0]["System_Client_UID"].ToString();

            }
            return Client_UID;
        }

        public int getTypes(string Client_UID)
        {
            int typeID = 0;
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_integrationConnectionString);
            string getTypeQuery = "SELECT Integration_Connection_TypeID FROM integration_connection WHERE System_Client_UID = @System_Client_UID";
            _dbLayer.AddParameter("@System_Client_UID", Client_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            DataSet typeDT = _dbLayer.runSQLDataSet(getTypeQuery);
            if(typeDT.Tables[0].Rows.Count > 0)
            {
                typeID = Int32.Parse(typeDT.Tables[0].Rows[0]["Integration_Connection_TypeID"].ToString());
            }
            return typeID;

        }
    }
}
