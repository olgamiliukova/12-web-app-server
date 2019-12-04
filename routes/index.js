const cards = require('./cards');
const users = require('./users');

module.exports.init = (app) => {
  app.use('/', cards);
  app.use('/', users);
  app.use('/', (req, res) => {
    res.status(404);
    res.send({
      message: 'The requested resource is not found',
    });
  });
};
