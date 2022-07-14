const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Conectar DB
connectDB();

app.get('/', (req, res) => res.json({ msg: 'connected' }));

//Middleware
// app.use(express.json({ extended: false }));

//Rutas
// app.use('/api/user', require('./routes/user'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/order', require('./routes/contact'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
