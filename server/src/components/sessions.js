const assignSession = (req) => {
  req.session.isAuth = process.env.SESSION_AUTH || 'isAuth'
  console.log('assigning session: ', req.session)
}

const validateSession = (req, res, next) => {
  if (req.session && 
    req.session.isAuth === (process.env.SESSION_AUTH || 'isAuth')) {
      console.log('valid session: ', req.session)
    next();
  } else {
    console.log('invalid session: ', req.session)
    res.redirect('/');
  }
}

export {
  assignSession,
  validateSession
}