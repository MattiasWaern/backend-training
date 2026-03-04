import fs from "fs";

await fs.writeFile('data.txt', 'Hej från Node!', 'utf-8')

await fs.readFile('data.txt', 'utf-8')

console.log('File has been read')