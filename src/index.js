const express = require('express');
const cors = require('cors');
const session = require('express-session');

const usuariosRoutes = require('./routes/usuarios_routes');
const publicacionesRoutes = require('./routes/publicaciones_routes');
const authRoutes = require('./routes/auth_routes');
const categoriasRoutes = require('./routes/categorias_routes');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(
  session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static('public'));

app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/auth', authRoutes);
app.use('/categorias', categoriasRoutes);

app.listen(8000, () => {
  console.log('Servidor iniciado correctamente');
});
