const knex = require('../connection');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const securePassword = require('secure-password');
const pwd = securePassword();
const schemaVerifySignup = require('../middlewares/schemaVerifySignup')
const schemaVerifyLogin = require('../middlewares/schemaVerifyLogin')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await schemaVerifySignup.validate(req.body)

        const userInfo = await knex('users').where({ email }).first();

        if (userInfo) { return res.status(400).json("O email já existe") }

        const passwordHash = (await pwd.hash(Buffer.from(password))).toString('hex');

        const newUser = await knex('users').insert({
            name,
            email,
            password: passwordHash,
        });

        if (!newUser) return res.status(400).json("Não foi possível cadastrar o usuário");

        return res.status(201).json("O usuário foi cadastrado");

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        await schemaVerifyLogin.validate(req.body)

        const user = await knex('users').where({ email }).first();

        if (!user) return res.status(404).json('O usuario não foi encontrado');

        const checkPassword = await pwd.verify(Buffer.from(password), Buffer.from(user.password, "hex"));

        switch (checkPassword) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json("E-mail ou senha estão incorretos.");
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(password))).toString("hex");
                    await knew('users').where({ email }).update({ password: hash });
                } catch {
                }
                break;
        }

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, secret);

        const infoUser = { user: { id: user.id, name: user.name, email: user.email }, token: token }

        return res.status(200).json(infoUser);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getUser = async (req, res) => {
    const { user } = req

    try {
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error.message);

    }
}



module.exports = {
    registerUser,
    loginUser,
    getUser
}