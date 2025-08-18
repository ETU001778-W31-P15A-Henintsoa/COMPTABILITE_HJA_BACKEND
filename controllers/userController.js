const userService = require('../services/userService');

async function loginUser (req, res) {
    const userIdentifiant = req.body.identifiant;
    const usermdp = req.body.mdp;
    
    try {
        const users = await userService.loginUser(null, userIdentifiant, usermdp);
        if (users.length === 0) return res.status(404).json(null);
        else {
            res.set('Content-Type', 'application/json');
            return res.status(200).json(users);
        }    
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json(null);
    }
};

module.exports = {
    loginUser
};
