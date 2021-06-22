const express = require('express');
const usuariosRoutes = require('./routes/usuarios_routes');

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use('/usuarios', usuariosRoutes);

app.listen(8000, () => {
  console.log('Servidor iniciado correctamente');
});
