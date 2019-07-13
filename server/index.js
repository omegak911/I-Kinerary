import express from 'express';
import parser from 'body-parser';
import path from 'path';
import passport from 'passport';

import router from './router';
import './auth';

const app = express();
const port = 3005;

app.use(passport.initialize());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

if (process.env.NODE_ENV !== 'jest') {
  app.listen(port, () => console.log(`server is listening on port ${port}`));
}

export default app;