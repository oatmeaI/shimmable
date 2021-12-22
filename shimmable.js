const fs = require("fs");
const { execSync } = require('child_process');

async function main() {
    try {
        const path = process.argv.slice(2)[0];
        const file = fs.readFileSync(`${process.cwd()}/${path}`, 'utf8');
        const editedFile = `global.importModule = require; ${file}`;
        console.log(execSync(`node -p '${editedFile}' -r ./node_modules/shimmable/doShims.js`).toString())
    } catch (e) {
        console.error(e);
    }
}
main();
