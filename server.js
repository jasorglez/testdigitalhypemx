const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/tree/:example', (req, res) => {
  const example = req.params.example;
  let result;

  switch (example) {
    case 'example1':
      result = directoryToTree('dummy_dir/a_dir', 5);
      break;
    case 'example2':
      result = directoryToTree('dummy_dir', 5);
      break;
    case 'example3':
      result = directoryToTree('dummy_dir', 1);
      break;
    default:
      result = { error: 'Invalid example' };
  }

  res.json(result);
});

function directoryToTree(rootPath, maxDepth) {
  const stats = fs.statSync(rootPath);
  const name = path.basename(rootPath);
  const type = stats.isDirectory() ? 'dir' : 'file';
  const size = stats.size;

  if (maxDepth === 0 || !stats.isDirectory()) {
    return {
      path: rootPath,
      name,
      type,
      size
    };
  }

  const children = fs.readdirSync(rootPath).map(child => {
    const childPath = path.join(rootPath, child);
    return directoryToTree(childPath, maxDepth - 1);
  });

  return {
    path: rootPath,
    name,
    type,
    size,
    children
  };
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
