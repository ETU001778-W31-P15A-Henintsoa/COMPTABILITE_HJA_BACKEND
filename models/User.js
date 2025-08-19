const connexion = require('../utils/Connexion');
const generalisation = require('../utils/Generalisation');

class User {
    constructor(identifiant, mdp, nom, prenom, mail, telephone, idtu) {
        this.identifiant = identifiant;
        this.mdp = mdp;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.telephone = telephone;
        this.idtu = idtu;
    }

    // Trouver un Utilisateur
    async findUser(connect) {
        let newconnexion = false;
        if (!connect) {
            connect = await connexion.pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT * FROM v_utilisateurs WHERE identifiant = '${this.identifiant}' and mdp='${this.mdp}' and etat=1`;
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

module.exports = User;