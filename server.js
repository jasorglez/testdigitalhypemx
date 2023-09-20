const http = require('http');
const fs = require('fs');
const path = require('path');

// Función para generar la estructura de árbol (directoryToTree)
function directoryToTree(rootPath, maxDepth) {
  const stats = fs.statSync(rootPath);
  const name = path.basename(rootPath);
  const relativePath = path.relative(process.cwd(), rootPath);

  if (stats.isDirectory() && maxDepth > 0) {
    const children = fs.readdirSync(rootPath).map((child) => {
      const childPath = path.join(rootPath, child);
      return directoryToTree(childPath, maxDepth - 1);
    });

    return {
      name,
      path: relativePath,
      type: 'dir',
      size: stats.size,
      children,
    };
  } else if (stats.isFile()) {
    return {
      name,
      path: relativePath,
      type: 'file',
      size: stats.size,
    };
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Servir la página principal con los botones
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  } else if (req.url === '/example1.html' || req.url === '/example2.html' || req.url === '/example3.html') {
    // Servir los archivos HTML de los ejemplos
    const exampleHtml = fs.readFileSync(path.join(__dirname, req.url.substring(1)), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(exampleHtml);
  } else if (req.url === '/example1-data') {
    // Generar y enviar los datos del ejemplo 1
    const tree = directoryToTree('dummy_dir/a_dir', 5);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tree));
  } else if (req.url === '/example2-data') {
    // Generar y enviar los datos del ejemplo 2
    const tree = directoryToTree('dummy_dir', 5);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tree));
  } else if (req.url === '/example3-data') {
    // Generar y enviar los datos del ejemplo 3
    const tree = directoryToTree('dummy_dir', 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tree));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

//const PORT = 3000;

//server.listen(PORT, () => {
//  console.log(`Servidor escuchando en el puerto ${PORT}`);
//});

