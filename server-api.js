import http from 'http';
import { handleRequest } from './citatmaskin.js';

const PORT = 3001;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  handleRequest(req, res, url);
});

server.listen(PORT, () => {
  console.log(`Citatmaskinen körs på http://localhost:${PORT}`);
});