const http = require("https");
const fs = require("fs");

class Request {
    constructor(url) {
        this.url = url;
        this.method = "GET";
        this.headers = {};
    }

    async loadJSON() {
        const res = await new Promise((resolve) => {
            http.get(
                this.url,
                {
                    headers: this.headers,
                },
                resolve
            );
        });
        const data = await new Promise((resolve, reject) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("error", (err) => reject(err));
            res.on("end", () => resolve(data));
        });
        return JSON.parse(data);
    }
}

const iCloud = class iCloud {
    documentsDirectory() {
        const path = `${process.cwd()}/document_shim`;
        //if not exists, create it
        return `${process.cwd()}/document_shim`;
    }

    readString(path) {
        return fs.readFileSync(path, 'utf8');
    }

    writeString(path, data) {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
}

FileManager = {
    iCloud: () => new iCloud(),
};

module.exports = {
    iCloud,
    Request,
    FileManager,
};
