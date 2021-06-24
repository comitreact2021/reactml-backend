const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.session.user);

  if (req.session.user) {
    const sql = 'SELECT * FROM publicaciones';

    connection.query(sql, (err, result) => {
      if (err) {
        res.send('Error al obtener las publicaciones');
      } else {
        res.json(result);
      }
    });
  }
});

module.exports = router;
