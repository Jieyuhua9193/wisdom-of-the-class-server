import bodyParser from 'body-parser'
import user from './user'

// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

export default app => {
  app.use('/', (req, res, next) => {
    next()
  });
  app.use('/user', urlencodedParser, user)
}