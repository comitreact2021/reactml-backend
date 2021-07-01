const express = require('express');
const connection = require('../connection');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM publicaciones';

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('Error al obtener las publicaciones');
    } else {
      res.json(result);
    }
  });
});

router.get('/userpubs', (req, res) => {
  console.log(req.session.user.id);

  const sql = `SELECT * 
               FROM publicaciones
               WHERE usr_id = ?`;

  connection.query(sql, [req.session.user.id], (err, result) => {
    if (err) {
      res.send('Error al obtener las publicaciones del usuario');
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM publicaciones WHERE id=?';

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send('Error al obtener la publicacion');
    } else {
      res.json(result[0]);
    }
  });
});

router.post('/', (req, res) => {
  let imageFileName = '';

  if (req.files) {
    const pubImage = req.files.pubImage;

    imageFileName = Date.now() + path.extname(pubImage.name);

    console.log(imageFileName);

    pubImage.mv(`./public/images/${imageFileName}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    console.log('No hay archivo');
  }

  const sql = `INSERT INTO publicaciones(titulo, precio, imagen, usr_id, cat_id)
             VALUES(?, ?, ?, ?, ?)`;

  const values = [
    req.body.pubTitulo,
    req.body.pubPrice,
    imageFileName,
    req.session.user.id,
    req.body.pubCategory,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 'error',
        message: 'Error al realizar la publicación',
      });
    } else {
      res.json({
        status: 'ok',
        message: 'Publicación realizada correctamente',
      });
    }
  });
});

router.put('/:id', (req, res) => {
  let sqlUpdate = `UPDATE publicaciones
                   SET titulo = ?,
                       precio = ?,
                       cat_id = ?`;

  let values = [req.body.pubTitulo, req.body.pubPrice, req.body.pubCategory];

  if (req.files) {
    //Averiguo cual es el nombre del archivo de la imagen actual
    const sqlCurrentImage = `SELECT imagen
                             FROM publicaciones
                             WHERE id = ?`;
    connection.query(sqlCurrentImage, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
      } else {
        //Borrar el archivo de la imagen actual

        const fileToDelete = `./public/images/${result[0].imagen}`;
        fs.unlink(fileToDelete, (err) => {
          if (err) {
            console.log('Error al borrar el archivo');
          } else {
            console.log('Archivo borrado');
          }
        });
      }
    });

    const pubImage = req.files.pubImage;

    imageFileName = Date.now() + path.extname(pubImage.name);

    console.log(imageFileName);

    pubImage.mv(`./public/images/${imageFileName}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

module.exports = router;
