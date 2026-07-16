const fs = require('fs');
const path = require('path');
const dir = './components';
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // Match dark: followed by anything up to a space, quote or backtick
  content = content.replace(/\bdark:[^\s"'`]+/g, '');
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
