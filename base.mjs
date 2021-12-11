import fs from 'fs';

export class File {
    constructor(filepath) {
        this.filepath = filepath;
    }

    read() {
        return fs.readFileSync(this.filepath, 'utf-8');
    }
}

export class Arg {
    constructor(commandNum) {
        this.commandNum = commandNum;
    }

    get(index) {
        if (index + this.commandNum >= process.argv.length) return null;
        return process.argv[index + this.commandNum];
    }
}