const jwt = require('jsonwebtoken');


const validateJWT = ( req, res, next ) => {

    try {

        const token = req.header('x-token');
        if ( !token ){
            return res.status(401).json({
                ok: false,
                msg: 'No hay Token en la peticion'
            });
        }

        // const payload = jwt.verify( token, process.env.JWT_KEY );
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validateJWT
}      
