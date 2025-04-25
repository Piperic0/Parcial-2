const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/prueba', (req, res) => {
  res.json({ message: 'API FUNCIONANDO CORRECTAMENTE', port: PORT });
});

// Rutas principales (controllers)
app.use('/api/restaurantes', require('./controllers/restaurante'));
app.use('/api/empleados', require('./controllers/empleado'));
app.use('/api/productos', require('./controllers/producto'));
app.use('/api/pedidos', require('./controllers/pedido'));
app.use('/api/detallepedidos', require('./controllers/detallepedido'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
