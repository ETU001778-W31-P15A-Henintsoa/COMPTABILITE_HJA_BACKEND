const connexion = require('./Connexion');
const generalisation = require('./Generalisation');

const findUser = async (connexion, request) => {
    let newconnexion = false;

    if (!connexion) {
        connexion = await connexion.pool.connect();
        newconnexion = true;
    }

    try {
        const result = await generalisation.getObject(connexion, request);
        return result;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    } finally {
        if (newconnexion) {
            connexion.release();
        }
    }
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
