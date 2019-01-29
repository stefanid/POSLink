const Joi = require("Joi");


module.exports = {
    headers: {
        "client-token": Joi.string().required()
    }
}