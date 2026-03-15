import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

//mockdata

let users = [
   { id: 1, name: 'Alice', email: 'alicegamer@example.com'},
   { id: 2, name: 'Bob', email: 'bobgamer@example.com'},
   { id: 3, name: 'Charlie', email: 'charliegamer@example.com'}
]