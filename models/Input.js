import { request } from 'express';
import { pool } from '../utils/Connexion.js';
import { getObject, updating } from '../utils/Generalisation.js';
import { sanitizeToJson } from '../utils/Outils.js'
import { log } from 'console';

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
    async insertInput(connect, data) {
        let newconnexion = false;
        if (!connect) {
            connect = await pool.connect();
            newconnexion = true;
        }


        var request = '';

        try {
            request = `begin`;

            request = `insert into SaisieOperation (idso, mois, annee, npiece, idr) values('${data['mois']}', '${data['annee']}', '${data['npiece']}', '${data['idr']}')`;

            request = `SELECT * FROM SaisieOperation ORDER BY CAST(SUBSTRING(idso FROM 3) AS INTEGER) DESC LIMIT 1;`
            var idso = await getObject(connect, request); 
            console.log(`${idso} : ${request}`);

            var lignes = sanitizeToJson(data['lignes']);
            for (let index = 0; index < lignes.length; index++) {
                const element = lignes[index];
                if(element.operation.toString() == "1"){
                    request = request + `insert into LigneSaisie(idso, idpc, idu, libelle, ref, dr, cr) values ('${idso.idso}', '${element.compte}', 'null', '${element.libelle}', '${element.ref}', '${element.montant}', 0);`;  
                }else{
                    request = request + `insert into LigneSaisie(idso, idpc, idu, libelle, ref, dr, cr) values ('${idso.idso}', '${element.compte}', 'null', '${element.libelle}', '${element.ref}', 0, '${element.montant}'); `;
                }   
            }
            await updating(connect, request);
            request = 'end';

            await updating(connect, request);
            return true;
        } catch (error) {
            request = 'rollback';
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