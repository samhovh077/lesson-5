import fs from 'fs';
import { format } from "date-fns";
import { Readable, Writable, Transform } from 'stream';

const readableStream = new Readable({
    read() { }
})

setInterval(() => {
    const date = new Date();
    readableStream.push(date.toISOString());
}, 1000);

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const formattedDate = format(new Date(chunk.toString()), 'yyyy-MM-dd HH:mm:ss') + '\n';
        callback(null, formattedDate);
    }
})

const fileStream = fs.createWriteStream('log.txt', { flags: 'a' });

const writeAbleStream = new Writable({
    write(chunk, encoding, callback) {
        fileStream.write(chunk, encoding, callback);
    },
});

readableStream.pipe(transformStream).pipe(writeAbleStream);

