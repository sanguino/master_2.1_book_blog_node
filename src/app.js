import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

import dbConnect from './dataInterface.js';
import bookRouter from './routes/bookRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());
app.use(bookRouter);
app.use(userRouter);


await dbConnect();

https.createServer({
    key: fs.readFileSync(path.resolve('src', 'ssl', 'server.key')),
    cert: fs.readFileSync(path.resolve('src', 'ssl', 'server.cert'))
}, app).listen(8443, () => {
    console.log('Https server started in port 8443'); });





