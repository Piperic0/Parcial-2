const express = require('express');
const router = express.Router();
const client = require('../DB');

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pedido');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { id_pedido, fecha, id_rest, total } = req.body;
  try {
    await client.query(
      'INSERT INTO pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)',
      [id_pedido, fecha, id_rest, total]
    );
    res.status(201).json({ message: 'Pedido creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await client.query(
      'UPDATE pedido SET fecha=$1, id_rest=$2, total=$3 WHERE id_pedido=$4',
      [fecha, id_rest, total, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ message: 'Pedido actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pedido', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM pedido WHERE id_pedido = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pedido', error: error.message });
  }
});

module.exports = router;
