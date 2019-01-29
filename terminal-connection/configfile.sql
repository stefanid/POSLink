PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;



INSERT INTO DTX003 VALUES('#10000JobSetO',$$MACADDRESS$$,'JOBSET','02','#10100JobSetCRX','','','JOBSETO','0','#10100JobSetCRX,#10109OpenEJ','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10100JobSetCRX',$$MACADDRESS$$,'JOBSET','02','#10104ApplyCRX','','','+JobSetCRX','0','#10101InitTempCRX,#10102CorpCRX_VER,#10103CorpCRX,#10104ApplyCRX,#10101InitTempCRX,#10105StoreCRX_VER,#10106StoreCRX,#10104ApplyCRX,#10101InitTempCRX,#10107RegiCRX_VER,#10108RegiCRX,#10104ApplyCRX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10101InitTempCRX',$$MACADDRESS$$,'NONE','02','','','','++InitTempCRX','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','InitTemp','stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_CRX/','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10102CorpCRX_VER',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++CorpCRX_VER','2','','./Distribute/CorpSetting.VER','0','','','','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_CRX/CorpSetting.VER','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10103CorpCRX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++CorpCRX','2','','./Distribute/CorpSetting.CRX','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_IfVersionElderThenDisable','IfVersionElderThenDisable','
stringextra DTEX_COMMAND_VERSIONFILE=CorpSetting.VER
stringextra DTEX_COMMAND_INSTALLEDDIR=/mnt/sdcard/jp.co.casio.caios.framework.database/CRX/
stringextra DTEX_COMMAND_DOWNLOADDIR=/mnt/sdcard/CASIO/TMP_CRX/
','1800','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_CRX/CorpSetting.CRX','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10104ApplyCRX',$$MACADDRESS$$,'NONE','02','','','','++ApplyCRX','0','','',
'1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Setting','stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_CRX/','1800','','1','jp.co.casio.caios.standardopen.receivestatus','ReturnToAddon','','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10105StoreCRX_VER',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++StoreCRX_VER','2','','./StorDistribute/StoreSetting.VER','0','','','','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_CRX/StoreSetting.VER','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10106StoreCRX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++StoreCRX','2','','./StorDistribute/StoreSetting.CRX','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_IfVersionElderThenDisable','IfVersionElderThenDisable','
stringextra DTEX_COMMAND_VERSIONFILE=StoreSetting.VER
stringextra DTEX_COMMAND_INSTALLEDDIR=/mnt/sdcard/jp.co.casio.caios.framework.database/CRX/
stringextra DTEX_COMMAND_DOWNLOADDIR=/mnt/sdcard/CASIO/TMP_CRX/
','1800','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_CRX/StoreSetting.CRX','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10107RegiCRX_VER',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++RegiCRX_VER','2','','./Distribute/RegiSetting.VER','0','','','','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_CRX/RegiSetting.VER','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#10108RegiCRX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++RegiCRX','2','','./Distribute/RegiSetting.CRX','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_IfVersionElderThenDisable','IfVersionElderThenDisable','
stringextra DTEX_COMMAND_VERSIONFILE=RegiSetting.VER
stringextra DTEX_COMMAND_INSTALLEDDIR=/mnt/sdcard/jp.co.casio.caios.framework.database/CRX/
stringextra DTEX_COMMAND_DOWNLOADDIR=/mnt/sdcard/CASIO/TMP_CRX/
','1800','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateCRX','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_CRX/RegiSetting.CRX','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#10109OpenEJ',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+OpenEJ','1','','./','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_FileTransfer','+FileTransfer','
stringextra DTEX_J_LOCALFILEPATH=/data/data/jp.co.casio.caios.framework.database/files/ej/log_$$BIZDATE$$.txt
stringextra DTEX_J_REMOTEFILEPATH=./Journal/
stringextra COPYTO_DIRECTORY=/mnt/sdcard/DTEXROOT/Preprocess/FileTransfer/
','1800','0','0','','','','','00','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'20131206113050','VX USER','00','0','00000000','','','2.03');



