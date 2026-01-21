const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Importar las rutas (Capa de Rutas)
const authRoutes = require('./routes/authRoutes');

const app = express();

// 1. SEGURIDAD: Configura cabeceras HTTP seguras
app.use(helmet());

// 2. RENDIMIENTO: Comprime las respuestas del servidor
app.use(compression());

// 3. LOGGING: Registra las peticiones en la consola para desarrollo
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

// 4. CORS: Permite peticiones desde el frontend
app.use(cors());

// 5. PARSEO: Permite al servidor entender JSON (vital para el formulario)
app.use(express.json({ limit: '10kb' }));

// 6. ARCHIVOS ESTÁTICOS: Sirve el frontend desde la nueva carpeta
// Nota: 'path.join' asegura que funcione tanto en Linux (WSL) como en otros sistemas
app.use(express.static(path.join(__dirname, '../../public')));

// 7. CONEXIÓN DE RUTAS: Definimos el prefijo para la autenticación
app.use('/api/v1/auth', authRoutes);

// Ruta de estado para verificar que el zorro 🦊 está vivo
app.get('/api/v1/estado', (req, res) => {
    res.status(200).json({
        status: 'success',
        mensaje: '🦊 El motor de Deporty está listo para registrar usuarios.',
        timestamp: new Date().toISOString()
    });
});

// 8. ARRANQUE DEL MOTOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 DEPORTY BACKEND: ¡MOTOR INICIADO!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📂 Sirviendo frontend desde: /frontend`);
});