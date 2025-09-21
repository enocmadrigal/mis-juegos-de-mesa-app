const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../assets/img');
const output = path.join(__dirname, '../data/gameDetailImages.ts');

function getFolders(dir) {
    return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

function getImages(dir) {
    return fs.readdirSync(dir).filter(f =>
        /\.(jpg|jpeg|png|gif)$/i.test(f)
    );
}

const folders = getFolders(imgDir);

let fileContent = `// Este archivo es generado automáticamente. No editar a mano.
export const gameDetailImages: { [key: string]: any[] } = {\n`;

folders.forEach(folder => {
    const images = getImages(path.join(imgDir, folder));
    if (images.length === 0) return;
    fileContent += `  "${folder}": [\n`;
    images.forEach(img => {
        fileContent += `    require("../assets/img/${folder}/${img}"),\n`;
    });
    fileContent += `  ],\n`;
});

fileContent += `};\n`;

fs.writeFileSync(output, fileContent);
console.log('Archivo gameDetailImages.ts generado.');
