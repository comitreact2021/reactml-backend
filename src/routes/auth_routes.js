const express = require('express');
const router = express.Router();
const conexion = require('../connection');

//Iniciar sesion
router.post('/', (req, res) => {
  console.log(req.session.user);

  const sql = `SELECT *
               FROM usuarios
               WHERE email = ?
                 AND password = ?`;

  conexion.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.log('Error al verificar el usuario');
    } else {
      if (result.length === 1) {
        console.log(result);

        req.session.user = { name: result[0].nombre };

        console.log(req.session.user);

        res.json({ message: 'Usuario valido!' });
      } else {
        res.json({ message: 'Email y/o contraseña incorrecta' });
      }
    }
  });
});

//Cerrar sesion
router.delete('/', (req, res) => {
  res.send({ message: 'Cerrar sesion' });
});

module.exports = router;
