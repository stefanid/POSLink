using DatabaseComponent.Models;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseComponent;
using System.Data;

namespace FileProcessor.Controllers
{
    public class HeaderDataController
    {
        private Header _header;
        private string _headerDataConnnectionString = ConfigurationManager.AppSettings.Get("headerDataConnectionString");
        private string _fileConnectionString = ConfigurationManager.AppSettings.Get("fileConnectionString");

        public HeaderDataController()
        {
            _header = new Header();


        }

        private Header addUpdateHeader(Header header)
        {
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_headerDataConnnectionString);
            Header newHeader = new Header();
            string sp = "AddUpateHeader";
            _dbLayer.AddParameter("pos_report_header_uid_", header.POS_Report_Header_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_terminal_uid_", header.POS_Terminal_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("system_client_uid_", header.System_Client_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_header_date_", header.POS_Report_Header_Date, MySql.Data.MySqlClient.MySqlDbType.Int32);
            _dbLayer.AddParameter("pos_report_header_number_", header.POS_Report_Header_Number, MySql.Data.MySqlClient.MySqlDbType.Int32);

            DataSet headerDT = _dbLayer.runSPDataSet(sp);
            if (headerDT.Tables[0].Rows.Count > 0)
            {
                newHeader.POS_Report_Header_UID = headerDT.Tables[0].Rows[0]["POS_Report_Header_UID"].ToString();
                return newHeader;
            }

            return newHeader;


        }

        private bool updateFile(string File_UID)
        {
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_fileConnectionString);
            string updateFileQuery = "UPDATE system_file SET System_File_StatusID = @System_File_StatusID WHERE System_File_UID = @System_File_UID";
            _dbLayer.AddParameter("@System_File_StatusID", 20, MySql.Data.MySqlClient.MySqlDbType.Int32);
            _dbLayer.AddParameter("@System_File_UID", File_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.runSQLDataSet(updateFileQuery);
            return true;
        }

