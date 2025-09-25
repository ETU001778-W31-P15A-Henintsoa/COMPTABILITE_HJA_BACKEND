import { readFileSync } from 'fs';

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

function sanitizeToJson(badJsonString) {
  // Étape 1 : Ajouter des guillemets autour des clés
  let fixed = badJsonString.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');

  // Étape 2 : Ajouter des guillemets autour des valeurs alphanumériques non numériques (comme PC1, REF1234)
  fixed = fixed.replace(/:\s*([A-Za-z_][\w-]*)/g, ':"$1"');

  // Maintenant on peut parser la chaîne
  try {
    return JSON.parse(fixed);
  } catch (e) {
    console.error("Erreur de parsing :", e.message);
    return null;
  }
}


export {
    ongoingSession,
    sanitizeToJson
};
