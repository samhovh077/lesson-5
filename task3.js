import fs from 'fs';

const directory = process.argv[2] || process.cwd();

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error(`Error: ${err.message}`);
        return;
    }

    const publicFiles = [];
    const hiddenFiles = [];

    files.forEach(file => {
        if (file.startsWith('.')) {
            hiddenFiles.push(file);
        } else {
            publicFiles.push(file);
        }
    });

    console.log(`Public files: ${publicFiles.join(', ')}`);
    console.log(`Hidden files: ${hiddenFiles.join(', ')}`);
});

//You can use node_modules for dynamic directory
