const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('Error al obtener los usuarios');
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const idUsuario = req.params.id;

  const sql = 'SELECT * FROM usuarios WHERE id = ?';

  connection.query(sql, [idUsuario], (err, result) => {
    if (err) {
      res.send('Error al obtener los usuarios');
    } else {
      res.json(result);
    }
  });
});

router.post('/', (req, res) => {
  const sql = `INSERT INTO usuarios(nombre, apellido, email, password)
               VALUES(?, ?, ?, ?)`;

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const password = req.body.password;

  connection.query(sql, [nombre, apellido, email, password], (err, result) => {
    if (err) {
      res.send('Error al insertar el usuario');
    } else {
      res.send('Usuario agregado');
    }
  });
});

router.put('/:id', (req, res) => {
  const sql = `UPDATE usuarios 
               SET nombre=?, apellido=?, email=?, password = ?
               WHERE id=?`;

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const password = req.body.password;
  const id = req.params.id;

  connection.query(
    sql,
    [nombre, apellido, email, password, id],
    (err, result) => {
      if (err) {
        res.send('Error al insertar el usuario');
      } else {
        res.send('Usuario modificado');
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const sql = `DELETE
               FROM usuarios 
               WHERE id=?`;

  const id = req.params.id;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send('Error al eliminar el usuario');
    } else {
      res.send('Usuario eliminado');
    }
  });
});

module.exports = router;
