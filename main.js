
const fs = require('fs');
const path = require('path');

function directoryToTree(rootPath, maxDepth) {
  const stats = fs.statSync(rootPath);
  const isDirectory = stats.isDirectory();
  const name = path.basename(rootPath);
  const fullPath = path.resolve(rootPath);

  if (maxDepth === 0 || !isDirectory) {
    return {
      name,
      path: path.relative(process.cwd(), fullPath),
      type: isDirectory ? 'dir' : 'file',
      size: isDirectory ? 4096 : stats.size,
    };
  }

  const children = fs.readdirSync(rootPath).map(child => {
    const childPath = path.join(rootPath, child);
    return directoryToTree(childPath, maxDepth - 1);
  });

  return {
    name,
    path: path.relative(process.cwd(), fullPath),
    type: 'dir',
    size: 4096,
    children,
  };
}

// Example 1:
const result = directoryToTree('dummy_dir/a_dir', 5);
console.log("---------RESULTADO EJEMPLO 1-----------------------")
console.log(JSON.stringify(result, null, 2));

//Example 2:
const result2 = directoryToTree('dummy_dir', 5);
console.log("---------RESULTADO EJEMPLO 2-----------------------")
console.log(JSON.stringify(result2, null, 2)) ;

//Example 2:
const result3 = directoryToTree('dummy_dir', 1);
console.log("---------RESULTADO EJEMPLO 3-----------------------")
console.log(JSON.stringify(result3, null, 2)) ;