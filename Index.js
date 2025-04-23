const db = require('../DB');

function obtenerTodos(req, res) {
  db.query('SELECT * FROM restaurante', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener restaurantes');
    } else {
      res.json(result.rows);
    }
  });
}

function crear(req, res) {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;

  if (!nombre || !ciudad || !direccion || !fecha_apertura) {
    res.status(400).send('Faltan datos');
  } else {
    const sql = 'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4)';
    const params = [nombre, ciudad, direccion, fecha_apertura];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(500).send('Error al crear restaurante');
      } else {
        res.send('Restaurante creado');
      }
    });
  }
}

function actualizar(req, res) {
  const id = req.params.id;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;

  const sql = 'UPDATE restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5';
  const params = [nombre, ciudad, direccion, fecha_apertura, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar');
    } else {
      res.send('Restaurante actualizado');
    }
  });
}

function eliminar(req, res) {
  const id = req.params.id;

  db.query('DELETE FROM restaurante WHERE id_rest=$1', [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar');
    } else {
      res.send('Restaurante eliminado');
    }
  });
}

module.exports = {
  obtenerTodos,
  crear,
  actualizar,
  eliminar
};