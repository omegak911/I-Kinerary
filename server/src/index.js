import express from 'express';
import parser from 'body-parser';
import path from 'path';
import passport from 'passport';
import session from 'express-session';

import router from './router';
import './components/auth';

const app = express();
const port = 3005;

app.use(passport.initialize());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'Session_Secret',
  resave: true,
  saveUninitialized: false,
  cookie: { 
    // secure: true, //if https
    maxAge:  31556952000
  }
}));

app.use('/api', router);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

if (process.env.NODE_ENV !== 'jest') {
  app.listen(port, () => console.log(`server is listening on port ${port}`));
}

export default app;