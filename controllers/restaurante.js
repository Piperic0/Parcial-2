const express = require('express');
const router = express.Router();
const client = require('../DB');

// GET
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM restaurante');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener restaurantes', error: error.message });
  }
});

// POST
router.post('/', async (req, res) => {
  const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    await client.query(
      'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)',
      [id_rest, nombre, ciudad, direccion, fecha_apertura]
    );
    res.status(201).json({ message: 'Restaurante creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear restaurante', error: error.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await client.query(
      'UPDATE restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5',
      [nombre, ciudad, direccion, fecha_apertura, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.json({ message: 'Restaurante actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar restaurante', error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM restaurante WHERE id_rest = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.json({ message: 'Restaurante eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar restaurante', error: error.message });
  }
});

module.exports = router;
