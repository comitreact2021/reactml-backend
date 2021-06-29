const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM categorias ORDER BY nombre';

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('Error al obtener las categorias');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
