const { userConnected, userDisconnect } = require("../controllers/sockets");
const { proveJWT } = require("../helpers/jwt");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async(socket) => {

            const[ valido, uid ] = proveJWT(socket.handshake.query['x-token']);
            console.log("cliente conectado");


            if(!valido){
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConnected( uid );
            // const userOnline = await userConnected( uid );

            // console.log('se conecto', userOnline.name);

        
            //TODO: Validar el JWT
            //Si el token no es valido, desconectar

            //TODO: Saber que usuario esta activo mediante UID

            //TODO: Emitir todos los usuario conectados

            //TODO: Socket join, uid


            //TODO: Escuchar cuando el cliente manda un mensaje
            // Mensaje-personal


            //TODO: Disconnect
            //Marcar en la BD que el usuario se desconecto
            //TODO: Emitir todos los usuarios conectados

            socket.on('disconnect', async() => {
                console.log("cliente desconectado", uid);
                await userDisconnect( uid );
            })


        });
    }


}


module.exports = Sockets;