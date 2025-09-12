const rapportService = require('../services/rapportService');

async function findRapports(req, res) {
    try {
        const data = await rapportService.findRapports(null);
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
    findRapports
};
