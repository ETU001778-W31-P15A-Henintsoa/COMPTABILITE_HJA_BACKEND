const accountService = require('../services/accountService');

async function findAccounts(req, res) {
    try {
        const data = await accountService.findAccounts(null);
        if (!data) return res.status(404).json(null);
        else {
            res.set('Content-Type', 'application/json');
            return res.status(200).json(data);
        }    
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json(null);
    }
};

module.exports = {
    findAccounts
};
