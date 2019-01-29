var fileService = {};
const config = require("../appSettings.json");
const file_service = config.file_service.add_config;

const site_token = config.site_token;
const api_token = config.api_token;
/******* PACKAGES *******/
const rp = require('request-promise');

fileService.saveConfigFile = (fileData, clientToken) => {

    var options = {
        method: "POST",
        uri: file_service,
        headers: {
            "client-token": clientToken
        }, 
        body: {
            Client_UID: fileData.Client_UID,
            File_Name: fileData.File_Name,
            File_Path: fileData.File_Path,
            File_Blob: fileData.File_Blob,
            File_ContentType: fileData.File_ContentType,
            File_SpecialUID1: fileData.File_SpecialUID1,
            File_SpecialUID2: fileData.File_SpecialUID2,
            File_SpecialUID3: fileData.File_SpecialUID3,
            Folder_UID: fileData.Folder_UID
        },
        json: true
    };

    return rp(options)
        .then(function (data) {
            return data;
        }).catch(function (err) {
            return err;
        })
};


module.exports = fileService;