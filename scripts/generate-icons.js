const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

async function processIcons() {
  try {
    console.log('Loading image...');
    const image = await Jimp.read('public/code-axis.jpeg');

    // Make sure public/icons exists
    if (!fs.existsSync('public/icons')) {
      fs.mkdirSync('public/icons', { recursive: true });
    }

    console.log('Generating 192x192 icon...');
    await image.clone().resize(192, 192).writeAsync('public/icons/icon-192.png');

    console.log('Generating 512x512 icon...');
    await image.clone().resize(512, 512).writeAsync('public/icons/icon-512.png');

    console.log('Icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

processIcons();
