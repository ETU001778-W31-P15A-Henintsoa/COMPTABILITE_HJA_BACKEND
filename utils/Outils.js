const fs = require('fs');
const path = require('path');

const sessionFilePath = path.join(__dirname, '../config/session.json');

function ongoingSession() {
    try {
        // Read the JSON file
        const data = fs.readFileSync(sessionFilePath, 'utf8');
        const json = JSON.parse(data);

        if (json.sessionSecret.length != 0) return true;

        return false;
    } catch (error) {
        console.error('Error reading sessions file:', error);
        return false;
    }
}


module.exports = {
    ongoingSession
};
