const Joi =  require('joi')

//register
const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.boolean()
        .required()

    };
    return Joi.validate(data, schema);
}
//login
const loginValidation = data => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()

    }
    return Joi.validate(data, schema)
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;