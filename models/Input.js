import { request } from 'express';
import { pool } from '../utils/Connexion.js';
import { getObject, updating } from '../utils/Generalisation.js';

class Input {
    constructor() {
    }

    // Tout les rapports disponibles
    async getDocumentsNumber(connect, prefix) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        try {
            const request = `SELECT count(*) FROM v_saisie WHERE npiece LIKE '${prefix}%'`;
            console.log(request);
            const result = await getObject(connect, request);
            return result;
        } catch (error) {
            console.error(error.stack);
            return null;
        } finally {
            if (newconnexion) {
                connect.close()
            }
        }
    }

    // Insertion de Saisie
    async insertInput(connect, data){
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }

        var request = '';

        try {
            request = `begin`;
            await updating(connect, request);

            // request = `insert into SaisieOperation (idso, mois, annee, npiece, idr) values('${data['mois']}', '${data['annee']}', '${data['npiece']}', '${data['idr']}')`;
            // await updating(connect, request);

            // const length = JSON.parse(data['ligne']).length;
            var lignes = (data['ligne']);

            console.log(lignes);

            return true;
        } catch (error) {
            request = 'rollback'
            console.error(error.stack);
            return false;
        } finally {
            if (newconnexion) {
                connect.release();
            }
        }
    }
};

export default Input ;