const { response } = require('express');
const Message = require('../models/message');


const getChat = async( req, res = response ) => {

    const miId = req.uid;
    const msjsDe = req.params.de;

    const last30 = await Message.find({
        $or: [
            { of: miId, for: msjsDe},
            { of: msjsDe, for: miId}
        ]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    })


}

module.exports = {
    getChat
}