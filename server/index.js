import express from 'express';
import parser from 'body-parser';
import path from 'path';

import router from './router';

const app = express();
const port = 3005;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

app.listen(port, () => console.log(`server is now listening to port ${port}`))