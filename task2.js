import fs from 'fs';
import { Transform } from 'stream';

const inputStream = fs.createWriteStream('input.txt', { flags: 'a' });

inputStream.write('hello world');


const readableStream = fs.createReadStream('input.txt', { encoding: 'utf-8' });

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const upperCase = chunk.toString().toUpperCase();
        callback(null, upperCase);
    }
})

const writeAbleStream = fs.createWriteStream('output.txt', { flags: 'a' });

readableStream.pipe(transformStream).pipe(writeAbleStream);