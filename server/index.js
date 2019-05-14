import express from 'express';
import parser from 'body-parser';
import path from 'path';

const app = express();
const port = 3005;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

//router here

app.listen(port, () => console.log(`server is now listening to port ${port}`))