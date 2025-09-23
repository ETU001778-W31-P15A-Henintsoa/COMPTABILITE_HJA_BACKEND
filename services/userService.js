// services/userService.js
import { pool } from '../utils/Connexion.js';
import User from '../models/User.js';

// Fonction de login de l'Utilisateur
async function loginUser(connect, identifiant, mdp) {
    let newconnexion = false;
    if (!connect) {
        connect = await pool.connect();
        newconnexion = true;
    }

    try {
        const user = new User(identifiant, mdp);
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

export {
  loginUser
};
