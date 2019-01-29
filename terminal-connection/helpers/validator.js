const Joi = require("joi");


/******* JOI SCHEMAS *******/
var addTerminalSchema = Joi.object().keys({
    Client_UID: Joi.string().required(),
    Terminal_Name: Joi.string().max(250).required(),
    Terminal_TypeID: Joi.number().required()
});


var updateTerminalConnectionSchema = Joi.object().keys({
    Terminal_Connection_Username: Joi.string().min(6).max(250).required(),
    Terminal_Connection_Password: Joi.string().min(8).max(250).required()
});

var configFileForTerminalSchema = Joi.object().keys({
    Client_UID: Joi.string().required(),
    Terminal_UID: Joi.string().required()
});

var validator = {};

validator.validateSchema = (entity, type) => {

    switch (type) {
        case "terminalSchema":
            return Joi.validate(entity, addTerminalSchema).error;
            break;
        case "terminalConnectionSchema":
            return Joi.validate(entity, addTerminalConnectionSchema).error;
            break;
        case "terminalConnectionUpdateSchema":
            return Joi.validate(entity, updateTerminalConnectionSchema).error;
            break;
        case "configFileForTerminalSchema":
            return Joi.validate(entity, configFileForTerminalSchema).error;
            break;
        default:
            return null;
            break;
    }
}




module.exports = validator;