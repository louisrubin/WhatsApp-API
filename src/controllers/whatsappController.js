require('dotenv').config();     // invoco 'dotenv' instalado en el proyecto para usar .env 
const whatsappService = require("../services/whatsappService")

const verifyToken = (req, res) => {
    // GET
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

const receivedMessage = (req, res) => {
    // POST
    try {
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"];

        if (messageObject != "undefined") {         // whatsapp devuelve varios eventos no solo un mensaje
            let userText = getTextUser(messageObject);
            let userNumber = messageObject[0]["from"];      // numero del usuario

            console.log(userText);

            whatsappService.sendMessageWhatsapp(userText, userNumber);    // funcion enviar mensaje
        }
        

        res.send("EVENT_RECEIVED");

    } catch (error) {        
        res.send("EVENT_RECEIVED");
    }
}

function getTextUser(messages) {
    // DEVUELVE SOLO EL MENSAJE ENVIADO POR EL USUARIO 
    let text = ""
    let typeMessage = messages[0]["type"]

    if (typeMessage == "text") {                // TEXT
        text = messages[0]["text"]["body"]
    }
    else if (typeMessage == "interactive") {                // INTERACTIVE
        let interactiveObject = messages[0]["interactive"]
        let typeInteractive = interactiveObject["type"]     // tipo: button, list

        if (typeInteractive == "button_reply") {            // INTERACTIVE BUTTON
            text = interactiveObject["button_reply"]["title"]

        } else if (typeInteractive == "list_reply") {           // INTERACTIVE LIST
            text = interactiveObject["list_reply"]["title"]
            
        } else {
            console.log("Sin mensaje 1");
        }
    }
    else {
        console.log("Sin mensaje 2");
    }

    return text;
}

/*  OBJECT FROM WHATSAPP
    
    "messages": [
        {
        "from": "51123456789",
        "id": "wamid.HBgLNTE5NDM2NjI5NjQVAgASGBQzQUNCODUzN0U1QkU5MkZENTFBQwA=",
        "Timestamp": "1660362642",
        "type": "text",
        "text": {
            "body": "hola ..."
        },
        "interactive": null,
        "image": null,
        "audio": null,
        "video": null,
        "document": null,
        "sticker": null,
        "location": null,
        "contacts": null,
        "system": null
        }
    ],

*/ 


module.exports = {
    verifyToken, receivedMessage, 
}