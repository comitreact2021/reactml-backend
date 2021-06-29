const express = require('express');
const router = express.Router();
const conexion = require('../connection');

router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json({ message: 'ok', data: req.session.user });
  } else {
    res.json({ message: 'error' });
  }
});

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

        const nombreCompleto = `${result[0].nombre} ${result[0].apellido}`;

        req.session.user = {
          name: nombreCompleto,
          id: result[0].id,
        };

        console.log(req.session.user);

        res
          .status(200)
          .json({ message: 'Usuario valido', data: nombreCompleto });
      } else {
        res.status(401).json({ message: 'Email y/o contraseña incorrecta' });
      }
    }
  });
});

//Cerrar sesion
router.delete('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Error al cerrar la sesion' });
    } else {
      res.json({ message: 'Sesion cerrada' });
    }
  });
});

module.exports = router;
