const App = require('./application');
const serverStatic = require('./middlewares/server-static');
const app = App();
const path = require('path');
const fs = require('fs');

const index = (req, res, next) => {
  const publicPath = path.join(__dirname, './public');
  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  })
}


app.use(serverStatic());
module.exports = app;