INSERT INTO DTX003 VALUES('#20000JobSetF',$$MACADDRESS$$,'JOBSET','02','','','','JOBSETF','0','#20001DailySales,#20002DailySalesTotal','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#20001DailySales',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+DailySales','1','','./Collect','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertDailySales','ConvertDailySales','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#20002DailySalesTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+DailySalesTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertDailySalesTotal','ConvertDailySalesTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');



INSERT INTO DTX003 VALUES('#30000JobSetZ',$$MACADDRESS$$,'JOBSET','02','','','','JOBSETZ','0','#30100JobSetSales','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#30100JobSetSales',$$MACADDRESS$$,'JOBSET','02','','','','+JobSetSales','0','#30101ZSales,#30102ZSalesTotal,#30103FixedTotal,#30104TransactionkeyTotal,#30105PLUTotal,#30106DepartmentTotal,#30107GroupTotal,#30108ClerkTotal,#30109CustomarTotal,#30110HourlyTotal,#30111MixMatchTotal,#30120EJournal','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30101ZSales',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++ZSales','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertSales','+ConvertSales','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30102ZSalesTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++ZSalesTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertSalesTotal','+ConvertSalesTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30103FixedTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++FixedTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertFixedTotal','+ConvertFixedTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30104TransactionkeyTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++TransactionkeyTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertTransactionkeyTotal','+ConvertTransactionkeyTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30105PLUTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++PLUTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertPLUTotal','+ConvertPLUTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30106DepartmentTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++DepartmentTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertDepartmentTotal','+ConvertDepartmentTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30107GroupTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++GroupTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertGroupTotal','+ConvertGroupTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30108ClerkTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++ClerkTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertClerkTotal','+ConvertClerkTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30109CustomarTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++CustomarTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertCustomarTotal','+ConvertCustomarTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30110HourlyTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++HourlyTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertHourlyTotal','+ConvertHourlyTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30111MixMatchTotal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++MixMatchTotal','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_ConvertMixMatchTotal','+ConvertMixMatchTotal','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
stringextra Version=1
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#30120EJournal',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++EJournal','1','','./Journal/','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_FileTransfer','+FileTransfer','
stringextra DTEX_J_LOCALFILEPATH=/mnt/sdcard/ej/log_$$BIZDATE$$.txt
stringextra DTEX_J_REMOTEFILAPATH=./Journal/
','1800','0','0','','','','','00','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'20131206113050','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#30200JobSetAPL',$$MACADDRESS$$,'JOBSET','02','','','','+JobSetAPL','0','#30201_CorpInitTempAPL,#30202CorpAPL_VER,#30203CorpAPL,#30204_CorpApplyAPL,#30201_StoreInitTempAPL,#30205StoreAPL_VER,#30206StoreAPL,#30204_StoreApplyAPL,#30201_RegiInitTempAPL,#30207RegiAPL_VER,#30208RegiAPL,#30204_RegiApplyAPL','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30201_CorpInitTempAPL',$$MACADDRESS$$,'NONE','02','','','','++InitTempAPL','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','InitTemp','
stringextra DTEX_COMMAND_COUNT=1
stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_APL
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30202CorpAPL_VER',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++CorpAPL_VER','2','','./Distribute/APL.ver','0','','','','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_APL/APL.ver','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30203CorpAPL',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++CorpAPL','2','','./Distribute/APL.zip','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_IfVersionElderThenDisable','IfVersionElderThenDisable','
stringextra DTEX_COMMAND_VERSIONFILE=APL.ver
stringextra DTEX_COMMAND_INSTALLEDDIR=/mnt/sdcard/CASIO/UPDATE_APL/
stringextra DTEX_COMMAND_DOWNLOADDIR=/mnt/sdcard/CASIO/TMP_APL/
','1800','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_APL/APL.zip','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30204_CorpApplyAPL',$$MACADDRESS$$,'NONE','02','','','','++ApplyAPL','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Setting','stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_APL/','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');



INSERT INTO DTX003 VALUES('#30201_StoreInitTempAPL',$$MACADDRESS$$,'NONE','02','','','','++InitTempAPL','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','InitTemp','
stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_APL
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30205StoreAPL_VER',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++StoreAPL_VER','2','','./StorDistribute/APL.ver','0','','','','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_APL/APL.ver','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30206StoreAPL',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++StoreAPL','2','','./StorDistribute/APL.zip','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_IfVersionElderThenDisable','IfVersionElderThenDisable','
stringextra DTEX_COMMAND_VERSIONFILE=APL.ver
stringextra DTEX_COMMAND_INSTALLEDDIR=/mnt/sdcard/CASIO/UPDATE_APL/
stringextra DTEX_COMMAND_DOWNLOADDIR=/mnt/sdcard/CASIO/TMP_APL/
','1800','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_APL/APL.zip','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30204_StoreApplyAPL',$$MACADDRESS$$,'NONE','02','','','','++ApplyAPL','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Setting','stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_APL/','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30201_RegiInitTempAPL',$$MACADDRESS$$,'NONE','02','','','','++InitTempAPL','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','InitTemp','
stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_APL
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#30207RegiAPL_VER',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++RegiAPL_VER','2','','.//Distribute/APL.ver','0','','','','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_APL/APL.ver','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#30208RegiAPL',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','++RegiAPL','2','','./Distribute/APL.zip','1','jp.co.casio.caios.app.dtexstandardtool.preprocess_IfVersionElderThenDisable','IfVersionElderThenDisable','
stringextra DTEX_COMMAND_VERSIONFILE=APL.ver
stringextra DTEX_COMMAND_INSTALLEDDIR=/mnt/sdcard/CASIO/UPDATE_APL/
stringextra DTEX_COMMAND_DOWNLOADDIR=/mnt/sdcard/CASIO/TMP_APL/
','1800','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Recv','stringextra DTEX_COMMAND_MOVE_TO_PATH=/mnt/sdcard/CASIO/TMP_APL/APL.zip','1800','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#30204_RegiApplyAPL',$$MACADDRESS$$,'NONE','02','','','','++ApplyAPL','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','Setting','stringextra DTEX_COMMAND_TMPDIR=/mnt/sdcard/CASIO/TMP_APL/','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');


INSERT INTO DTX003 VALUES('#30999UpdateSuccess',$$MACADDRESS$$,'NONE','02','','','','++UpdateSuccess','0','','','1','jp.co.casio.caios.app.dtexstandardtool.postprocess_UpdateApplication','PostProcess','stringextra DTEX_COMMAND_TMPDIR = /mnt/sdcard/CASIO/TMP_APL','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',0,0,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40001JobSetX0900',$$MACADDRESS$$,'JOBSET','01','','','','JOBSETX0900','0','#40101OpenCloseX,#40102FlashSalesX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','090000','090000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX00','DTEX00','2.03');

INSERT INTO DTX003 VALUES('#40002JobSetX1200',$$MACADDRESS$$,'JOBSET','01','','','','JOBSETX1200','0','#40101OpenCloseX,#40102FlashSalesX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','120000','120000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX01','DTEX01','2.03');

INSERT INTO DTX003 VALUES('#40003JobSetX1500',$$MACADDRESS$$,'JOBSET','01','','','','JOBSETX1500','0','#40101OpenCloseX,#40102FlashSalesX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','150000','150000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX02','DTEX02','2.03');

INSERT INTO DTX003 VALUES('#40003JobSetX1800',$$MACADDRESS$$,'JOBSET','01','','','','JOBSETX1800','0','#40101OpenCloseX,#40102FlashSalesX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','180000','180000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX03','DTEX03','2.03');

INSERT INTO DTX003 VALUES('#40003JobSetX2100',$$MACADDRESS$$,'JOBSET','01','','','','JOBSETX2100','0','#40101OpenCloseX,#40102FlashSalesX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','210000','210000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX04','DTEX04','2.03');

INSERT INTO DTX003 VALUES('#40003JobSetX2300',$$MACADDRESS$$,'JOBSET','01','','','','JOBSETX2300','0','#40101OpenCloseX,#40102FlashSalesX','','0','','','','','','0','','','','','','00000000','000000','00000000','000000','00','0','','230000','230000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX05','DTEX05','2.03');

INSERT INTO DTX003 VALUES('#40101OpenCloseX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+OpenCloseX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_OpenCloseX','+OpenCloseX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40102FlashSalesX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+FlashSalesX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_FlashSalesX','+FlashSalesX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40103HourlySalesFlash',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+HourlySalesFlash','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_HourlySalesFlash','+HourlySalesFlash','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40105SalesTotalReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+SalesTotalReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_SalesTotalReportX','+SalesTotalReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40106TransKeyReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+TransKeyReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_TransKeyReportX','+TransKeyReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40107ItemReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+ItemReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_ItemReportX','+ItemReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40108DeptReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+DeptReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_DeptReportX','+DeptReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40109GroupReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+GroupReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_GroupReportX','+GroupReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40110CustomerGReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+CustomerGReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_CustomerGReportX','+CustomerGReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');

INSERT INTO DTX003 VALUES('#40111HourlyReportX',$$MACADDRESS$$,'FTP','02','ftp.poslink.dk','LP001007','700100PL','+HourlyReportX','1','','./Collect/','1','jp.co.casio.caios.app.dtexstandardxtool.preprocess_HourlyReportX','+HourlyReportX','
stringextra GroupCode=00
stringextra CorporateCode=00
stringextra StoreCode=LP001007
stringextra RegisterCode=LP001007
','1800','','0','','','','','','00000000','000000','00000000','000000','00','0','','000000','000000',10,1,0,'00000000000000','VX USER','00','0','00000000','','','2.03');



INSERT INTO DTX003 VALUES('#90000Log',$$MACADDRESS$$,'FTP','01','ftp.poslink.dk','LP001007','700100PL','LOG','1','','./Log/','1','jp.co.casio.caios.app.dtextool.preprocess_ExportLogAsCSV','ExportLogAsCSV','
','1800','','1','jp.co.casio.caios.app.dtextool.postprocess_ExpireLog','ExpireLog','
','1800','','00000000','000000','00000000','000000','00','0','','160000','160000',0,0,0,'00000000000000','VX USER','00','0','00000000','DTEX06','DTEX06','2.03');




UPDATE CTS001 SET SCHEDULERNAME='JOBSETX0900',STARTTIME='0900',ENDTIME='0900',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX00',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX00';

UPDATE CTS001 SET SCHEDULERNAME='JOBSETX1200',STARTTIME='1200',ENDTIME='1200',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX01',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX01';

UPDATE CTS001 SET SCHEDULERNAME='JOBSETX1500',STARTTIME='1500',ENDTIME='1500',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX02',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX02';

UPDATE CTS001 SET SCHEDULERNAME='JOBSETX1800',STARTTIME='1800',ENDTIME='1800',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX03',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX03';

UPDATE CTS001 SET SCHEDULERNAME='JOBSETX2100',STARTTIME='2100',ENDTIME='2100',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX04',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX04';

UPDATE CTS001 SET SCHEDULERNAME='JOBSETX2300',STARTTIME='2300',ENDTIME='2300',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX05',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX05';

UPDATE CTS001 SET SCHEDULERNAME='LOG',STARTTIME='1600',ENDTIME='1600',STARTTYPE='0',STARTDATE='',INTERVALTIME='0001',ARRANGECODE='DTEX06',UNUSABLEFLG='0',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE SCHEDULERCODE='DTEX06';


UPDATE CTS002 SET ARRANGENAME='JOBSETX0900',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#40001JobSetX0900
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX00';


UPDATE CTS002 SET ARRANGENAME='JOBSETX1200',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#40002JobSetX1200
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX01';

UPDATE CTS002 SET ARRANGENAME='JOBSETX1500',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#40003JobSetX1500
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX02';

UPDATE CTS002 SET ARRANGENAME='JOBSETX1800',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#40003JobSetX1800
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX03';

UPDATE CTS002 SET ARRANGENAME='JOBSETX2100',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#40003JobSetX2100
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX04';

UPDATE CTS002 SET ARRANGENAME='JOBSETX2300',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#40003JobSetX2300
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX05';

UPDATE CTS002 SET ARRANGENAME='LOG',COMMANDTYPE='0',COMMAND='intent
starttype    broadcast
action       jp.co.casio.caios.app.dtexc.exec
stringextra  DTEX_J_ID=#90000Log
stringextra  DTEX_J_EVENT=01
end-intent
',CREATEDATETIME='20140218150000',UPDATEDATETIME='20140218150000' WHERE ARRANGECODE='DTEX06';


INSERT INTO DTX006 VALUES('#10000JobSetO'	,''					,'SETTING'	);
INSERT INTO DTX006 VALUES('#20000JobSetF'	,'ReginfoFinalized'	,''			);
INSERT INTO DTX006 VALUES('#30000JobSetZ'	,''					,'ZSEND'	);
INSERT INTO DTX006 VALUES('#30999UpdateSuccess'	,'jp.co.casio.caios.app.dtexstandardtool.ReturnUpdateApplication','');
COMMIT;
