import http from 'http';

const PORT = 3001;
const server = http.createServer((req, res) => {
 if (req.url === '/quote') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ meddelande: 'Hello from the server!' }));
} else if (req.method === 'POST') {  // ← else if
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mottaget: true }));
    });
} 
server.listen(PORT, () => console.log(`http://localhost:${PORT}`))});