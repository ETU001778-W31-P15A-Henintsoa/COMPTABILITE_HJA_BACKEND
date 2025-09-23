import { pool } from '../utils/Connexion.js';
import Account from '../models/Account.js';

// Fonction retournant le rapport et le type de saisie
async function findAccounts(connect) {
    let newconnexion = false;
    if (!connect) {
        connect = await pool.connect();
        newconnexion = true;
    }

    try {
        const account = new Account();
        const accountresult = await account.findAccounts(connect);
        return accountresult;
    } catch (error) {
        console.error(error.stack);
    } finally {
        if (newconnexion) {
            connect.release();
        }
    }
}

export {
  findAccounts
};
