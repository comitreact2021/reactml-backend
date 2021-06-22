const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuarios_routes');
const publicacionesRoutes = require('./routes/publicaciones_routes');
const authRoutes = require('./routes/auth_routes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static('public'));

app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/auth', authRoutes);

app.listen(8000, () => {
  console.log('Servidor iniciado correctamente');
});
