const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function getObject(connexion, request) {
    let nouvelleConnexion = false;

    if (!connexion) {
        connexion = await pool.connect();
        nouvelleConnexion = true;
    }

    try {
        const result = await connexion.query(request);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }finally{
        if (nouvelleConnexion && connexion) {
            connexion.release();
        }
    }
}

async function updatingObject(connexion, request) {
    let nouvelleConnexion = false;

    if (!connexion) {
        connexion = await pool.connect();
        nouvelleConnexion = true;
    }

    try {
        await connexion.query(request);
    } catch (error) {
        console.error('Error executing change(s):', error);
        throw error;
    }finally{
        if (nouvelleConnexion && connexion) {
            connexion.release();
        }
    }
}


module.exports = {
    getObject,
    updatingObject
};