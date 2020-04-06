const http = require("http");
const debug = require("./utils/debug")("app");
const Middleware = require('./middleware');
const serverStatic = require("./server-static");

// const _server = http.createServer((req, res) => {
//   serverStatic(req, res);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");

//   const filePath = path.join(__dirname, "./public/index.html");
//   fs.readFile(filePath, (err, data) => {
//     if (err) throw err;
//     res.end(data);
//   });
// });

const application = () => {
  const _middleware = Middleware();
  const _server = http.createServer((req, res) => {
    _middleware.run(req,res);
  })
  const listen = (port = 3000, hostname = "127.0.0.1", fn) => {
    _server.listen(port, hostname, fn);
  };
  const use = (path, fn) => {
    if (typeof path === 'string' && typeof fn === 'function') {
      fn._path = path;
    } else if (typeof path === 'function') {
      fn = path;
    } else {
      throw new Error('Usage: use(path, fn) or use(fn)');
    }
    _middleware.add(fn);
  }
  return {
    _middleware,
    _server,
    use,
    listen,
  };
};

debug("app is initiated");

module.exports = application;
