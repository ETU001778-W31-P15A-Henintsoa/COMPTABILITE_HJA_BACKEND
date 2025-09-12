// services/userService.js
const connexion = require('../utils/Connexion');

// Fonction retournant le rapport et le type de saisie
// async function rapportInputTypes(connect) {
//     let newconnexion = false;
//     if (!connect) {
//         connect = await connexion.pool.connect();
//         newconnexion = true;
//     }

//     try {
//         const rapport = new Rapport();
//         const rapporttypes = new InputTypes();
//         const rapportresult = await rapport.findRapports(connect);
//         const rapporttypesresult = await rapporttypes.findInputTypes(connect);
//         const data = { rapport: rapportresult, rapporttypes: rapporttypesresult };
//         return data;
//     } catch (error) {
//         console.error(error.stack);
//     } finally {
//         if (newconnexion) {
//             connect.release();
//         }
//     }
// }

module.exports = {
//   rapportInputTypes
};
