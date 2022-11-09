require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-54-163-34-107.compute-1.amazonaws.com',
        port: 5432,
        user: 'thbkhvwnahrblc',
        password: '0946f7fe110a1aa870172f7d08fa9a8b2bccc3b26ebafb6d1f09fe9dda958372',
        database: 'd4g22k34q4cdpf',
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = knex

// Host
// ec2-54-163-34-107.compute-1.amazonaws.com
// Database
// d4g22k34q4cdpf
// User
// thbkhvwnahrblc
// Port
// 5432
// Password
// 0946f7fe110a1aa870172f7d08fa9a8b2bccc3b26ebafb6d1f09fe9dda958372