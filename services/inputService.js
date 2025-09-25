// services/userService.js
import { pool } from '../utils/Connexion.js';
import Input from '../models/Input.js';

// Fonction retournant lele nombre de saisie avec le prefix donné
async function getDocumentsNumber(connect, prefix) {
    let newconnexion = false;
    if (!connect) {
        connect = await pool.connect();
        newconnexion = true;
    }

    try {
        const input = new Input();
        const inputresult = await input.getDocumentsNumber(connect, prefix);
        return inputresult;
    } catch (error) {
        console.error(error.stack);
    }finally{
        if(newconnexion){
            connect.release();
        }
    }
}

// Fonction d'insertion de saisie
async function insertInput(connect, data) {
    let newconnexion = false;
    if (!connect) {
        connect = await pool.connect();
        newconnexion = true;
    }

    try {
        const input = new Input();
        const inputresult = await input.insertInput(connect, data);
        return inputresult;
    } catch (error) {
        console.error(error.stack);
    }finally{
        if(newconnexion){
            connect.release();
        }
    }
}

export {
   getDocumentsNumber,
   insertInput
};
