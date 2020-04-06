const Middleware = () => {
  const _middlewares = [];
  const _req, _res;
  const add = fn => { _middlewares.push(fn) };
  const _run = (idx, err) => {
    if(idx < 0 || idx >= _middlewares.length) return;
    const nextMw = _middlewares[idx];
    const next = err => _run(idx+1, err);
    if (err) {
      const isNextErrorMw = nextMw.length === 4;
      return isNextErrorMw ? nextMw(err, _req, _res, next)
      : _run(idx+1, err);
    }
    if (nextMw._path) {
      const pathMatched = _req.url === nextMw._path;
      return pathMatched ? nextMw(_req, res, _next) : _run(idx + 1);
    }
    nextMw(_req, _res, next);
  }

  const run = (req, res) => {
    _req = req;
    _res = res;
    _run(0);
  }

  return {
    _middlewares,
    add
  }
}

module.exports = Middleware;