// services/userService.js
const connexion = require('../utils/Connexion');
const User = require('../models/User');

// Fonction de login de l'Utilisateur
async function loginUser(connect, identifiant, mdp) {
    let newconnexion = false;
    if (!connect) {
        connect = await connexion.pool.connect();
        newconnexion = true;
    }

    try {
        const user = new User(identifiant, mdp, null, null, null, null, null);
        const result = await user.findUser(connect);
        if (!result) return 0;

        return result;
    } catch (error) {
        console.error(error.stack);
    } finally {
        if (newconnexion) {
            connect.release();
        }
    }
}

module.exports = {
  loginUser
};
