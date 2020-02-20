import bodyParser from 'body-parser'
import user from './user'
import qiniu from './qiniu'
import authControllers from '../controllers/auth'

// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

export default app => {
  app.use('/', jsonParser, authControllers);
  app.use('/user', jsonParser, user);
  app.use('/qiniu', qiniu)
}
