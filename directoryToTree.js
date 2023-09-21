
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
      path: relativePath,
      name,
      type: 'dir',
      size: stats.size,
      children,
    };
  } else if (stats.isFile()) {
    return {
      path: relativePath,
      name,
      type: 'file',
      size: stats.size,
    };
  }
}

/** 

// Ejemplo Number 1
const tree = directoryToTree('dummy_dir/a_dir', 5);
console.log("---------------EXAMPLE 1----------------");
console.log(JSON.stringify(tree, null, 2)); // Muestra la estructura en formato JSON en la consola

// Ejemplo Number 2
const tree2 = directoryToTree('dummy_dir', 5);
console.log("---------------EXAMPLE 2----------------");
console.log(JSON.stringify(tree2, null, 2)); // Muestra la estructura en formato JSON en la consola

// Ejemplo Number 3
const tree3 = directoryToTree('dummy_dir', 1);
console.log("---------------EXAMPLE 3----------------");
console.log(JSON.stringify(tree3, null, 2)); // Muestra la estructura en formato JSON en la consola

**/