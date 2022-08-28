"use strict";
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'saurabh99',
    port: 5432,
});
module.exports = pool;
