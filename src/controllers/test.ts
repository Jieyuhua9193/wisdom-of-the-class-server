const moment = require('moment');
const schedule = require('node-schedule');

export default (req, res, next) => {
  const { type } = req.body;
  // const date = moment('2020-04-11 16:12:00').format('YYYY-MM-DD HH:mm:ss');
  // // schedule.cancelJob(type);
  const startAt = '2020-4-11 18:00:00';
  const start =  new Date(startAt).getTime();
  // console.log(start);
  // const now = moment().valueOf();
  // const boolean = start > now;
  console.log(start);
  res.status(200).send('123')
}
