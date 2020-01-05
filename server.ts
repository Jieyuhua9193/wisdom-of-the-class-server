const app = require('./app');

const server = app.listen(app.get('port'), () => {
  console.log(
  `Server is running at http://localhost:${app.get('port')} in ${app.get("env")} mode`,
  );
});

module.exports = server;