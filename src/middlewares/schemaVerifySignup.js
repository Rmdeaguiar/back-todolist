const yup = require('./settings');

const schemaVerifyInfo = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required()
})

module.exports = schemaVerifyInfo