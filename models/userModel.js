const connexion = require('./Connexion');
const generalisation = require('./Generalisation');

const findUser = async (connect, request) => {
    let newconnexion = false;

    if (!connect) {
        connect = await connexion.pool.connect();
        newconnexion = true;
    }

    try {
        const result = await generalisation.getObject(connect, request);
        return result;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    } finally {
        if (newconnexion) {
            connect.release();
        }
    }
};


// const insertUser = async (identifiant, nom, prenom, mail, mdp, idtu) => {
//     const result = await pool.query(
//         'INSERT INTO Utilisateur (identifiant, nom, prenom, mail, mdp, idtu) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//         [identifiant, nom, prenom, mail, mdp, idtu]
//     );
//     return result.rows[0];
// };

module.exports = {
    findUser //,
    // insertUser,
};
