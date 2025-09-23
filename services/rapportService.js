// services/userService.js
import { pool } from '../utils/Connexion.js';
import Rapport from '../models/Rapport.js';

// Fonction retournant le rapport et le type de saisie
async function findRapports(connect) {
    let newconnexion = false;
    if (!connect) {
        connect = await pool.connect();
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

export {
  findRapports
};
