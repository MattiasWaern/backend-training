// citatmaskin.js
let citat = [
  { text: 'Det löser sig. Om inte, är det inte slutet.', kategori: 'pepp' },
  { text: 'Koden fungerar inte? Har du provat att stänga och öppna datorn?', kategori: 'rolig' },
  { text: 'Idag är en bra dag att lära sig något nytt.', kategori: 'pepp' },
  { text: 'Varje expert var en gång en nybörjare.', kategori: 'pepp' },
  { text: 'Why do programmers prefer dark mode? Because light attracts bugs.', kategori: 'rolig' }
];

// Funktion för att slumpa ett element från en array
const slumpa = (arr) => arr[Math.floor(Math.random() * arr.length)];

const sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Exportera handleRequest för att användas i server-api.js
export const handleRequest = (req, res, url) => {
  const path = url.pathname;
  const method = req.method;

  // Roten - välkomstmeddelande och tillgängliga rutter
  if (path === '/' && method === 'GET') {
    return sendJSON(res, 200, {
      meddelande: 'Välkommen till Citatmaskinen!',
      routes: {
        'GET /api/citat': 'Slumpat citat',
        'GET /api/citat?kategori=x': 'Slumpat citat i kategori',
        'GET /api/citat/alla': 'Alla citat',
        'POST /api/citat': 'Lägg till citat { text, kategori }'
      }
    });
  }

  // Hämta alla citat
  if (path === '/api/citat/alla' && method === 'GET') {
    return sendJSON(res, 200, citat);
  }

  // Hämta slumpat citat, eventuellt filtrerat på kategori
  if (path === '/api/citat' && method === 'GET') {
    const kategori = url.searchParams.get('kategori');

    // Om kategori finns, filtrera citaten
    if (kategori) {
      const filtrerade = citat.filter(c => c.kategori === kategori);
      if (filtrerade.length === 0) {
        return sendJSON(res, 404, { error: `Ingen kategori '${kategori}' hittades` });
      }
      return sendJSON(res, 200, slumpa(filtrerade));
    }
    
    // Annars, returnera ett slumpat citat från alla
    return sendJSON(res, 200, slumpa(citat));
  }

  // Lägg till nytt citat
  if (path === '/api/citat' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { text, kategori } = JSON.parse(body);
        if (!text || !kategori) {
          return sendJSON(res, 400, { error: 'Text och kategori krävs' });
        }
        citat.push({ text, kategori });
        return sendJSON(res, 201, { message: 'Citat tillagt' });
      } catch {
        return sendJSON(res, 400, { error: 'Ogiltig JSON' });
      }
    });
    return;
  }

  // Om ingen rutt matchar
  sendJSON(res, 404, { error: 'Rutten hittades inte' });
};