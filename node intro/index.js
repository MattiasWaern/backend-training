import readlineSync from "readline-sync";
import fs from "fs/promises";
import { appName } from "./modul1.js";
import { getGreeting } from "./modul2.js";

const text = readlineSync.question("Skriv en sak som ska sparas: ");

async function main() {
  try {

    await fs.writeFile("data.txt", text, "utf-8");
    console.log("File written successfully");

    const data = await fs.readFile("data.txt", "utf-8");
    console.log(data);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${appName}</title>
</head>

<body>
<h1>${getGreeting()} ${appName}</h1>
</body>
</html>`;

    await fs.writeFile("index.html", html, "utf-8");
    console.log("index.html created");

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();