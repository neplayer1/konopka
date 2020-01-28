const path = require('path');
const { existsSync, mkdirSync } = require('fs');

mkdirSync(path.join(__dirname, "/images2"));
let fileExistFlag = existsSync(path.join(__dirname, "/images2"));
console.log({fileExistFlag});