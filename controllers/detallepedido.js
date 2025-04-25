const express = require('express');
const router = express.Router();
const client = require('../DB');

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM detallepedido');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles de pedido', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    await client.query(
      'INSERT INTO detallepedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5)',
      [id_detalle, id_pedido, id_prod, cantidad, subtotal]
    );
    res.status(201).json({ message: 'Detalle de pedido creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear detalle de pedido', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await client.query(
      'UPDATE detallepedido SET id_pedido=$1, id_prod=$2, cantidad=$3, subtotal=$4 WHERE id_detalle=$5',
      [id_pedido, id_prod, cantidad, subtotal, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json({ message: 'Detalle actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar detalle', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM detallepedido WHERE id_detalle = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json({ message: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar detalle', error: error.message });
  }
});

module.exports = router;
