import fs from "fs/promises";

async function main(){
    try{
        await fs.writeFile("data.txt", "Hello, World!");
        console.log("File written successfully");


        const data = await fs.readFile("data.txt", "utf-8");
        console.log(data);
    } 
    catch (error){
        console.error("An error occurred while reading the file:", error);
} 
}

main();