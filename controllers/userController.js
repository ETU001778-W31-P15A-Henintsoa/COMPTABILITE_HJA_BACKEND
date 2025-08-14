const connexion = require('../models/Connexion');
const userModel = require('../models/userModel');

// const addUser = async (req, res) => {
//     try {
//         const { identifiant, nom, prenom, mail, mdp, idtu } = req.body;

//         // Vérification des champs requis
//         if (!identifiant || !nom || !prenom || !mail || !mdp || !idtu) {
//             return res.status(400).json({ 
//                 error: 'Tous les champs sont requis' 
//             });
//         }

//         // Vérification des longueurs
//         if (identifiant.length > 30) return res.status(400).json({ error: 'Identifiant trop long (max 30 caractères)' });
//         if (nom.length > 30) return res.status(400).json({ error: 'Nom trop long (max 30 caractères)' });
//         if (prenom.length > 30) return res.status(400).json({ error: 'Prénom trop long (max 30 caractères)' });
//         if (mail.length > 30) return res.status(400).json({ error: 'Email trop long (max 30 caractères)' });
//         if (mdp.length > 10) return res.status(400).json({ error: 'Mot de passe trop long (max 10 caractères)' });
//         if (idtu.length > 6) return res.status(400).json({ error: 'idtu trop long (max 6 caractères)' });

//         // Vérifier si l'utilisateur existe déjà
//         const existingUser = await userModel.findUser(identifiant, mail);
//         if (existingUser) {
//             return res.status(409).json({ 
//                 error: 'Un utilisateur avec cet identifiant ou cet email existe déjà' 
//             });
//         }

//         // Insertion dans la base
//         const newUser = await userModel.insertUser(identifiant, nom, prenom, mail, mdp, idtu);

//         // Réponse avec l'utilisateur inséré
//         return res.status(201).json({ 
//             message: 'Utilisateur ajouté avec succès', 
//             data: newUser 
//         });

//     } catch (err) {
//         console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
//         return res.status(500).json({ error: 'Erreur serveur' });
//     }
// };

async function findUser (req, res) {
    let connect = await connexion.pool.connect();
    try {
        const users = await userModel.findUser(connect, 'select * from utilisateur');
        return res.status(200).json(users);
    } catch (err) {
        console.error('Erreur lors du pack utilisateur', err);
        return res.status(500).json({ error: 'Erreur serveur' });
    }finally{
        connect.release();
    }
};

module.exports = {
    // addUser,
    findUser
};
