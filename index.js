import readlinkSync from "readline-sync";
import fs from "fs/promises";


const text = readlinkSync.question("Skriv en sak som ska sparas: ");


async function main(){
    try{
        await fs.writeFile("data.txt", text);
        console.log("File written successfully");


        const data = await fs.readFile("data.txt", "utf-8");
        console.log(data);
    } 
    catch (error){
        console.error("An error occurred while reading the file:", error);
} 
}

main();