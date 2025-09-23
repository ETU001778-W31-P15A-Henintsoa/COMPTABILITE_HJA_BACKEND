import { pool } from '../utils/Connexion.js';
import { getObject, updating } from '../utils/Generalisation.js';

class User {
    // constructor() {
    // }

    constructor(identifiant, mdp) {
        this.identifiant = identifiant;
        this.mdp = mdp;
    }

    // Trouver un Utilisateur
    async findUser(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM v_utilisateurs WHERE identifiant = '${this.identifiant}' and mdp='${this.mdp}' and etat=1`;
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

    // verifier si l'utilisateur existe deja
    async checkUserExists(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM v_utilisateurs WHERE identifiant = '${this.identifiant}'OR mail = '${this.mail}' AND etat=1`;
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


    // Inserer un utilisateur
    async insertUser(connect) {
        let newconnexion = false;
        if(!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try{
            const request = `INSERT INTO utilisateur values(default,'${this.identifiant}','${this.nom}','${this.prenom}','${this.mail}','${this.telephone}','${this.idtu}')`;
            console.log(request);
            const result = await updating(connect,request);
            return result;
        }catch(error) {
            console.error(error.stack);
            return null;
        }finally{
            if(newconnexion){
                connect.release();
            }
        }
    }

    // Lister tous les utilsateurs
    async getAllUsers(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM v_utilisateurs`;
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

    // Modifier un utilisateur
    async updateUser(connect) {
        let newconnexion = false;
        if(!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try{
            const request = `UPDATE utilisateur SET nom='${this.nom}', prenom='${this.prenom}',mail='${this.mail}',mdp='${this.mdp}',idtu='${this.idtu}',telephone='${this.telephone}',etat=${this.etat} WHERE identifiant='${this.identifiant}'`;
            console.log(request);
            const result = await updating(connect,request);
            return result;
        }catch(error){
            console.error(error.stack);
            return null;
        }finally{
            if(newconnexion){
                connect.release();
            }
        }
    }

};

export default User ;