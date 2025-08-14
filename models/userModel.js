const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

// Vérifier si un utilisateur existe déjà
const findUser = async (identifiant, mail) => {
    const result = await pool.query(
        'SELECT * FROM Utilisateur WHERE identifiant = $1 OR mail = $2',
        [identifiant, mail]
    );
    return result.rows[0];
};

const insertUser = async (identifiant, nom, prenom, mail, mdp, idtu) => {
    const result = await pool.query(
        'INSERT INTO Utilisateur (identifiant, nom, prenom, mail, mdp, idtu) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [identifiant, nom, prenom, mail, mdp, idtu]
    );
    return result.rows[0];
};

module.exports = {
    findUser,
    insertUser,
};
