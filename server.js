const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Conectar DB
connectDB();

//Cors middleware config
const config = {
    application: {
        cors: {
            server: [{
                origin: "*",
                credentials: true
            }]
        }
    }
}
app.use(cors(
    config.application.cors.server
));

app.get('/', (req, res) => res.json({ msg: 'connected' }));

//Middleware
app.use(express.json({ extended: false }));

//Rutas
app.use('/api/prereg', require('./routes/prereg'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
