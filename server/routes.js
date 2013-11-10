var controllers = require('./controllers');

module.exports =  function setup(app) {
  app.get('/', controllers.indexPage);
};