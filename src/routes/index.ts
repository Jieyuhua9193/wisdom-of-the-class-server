import bodyParser from 'body-parser';
import user from './user';
import qiniu from './qiniu';
import Rclass from './class';
import student from './student';
import mini from './mini';
import assets from './assets';
import dormitory from './dormitory';
import system from './system';
import common from './common';
import active from './active';
import authControllers from '../controllers/auth';
import testControllers from '../controllers/test';

// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

export default app => {
  app.use('/test', jsonParser, testControllers);
  app.use('/', jsonParser, authControllers);
  app.use('/user', jsonParser, user);
  app.use('/qiniu', qiniu);
  app.use('/class', Rclass);
  app.use('/student', student);
  app.use('/mini', mini);
  app.use('/assets', assets);
  app.use('/common', common);
  app.use('/dormitory', dormitory);
  app.use('/system', system);
  app.use('/active', active)
}
