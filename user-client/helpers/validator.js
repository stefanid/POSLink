const Joi = require("joi");

/******* JOI SCHEMAS *******/

var registerUserSchema = Joi.object().keys({
    User_Name: Joi.string().min(1).max(250).required(),
    User_Email: Joi.string().min(6).max(250).required(),
    User_Phone: Joi.string().max(50).allow(null).allow('').required()
});

var erpSchema = Joi.object().keys({
    System_Client_UID: Joi.string().required(),
    Client_ERPSyncCFG_ItemID: Joi.number().required(),
    Client_ERPSyncCFG_AccountID: Joi.number().required(),
    Client_ERPSyncCFG_TypeID: Joi.number().required()
});

var registerClientSchema = Joi.object().keys({
    Client_Name: Joi.string().min(1).max(250).required(),
    Client_PUID: Joi.string().allow(null),
    Client_Adr1: Joi.string().max(250).allow(null).required(),
    Client_Adr2: Joi.string().max(250).allow(null).required(),
    Client_Adr3: Joi.string().max(250).allow(null).required(),
    Client_PostalCode: Joi.string().max(10).allow(null).allow('').required(),
    Client_City: Joi.string().max(50).allow(null).allow('').required(),
    Client_VAT: Joi.string().max(50).allow(null).allow('').required(),
    Client_EAN: Joi.string().max(50).allow(null).allow('').required(),
    Client_InvoiceEmail: Joi.string().allow(null),
    Country_UID: Joi.string().required()
});

var registerIntegrationConnection = Joi.object().keys({
    Client_UID: Joi.string().required(),
    Integration_Connection_TypeID: Joi.number().required(),
    Integration_Connection_MSTR5: Joi.string().max(255),
    Integration_Connection_SSTR5: Joi.string().max(50)
});

var administerSchema = Joi.object().keys({
    Client_UID: Joi.string().required(),
});



var validator = {};

validator.validateSchema = (entity, type) => {
    switch (type) {
        case "userschema":
            return Joi.validate(entity, registerUserSchema).error;
            break;
        case "clientschema":
            return Joi.validate(entity, registerClientSchema).error;
            break;
        case "administerSchema":
            return Joi.validate(entity, administerSchema).error;
            break;
        case "registerIntegrationConnection":
            return Joi.validate(entity, registerIntegrationConnection).error;
            break;
        case "erpSchema":
            return Joi.validate(entity, erpSchema).error;
            break;
        default:
            return null;
    }
}



module.exports = validator;