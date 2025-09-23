import { pool } from '../utils/Connexion.js';
import { getObject } from '../utils/Generalisation.js';

class Rapport {
    constructor() {
    }

    // Tout les rapports disponibles
    async findRapports(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM Rapport WHERE etat=1`;
            console.log(request);
            const result = await getObject(connect, request);
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

export default Rapport;