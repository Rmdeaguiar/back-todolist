const yup = require('./settings');

const schemaVerifyLogin = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})

module.exports = schemaVerifyLogin