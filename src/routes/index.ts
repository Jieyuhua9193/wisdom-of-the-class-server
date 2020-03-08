import bodyParser from 'body-parser'
import user from './user'
import qiniu from './qiniu'
import Rclass from './class'
import student from './student'
import mini from './mini'
import authControllers from '../controllers/auth'

// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

export default app => {
  app.use('/', jsonParser, authControllers);
  app.use('/user', jsonParser, user);
  app.use('/qiniu', qiniu);
  app.use('/class', Rclass);
  app.use('/student', student);
  app.use('/mini', mini)
}