        private bool addUpdateHeaderData(HeaderData headerData)
        {
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_headerDataConnnectionString);
            HeaderData newHeaderData = new HeaderData();
            string sp = "AddUpdateData";
            _dbLayer.AddParameter("pos_report_data_uid_", headerData.POS_Report_Data_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_header_uid_", headerData.POS_Report_Header_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_terminal_uid_", headerData.POS_Terminal_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_data_date_", headerData.POS_Report_Data_Date, MySql.Data.MySqlClient.MySqlDbType.Int32);
            _dbLayer.AddParameter("pos_report_data_number_", headerData.POS_Report_Data_Number, MySql.Data.MySqlClient.MySqlDbType.Int32);
            _dbLayer.AddParameter("pos_report_data_itemNr_", headerData.POS_Report_Data_ItemNr, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_data_itemName_", headerData.POS_Report_Data_ItemName, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_data_itemGrp_", headerData.POS_Report_Data_ItemGrp, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_data_itemDep_", headerData.POS_Report_Data_ItemDep, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            _dbLayer.AddParameter("pos_report_data_quantity_", headerData.POS_Report_Data_Quantity, MySql.Data.MySqlClient.MySqlDbType.Int32);
            _dbLayer.AddParameter("pos_report_data_amount_", headerData.POS_Report_Data_Amount, MySql.Data.MySqlClient.MySqlDbType.Int32);
            _dbLayer.AddParameter("pos_report_data_discountQuantity_", headerData.POS_Report_Data_DiscountQuantity, MySql.Data.MySqlClient.MySqlDbType.Decimal);
            _dbLayer.AddParameter("pos_report_data_discountAmount_", headerData.POS_Report_Data_DiscountAmount, MySql.Data.MySqlClient.MySqlDbType.Decimal);
            _dbLayer.AddParameter("pos_report_data_typeID_", headerData.POS_Report_Data_TypeID, MySql.Data.MySqlClient.MySqlDbType.Int32);

            DataSet headerDataDT = _dbLayer.runSPDataSet(sp);
            if (headerDataDT.Tables[0].Rows.Count > 0)
            {
                return true;
            }

            return false;
        }

        public string getFile(string File_UID)
        {
            string Header_UID = null;
            FileQueue newFile = new FileQueue();
            DatabaseAccessLayer _dbLayer = new DatabaseAccessLayer(_fileConnectionString);
            string getFileQuery = "SELECT * FROM system_file WHERE System_File_UID = @System_File_UID";
            _dbLayer.AddParameter("@System_File_UID", File_UID, MySql.Data.MySqlClient.MySqlDbType.VarChar);
            DataSet fileDT = _dbLayer.runSQLDataSet(getFileQuery);
            if (fileDT.Tables[0].Rows.Count > 0)
            {
                var File_Name = fileDT.Tables[0].Rows[0]["System_File_FileName"].ToString();
                if (File_Name.StartsWith("DTX312_"))
                {
                    Console.WriteLine("--Processing file 312--");
                    newFile.System_File_UID = File_UID;
                    newFile.System_File_FileName = File_Name;
                    newFile.System_File_BLOB = (Byte[])fileDT.Tables[0].Rows[0]["System_File_BLOB"];
                    newFile.System_File_SpecialUID1 = fileDT.Tables[0].Rows[0]["System_File_SpecialUID1"].ToString();
                    newFile.System_Client_UID = fileDT.Tables[0].Rows[0]["System_Client_UID"].ToString();
                    Header_UID = process312(newFile);
                    Console.WriteLine("--Processing file 312-- ends");
                }
                else if (File_Name.StartsWith("DTX313_"))
                {
                    Console.WriteLine("--Processing file 313--");
                    newFile.System_File_UID = File_UID;
                    newFile.System_File_FileName = File_Name;
                    newFile.System_File_BLOB = (Byte[])fileDT.Tables[0].Rows[0]["System_File_BLOB"];
                    newFile.System_File_SpecialUID1 = fileDT.Tables[0].Rows[0]["System_File_SpecialUID1"].ToString();
                    newFile.System_Client_UID = fileDT.Tables[0].Rows[0]["System_Client_UID"].ToString();
                    Header_UID = process313(newFile);
                    Console.WriteLine("--Processing file 313-- ends");
                }
                else if (File_Name.StartsWith("DTX314_"))
                {
                    Console.WriteLine("--Processing file 314--");
                    newFile.System_File_UID = File_UID;
                    newFile.System_File_FileName = File_Name;
                    newFile.System_File_BLOB = (Byte[])fileDT.Tables[0].Rows[0]["System_File_BLOB"];
                    newFile.System_File_SpecialUID1 = fileDT.Tables[0].Rows[0]["System_File_SpecialUID1"].ToString();
                    newFile.System_Client_UID = fileDT.Tables[0].Rows[0]["System_Client_UID"].ToString();
                    Header_UID = process314(newFile);
                    Console.WriteLine("--Processing file 314-- ends");
                }
                else if (File_Name.StartsWith("DTX315_"))
                {
                    Console.WriteLine("--Processing file 315--");
                    newFile.System_File_UID = File_UID;
                    newFile.System_File_FileName = File_Name;
                    newFile.System_File_BLOB = (Byte[])fileDT.Tables[0].Rows[0]["System_File_BLOB"];
                    newFile.System_File_SpecialUID1 = fileDT.Tables[0].Rows[0]["System_File_SpecialUID1"].ToString();
                    newFile.System_Client_UID = fileDT.Tables[0].Rows[0]["System_Client_UID"].ToString();
                    Header_UID = process315(newFile);
                    Console.WriteLine("--Processing file 315-- ends");
                }
                else if (File_Name.StartsWith("DTX316_"))
                {
                    Console.WriteLine("--Processing file 316--");
                    newFile.System_File_UID = File_UID;
                    newFile.System_File_FileName = File_Name;
                    newFile.System_File_BLOB = (Byte[])fileDT.Tables[0].Rows[0]["System_File_BLOB"];
                    newFile.System_File_SpecialUID1 = fileDT.Tables[0].Rows[0]["System_File_SpecialUID1"].ToString();
                    newFile.System_Client_UID = fileDT.Tables[0].Rows[0]["System_Client_UID"].ToString();
                    Header_UID = process316(newFile);
                    Console.WriteLine("--Processing file 316-- ends");
                } else
                {
                    Console.WriteLine("--File " + File_Name + " skipped!");
                }
                return Header_UID;
            }
            return Header_UID;
        }



        public string process312(FileQueue fileQueue)
        {
            string Header_UID = null;
            FileQueue fileToProcess = new FileQueue();
            fileToProcess.System_File_UID = fileQueue.System_File_UID;
            fileToProcess.System_File_FileName = fileQueue.System_File_FileName;
            fileToProcess.System_File_BLOB = fileQueue.System_File_BLOB;
            var file_content = fileQueue.readFile(fileToProcess.System_File_BLOB);
            for (int x = 0; x < file_content.Count; x++)
            {
                if (file_content[x] != null && file_content[x] != "")
                {
                    var element = file_content[x];
                    var elements = fileQueue.splitLine(element);
                    Header_UID = file312(elements, fileQueue);
                }
            }
            var ifFileUpdated = updateFile(fileToProcess.System_File_UID);
            if (ifFileUpdated)
            {
                return Header_UID;
            }
            return Header_UID;
        }
        public string process313(FileQueue fileQueue)
        {
            string Header_UID = null;
            FileQueue fileToProcess = new FileQueue();
            fileToProcess.System_File_UID = fileQueue.System_File_UID;
            fileToProcess.System_File_FileName = fileQueue.System_File_FileName;
            fileToProcess.System_File_BLOB = fileQueue.System_File_BLOB;
            var file_content = fileQueue.readFile(fileToProcess.System_File_BLOB);
            for (int x = 0; x < file_content.Count; x++)
            {
                if (file_content[x] != null && file_content[x] != "")
                {
                    var element = file_content[x];
                    var elements = fileQueue.splitLine(element);
                    Header_UID = file313(elements, fileQueue);
                }
            }
            var ifFileUpdated = updateFile(fileToProcess.System_File_UID);
            if (ifFileUpdated)
            {
                return Header_UID;
            }
            return Header_UID;

        }
        public string process314(FileQueue fileQueue)
        {
            string Header_UID = null;
            FileQueue fileToProcess = new FileQueue();
            fileToProcess.System_File_UID = fileQueue.System_File_UID;
            fileToProcess.System_File_FileName = fileQueue.System_File_FileName;
            fileToProcess.System_File_BLOB = fileQueue.System_File_BLOB;
            var file_content = fileQueue.readFile(fileToProcess.System_File_BLOB);
            for (int x = 0; x < file_content.Count; x++)
            {
                if (file_content[x] != null && file_content[x] != "")
                {
                    var element = file_content[x];
                    var elements = fileQueue.splitLine(element);
                    Header_UID = file314(elements, fileQueue);
                }
            }
            var ifFileUpdated = updateFile(fileToProcess.System_File_UID);
            if (ifFileUpdated)
            {
                return Header_UID;
            }
            return Header_UID;
        }
        public string process315(FileQueue fileQueue)
        {
            string Header_UID = null;
            FileQueue fileToProcess = new FileQueue();
            fileToProcess.System_File_UID = fileQueue.System_File_UID;
            fileToProcess.System_File_FileName = fileQueue.System_File_FileName;
            fileToProcess.System_File_BLOB = fileQueue.System_File_BLOB;
            var file_content = fileQueue.readFile(fileToProcess.System_File_BLOB);
            for (int x = 0; x < file_content.Count; x++)
            {
                if (file_content[x] != null && file_content[x] != "")
                {
                    var element = file_content[x];
                    var elements = fileQueue.splitLine(element);
                    Header_UID = file315(elements, fileQueue);
                }
            }
            var ifFileUpdated = updateFile(fileToProcess.System_File_UID);
            if (ifFileUpdated)
            {
                return Header_UID;
            }
            return Header_UID;

        }
        public string process316(FileQueue fileQueue)
        {
            string Header_UID = null;
            FileQueue fileToProcess = new FileQueue();
            fileToProcess.System_File_UID = fileQueue.System_File_UID;
            fileToProcess.System_File_FileName = fileQueue.System_File_FileName;
            fileToProcess.System_File_BLOB = fileQueue.System_File_BLOB;
            var file_content = fileQueue.readFile(fileToProcess.System_File_BLOB);

            for (int x = 0; x < file_content.Count; x++)
            {
                if (file_content[x] != null && file_content[x] != "")
                {
                    var element = file_content[x];
                    var elements = fileQueue.splitLine(element);
                    Header_UID = file316(elements, fileQueue);
                }
            }
            var ifFileUpdated = updateFile(fileToProcess.System_File_UID);
            if (ifFileUpdated)
            {
                return Header_UID;
            }
            return Header_UID;
        }

        private string file312(string[] elements, FileQueue fileQueue)
        {
            string Header_UID = null;
            HeaderData newHeaderData = new HeaderData();
            Header newHeader = new Header();
            for (int i = 0; i < elements.Length; i++)
            {


                newHeader.POS_Report_Header_Date = Int32.Parse(elements[5].ToString());
                newHeaderData.POS_Report_Data_Date = Int32.Parse(elements[5].ToString());
                newHeader.POS_Report_Header_Number = Int32.Parse(elements[6].ToString());
                newHeaderData.POS_Report_Data_ItemNr = Int32.Parse(elements[7].ToString());
                newHeaderData.POS_Report_Data_ItemName = elements[8].ToString();
                if (elements[9].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Quantity = Int32.Parse(elements[9].ToString()) / 100;
                }
                if (elements[10].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Amount = Int32.Parse(elements[10].ToString()) / 100;
                }
                newHeader.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeader.System_Client_UID = fileQueue.System_Client_UID;
                newHeaderData.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeaderData.POS_Report_Data_Number = newHeader.POS_Report_Header_Number;
                newHeaderData.POS_Report_Data_TypeID = 312;

            }
            var addedHeader = addUpdateHeader(newHeader);
            if (addedHeader != null)
            {
                newHeaderData.POS_Report_Header_UID = addedHeader.POS_Report_Header_UID;
                var headerData = addUpdateHeaderData(newHeaderData);
                if (headerData)
                {
                    Header_UID = newHeaderData.POS_Report_Header_UID;
                }
            }
            return Header_UID;
        }
        private string file313(string[] elements, FileQueue fileQueue)
        {
            string Header_UID = null;
            HeaderData newHeaderData = new HeaderData();
            Header newHeader = new Header();
            for (int i = 0; i < elements.Length; i++)
            {


                newHeader.POS_Report_Header_Date = Int32.Parse(elements[5].ToString());
                newHeaderData.POS_Report_Data_Date = Int32.Parse(elements[5].ToString());
                newHeader.POS_Report_Header_Number = Int32.Parse(elements[6].ToString());
                newHeaderData.POS_Report_Data_ItemNr = Int32.Parse(elements[7].ToString());
                newHeaderData.POS_Report_Data_ItemName = elements[8].ToString();
                if (elements[11].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Quantity = Int32.Parse(elements[11].ToString()) / 100;
                }
                if (elements[12].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Amount = Decimal.Parse(elements[12].ToString()) / 100;
                }
                newHeader.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeader.System_Client_UID = fileQueue.System_Client_UID;
                newHeaderData.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeaderData.POS_Report_Data_Number = newHeader.POS_Report_Header_Number;
                newHeaderData.POS_Report_Data_TypeID = 313;

            }
            var addedHeader = addUpdateHeader(newHeader);
            if (addedHeader != null)
            {
                newHeaderData.POS_Report_Header_UID = addedHeader.POS_Report_Header_UID;
                var headerData = addUpdateHeaderData(newHeaderData);
                if (headerData)
                {
                    Header_UID = newHeaderData.POS_Report_Header_UID;
                }
            }
            return Header_UID;
        }
        private string file314(string[] elements, FileQueue fileQueue)
        {
            string Header_UID = null;
            HeaderData newHeaderData = new HeaderData();
            Header newHeader = new Header();

            for (int i = 0; i < elements.Length; i++)
            {

                newHeader.POS_Report_Header_Date = Int32.Parse(elements[5].ToString());
                newHeaderData.POS_Report_Data_Date = Int32.Parse(elements[5].ToString());
                newHeader.POS_Report_Header_Number = Int32.Parse(elements[6].ToString());
                newHeaderData.POS_Report_Data_ItemNr = Int32.Parse(elements[7].ToString());
                newHeaderData.POS_Report_Data_ItemName = elements[8].ToString();
                newHeaderData.POS_Report_Data_ItemGrp = Int32.Parse(elements[9].ToString());
                newHeaderData.POS_Report_Data_ItemDep = Int32.Parse(elements[10].ToString());

                if (elements[23].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Quantity = Int32.Parse(elements[23].ToString()) / 100;
                }
                if (elements[24].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Amount = Decimal.Parse(elements[24].ToString()) / 100;
                }
                if (elements[25].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_DiscountQuantity = Int32.Parse(elements[25].ToString()) / 100;
                }
                if (elements[26].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_DiscountAmount = Decimal.Parse(elements[26].ToString()) / 100;
                }

                newHeader.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeader.System_Client_UID = fileQueue.System_Client_UID;
                newHeaderData.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeaderData.POS_Report_Data_Number = newHeader.POS_Report_Header_Number;
                newHeaderData.POS_Report_Data_TypeID = 314;

            }
            var addedHeader = addUpdateHeader(newHeader);
            if (addedHeader != null)
            {
                newHeaderData.POS_Report_Header_UID = addedHeader.POS_Report_Header_UID;
                var headerData = addUpdateHeaderData(newHeaderData);
                if (headerData)
                {
                    Header_UID = newHeaderData.POS_Report_Header_UID;
                }
            }
            return Header_UID;
        }
        private string file315(string[] elements, FileQueue fileQueue)
        {
            HeaderData newHeaderData = new HeaderData();
            Header newHeader = new Header();
            string Header_UID = null;
            for (int i = 0; i < elements.Length; i++)
            {


                newHeader.POS_Report_Header_Date = Int32.Parse(elements[5].ToString());
                newHeaderData.POS_Report_Data_Date = Int32.Parse(elements[5].ToString());
                newHeader.POS_Report_Header_Number = Int32.Parse(elements[6].ToString());
                newHeaderData.POS_Report_Data_ItemNr = Int32.Parse(elements[7].ToString());
                newHeaderData.POS_Report_Data_ItemName = elements[8].ToString();

                if (elements[9].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Quantity = Int32.Parse(elements[9].ToString()) / 100;
                }
                if (elements[10].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Amount = Decimal.Parse(elements[10].ToString()) / 100;
                }
                if (elements[11].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_DiscountQuantity = Int32.Parse(elements[11].ToString()) / 100;
                }
                if (elements[12].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_DiscountAmount = Decimal.Parse(elements[12].ToString()) / 100;
                }

                newHeader.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeader.System_Client_UID = fileQueue.System_Client_UID;
                newHeaderData.POS_Report_Data_Number = newHeader.POS_Report_Header_Number;
                newHeaderData.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeaderData.POS_Report_Data_TypeID = 315;

            }
            var addedHeader = addUpdateHeader(newHeader);
            if (addedHeader != null)
            {
                newHeaderData.POS_Report_Header_UID = addedHeader.POS_Report_Header_UID;
                var headerData = addUpdateHeaderData(newHeaderData);
                if (headerData)
                {
                    Header_UID = newHeaderData.POS_Report_Header_UID;
                }
            }
            return Header_UID;
        }
        private string file316(string[] elements, FileQueue fileQueue)
        {
            string Header_UID = null;
            HeaderData newHeaderData = new HeaderData();
            Header newHeader = new Header();
            for (int i = 0; i < elements.Length; i++)
            {


                newHeader.POS_Report_Header_Date = Int32.Parse(elements[5].ToString());
                newHeaderData.POS_Report_Data_Date = Int32.Parse(elements[5].ToString());
                newHeader.POS_Report_Header_Number = Int32.Parse(elements[6].ToString());
                newHeaderData.POS_Report_Data_ItemNr = Int32.Parse(elements[7].ToString());
                newHeaderData.POS_Report_Data_ItemName = elements[8].ToString();

                if (elements[9].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Quantity = Int32.Parse(elements[9].ToString()) / 100;
                }
                if (elements[10].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_Amount = Decimal.Parse(elements[10].ToString()) / 100;
                }
                if (elements[11].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_DiscountQuantity = Int32.Parse(elements[11].ToString()) / 100;
                }
                if (elements[12].ToString() != "0")
                {
                    newHeaderData.POS_Report_Data_DiscountAmount = Decimal.Parse(elements[12].ToString()) / 100;
                }
                newHeader.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeader.System_Client_UID = fileQueue.System_Client_UID;
                newHeaderData.POS_Terminal_UID = fileQueue.System_File_SpecialUID1;
                newHeaderData.POS_Report_Data_Number = newHeader.POS_Report_Header_Number;
                newHeaderData.POS_Report_Data_TypeID = 316;

            }
            var addedHeader = addUpdateHeader(newHeader);
            if (addedHeader != null)
            {
                newHeaderData.POS_Report_Header_UID = addedHeader.POS_Report_Header_UID;
                var headerData = addUpdateHeaderData(newHeaderData);
                if (headerData)
                {
                    Header_UID = newHeaderData.POS_Report_Header_UID;
                }
            }
            return Header_UID;
        }
    }
}
