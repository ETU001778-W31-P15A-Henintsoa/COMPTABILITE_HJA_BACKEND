// services/userService.js
const connexion = require('../utils/Connexion');
const Account = require('../models/Account');

// Fonction retournant le rapport et le type de saisie
async function findAccounts(connect) {
    let newconnexion = false;
    if (!connect) {
        connect = await connexion.pool.connect();
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

module.exports = {
  findAccounts
};
