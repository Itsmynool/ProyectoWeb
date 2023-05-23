// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = router.db
    .get('users')
    .find({ email, password })
    .value();

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Credenciales inválidas' });
  }
});

server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
  