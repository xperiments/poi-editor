var serverFactory = require('spa-server');

var server = serverFactory.create({
  path: '.',
  port: 8000,
  fallback:function (request, response) {
      console.log(request.url)
      if ( /\.js|\.css|.html|.hbs/g.test(request.url) )
      {
          return request.url
      }
    return 'index.html';
  }
});

server.start();
