exports.registrarUsuario = async (req, res) => {
    console.log("Capa Controlador: Recibiendo datos...");
    res.status(201).json({
        status: 'success',
        message: '✅ Conexión exitosa con el controlador de Deporty'
    });
};