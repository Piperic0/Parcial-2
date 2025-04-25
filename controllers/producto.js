const express = require('express');
const router = express.Router();
const client = require('../DB');

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { id_prod, nombre, precio } = req.body;
  try {
    await client.query(
      'INSERT INTO producto (id_prod, nombre, precio) VALUES ($1, $2, $3)',
      [id_prod, nombre, precio]
    );
    res.status(201).json({ message: 'Producto creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const result = await client.query(
      'UPDATE producto SET nombre=$1, precio=$2 WHERE id_prod=$3',
      [nombre, precio, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM producto WHERE id_prod = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

module.exports = router;
