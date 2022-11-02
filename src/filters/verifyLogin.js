const knex = require('../connection');
const jwt = require('jsonwebtoken')
const secret = require('../secret');


async function verifyLogin(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = await jwt.verify(token, secret);

        const userOk = await knex('users').where({ id }).first();

        if (!userOk) {
            return res.status(404).json({ mensagem: 'O usuário não foi encontrado.' });
        }

        const { password: _, ...user } = userOk;


        req.user = user

        next();

    } catch (error) {
        return res.status(500).json(error.message);
    }

}

module.exports = { verifyLogin }