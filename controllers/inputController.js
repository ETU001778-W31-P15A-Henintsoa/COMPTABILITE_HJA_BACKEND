import { getDocumentsNumber as _getDocumentsNumber, insertInput as _insertInput } from '../services/inputService.js';

async function getDocumentsNumber(req, res) {
    try {
        const { prefix } = req.body.prefix;
        const data = await _getDocumentsNumber(null, prefix);
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

async function insertInput(req, res) {
    try {
        const { data } = req.body;
        const r = await _insertInput(null, data);
        // if (!data) return res.status(404).json(null);
        // else {
        //     res.set('Content-Type', 'application/json');
        //     return res.status(200).json(true);
        // }    
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json(false);
    }
};

export {
    getDocumentsNumber,
    insertInput
};
