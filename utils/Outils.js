import { readFileSync } from 'fs';
import { join } from 'path';

const sessionFilePath = join(__dirname, '../config/session.json');

function ongoingSession() {
    try {
        // Read the JSON file
        const data = readFileSync(sessionFilePath, 'utf8');
        const json = JSON.parse(data);

        if (json.sessionSecret.length != 0) return true;

        return false;
    } catch (error) {
        console.error('Error reading sessions file:', error);
        return false;
    }
}

export {
    ongoingSession
};
