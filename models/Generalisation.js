const { Pool } = require('pg');
require('dotenv').config();

async function getObject(connexion, request) {
    let newconnexion = false;

    if (!connexion) {
        connexion = await pool.connect();
        newconnexion = true;
    }

    try {
        const result = await connexion.query(request);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }finally{
        if (newconnexion) {
            connexion.release();
        }
    }
}

async function updatingObject(connexion, request) {
    let newconnexion = false;

    if (!connexion) {
        connexion = await pool.connect();
        newconnexion = true;
    }

    try {
        await connexion.query(request);
    } catch (error) {
        console.error('Error executing change(s):', error);
        throw error;
    }finally{
        if (newconnexion) {
            connexion.release();
        }
    }
}

module.exports = {
    getObject,
    updatingObject
};