import express = require('express');
import mongoose = require('mongoose');

const app: express.Application = express();
app.set("port", process.env.PORT || 3000);
// 数据库相关
const mongoUrl = 'mongodb://127.0.0.1/wisdom_of_class';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('mongodb connection success !')
}).catch(err => {
  console.log('mongodb connection error >>>' + err)
});

module.exports = app;