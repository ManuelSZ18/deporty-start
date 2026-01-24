// Controlador de Autenticación optimizado para Vercel
// Vercel ejecuta estas funciones bajo demanda sin estado persistente

/**
 * Registra un nuevo usuario en el sistema
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const registrarUsuario = async (req, res) => {
    try {
        console.log("🔐 Capa Controlador: Recibiendo datos...");
        
        // Validación básica
        const { email, password, nombre } = req.body;
        
        if (!email || !password || !nombre) {
            return res.status(400).json({
                status: 'error',
                message: '❌ Email, password y nombre son requeridos'
            });
        }
        
        // TODO: Conectar a base de datos
        // TODO: Hash de contraseña
        // TODO: Validar email único
        
        res.status(201).json({
            status: 'success',
            message: '✅ Usuario registrado exitosamente',
            data: {
                email,
                nombre
            }
        });
    } catch (error) {
        console.error('Error en registrarUsuario:', error);
        res.status(500).json({
            status: 'error',
            message: '❌ Error al registrar usuario'
        });
    }
};

/**
 * Login de usuario
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: '❌ Email y password son requeridos'
            });
        }
        
        // TODO: Verificar credenciales en BD
        // TODO: Generar JWT
        
        res.status(200).json({
            status: 'success',
            message: '✅ Login exitoso',
            token: 'jwt_token_aqui'
        });
    } catch (error) {
        console.error('Error en loginUsuario:', error);
        res.status(500).json({
            status: 'error',
            message: '❌ Error al iniciar sesión'
        });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};
