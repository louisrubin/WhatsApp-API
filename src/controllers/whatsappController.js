
const veryToken = (req, res) => {
    res.send("hola veryToken");
}

const receivedMessage = (req, res) => {
    res.send("hola receivedMessage");
}


module.exports = {
    veryToken, receivedMessage, 
}