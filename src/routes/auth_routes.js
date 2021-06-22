const express = require('express');
const router = express.Router();

//Iniciar sesion
router.post('/', (req, res) => {
  console.log(req.body);

  res.json({ message: 'Iniciar sesion' });
});

//Cerrar sesion
router.delete('/', (req, res) => {
  res.send({ message: 'Cerrar sesion' });
});

module.exports = router;
