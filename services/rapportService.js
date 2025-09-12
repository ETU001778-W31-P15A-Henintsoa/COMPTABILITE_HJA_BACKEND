// services/userService.js
const connexion = require('../utils/Connexion');

const Rapport = require('../models/Rapport');

// Fonction retournant le rapport et le type de saisie
async function findRapports(connect) {
    let newconnexion = false;
    if (!connect) {
        connect = await connexion.pool.connect();
        newconnexion = true;
    }

    try {
        const rapport = new Rapport();
        const rapportresult = await rapport.findRapports(connect);
        return rapportresult;
    } catch (error) {
        console.error(error.stack);
    } finally {
        if (newconnexion) {
            connect.release();
        }
    }
}

module.exports = {
  findRapports
};
