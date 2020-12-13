import express from 'express';
import dbConnect from './dataInterface.js';
import bookRouter from './routes/bookRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());
app.use('/rest', bookRouter);
app.use('/rest', userRouter);

async function main() {

    await dbConnect();

    app.listen(8080, () => {
        console.log('Example app listening on port 8080!');
    });
}

main();