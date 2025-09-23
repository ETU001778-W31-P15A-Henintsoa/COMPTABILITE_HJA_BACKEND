import { loginUser as _loginUser } from '../services/userService.js';

export const loginUser = async (req, res) => {
    const userIdentifiant = req.body.identifiant;
    const usermdp = req.body.mdp;
    
    try {
        const users = await _loginUser(null, userIdentifiant, usermdp);
        if (users.length == 0) return res.status(404).json(null);
        else {
            res.set('Content-Type', 'application/json');
            return res.status(200).json(users);
        }    
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json(null);
    }
};

export const insertUser = (req,res) => {
    const userIdentifiant = req.body.identifiant;
    const userName = req.body.nom;
    const userPrenom = req.body.prenom;
    const userMail = req.body.mail;
    const userTelephone = req.body.telephone;
    const userMdp = req.body.mdp;
    const userType = req.body.idtu;

    try {
        const user = new User(userIdentifiant,userName,userPrenom,userMail,userTelephone,userMdp,userType,null);

        const existingUser = user.checkUserExists(null);

        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Utilisateur existe déjà avec cet identifiant ou email !" 
            });
        }
        const result = user.insertUser(null);
        return res.status(201).json({
            success: true,
            message: "Utilisateur inséré avec succès",
            data: result
        });
    }catch(err) {
        console.error(err.stack);
        return res.status(500).json(null);
    }
}

export const getAllUsers = (req, res) => {
    try{
        const users = User.getAllUsers(null);
        return users;
    }catch(err){
        console.error(err.stack);
        return res.status(500).json(null);
    }
}

export const updateUser = (req, res) => {
    const userIdentifiant = req.body.identifiant;
    const updateName = req.body.nom;
    const updatePrenom = req.body.prenom;
    const updateMail = req.body.mail;
    const updateTelephone = req.body.telephone;
    const updateMdp = req.body.mdp;
    const updateType = req.body.idtu;
    const updateEtat = req.body.etat;

    try {
        const user = new User(userIdentifiant,updateName,updatePrenom,updateMail,updateTelephone,updateMdp,updateType,updateEtat);
        const result = user.updateUser(null);
        return res.status(201).json({
            success: true,
            message: "Utilisateur mofifie avec succès",
            data: result
        });
    }catch(err) {
        console.error(err.stack);
        return res.status(500).json(null);
    }
}

