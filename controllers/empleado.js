const express = require('express');
const router = express.Router();
const client = require('../DB');

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM empleado');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { id_empleado, nombre, rol, id_rest } = req.body;
  try {
    await client.query(
      'INSERT INTO empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)',
      [id_empleado, nombre, rol, id_rest]
    );
    res.status(201).json({ message: 'Empleado creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empleado', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await client.query(
      'UPDATE empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4',
      [nombre, rol, id_rest, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ message: 'Empleado actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar empleado', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ message: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar empleado', error: error.message });
  }
});

module.exports = router;
