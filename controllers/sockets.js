const User = require('../models/user');


const userConnected = async( uid ) => {

    const user = await User.findById( uid );
    user.online = true;
    await user.save();

    return user;
}

const userDisconnect = async( uid ) => {

    const userDisc = await User.findById( uid );
    userDisc.online = false;
    await userDisc.save();

    return userDisc;

}

module.exports = {
    userConnected,
    userDisconnect
}