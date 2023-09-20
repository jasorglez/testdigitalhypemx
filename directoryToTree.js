

const fs = require('fs');
const path = require('path');

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

// Ejemplo de uso:
const tree = directoryToTree('dummy_dir', 5);
console.log(JSON.stringify(tree, null, 2)); // Muestra la estructura en formato JSON en la consola
