import bodyParser from 'body-parser'
import user from './user'
import authControllers from '../controllers/auth'

// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({extended: false});

export default app => {
  app.use('/', urlencodedParser, authControllers);
  app.use('/user', urlencodedParser, user)
}
