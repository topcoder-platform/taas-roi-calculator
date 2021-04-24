var fs = require('fs');
var sheetApiKey = require('./googlesheets-credential.json');
fs.writeFile(process.env.GCP_KEY_FILE, sheetApiKey, (err) => {});
