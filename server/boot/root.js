'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

  router.get('/',function(req, res) {
    res.render('index', {
      title: "Loopback Cloud Whatever Upload"
    })
  });
  server.use(router);
};
