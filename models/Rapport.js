const connexion = require('../utils/Connexion');
const generalisation = require('../utils/Generalisation');

class Rapport {
    constructor() {
    }

    // Tout les rapports disponibles
    async findRapports(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await connexion.pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM Rapport WHERE etat=1`;
            console.log(request);
            const result = await generalisation.getObject(connect, request);
            return result;
        } catch (error) {
            console.error(error.stack);
            return null;
        } finally {
            if (newconnexion) {
                connect.release();
            }
        }
    }
};

module.exports = Rapport;