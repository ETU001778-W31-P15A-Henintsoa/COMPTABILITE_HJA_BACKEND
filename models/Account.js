import { pool } from '../utils/Connexion.js';
import { getObject } from '../utils/Generalisation.js';

class Account {
    constructor() {
    }

    // Tout les plan comptables disponibles
    async findAccounts(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM plancomptable WHERE etat=1`;
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

export default Account;