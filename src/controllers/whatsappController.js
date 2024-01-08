const fs = require("fs");
const myConsoleLog = new console.Console(fs.createWriteStream("./logs.txt"));
require('dotenv').config();     // invoco 'dotenv' instalado en el proyecto para usar .env 

const verifyToken = async (req, res) => {
    
    try {
        let accessToken = process.env.ACCESS_TOKEN_WHATSAPP;    // token hecho manualmente
        let tokenWhatsapp = req.query["hub.verify_token"];  // token que nos devuelve API Whatsapp
        let challenge = req.query["hub.challenge"]      // API whatsapp nos devuelve un challenge

        if (challenge != null && tokenWhatsapp != null && tokenWhatsapp == accessToken) {
            res.send(challenge);        // le devolvemos el challenge si todo es correcto
        } else {
            res.status(400).send();
        }
    } catch (error) {        
        res.status(400).send();
    }
}

const receivedMessage = async (req, res) => {
    try {
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"][0];

        // myConsoleLog.log(messageObject);

        console.log(messageObject["text"]);

        res.send("EVENT_RECEIVED");

    } catch (error) {        
        //console.log(messageObject);
        res.send("EVENT_RECEIVED");
    }
}


module.exports = {
    verifyToken, receivedMessage, 
}