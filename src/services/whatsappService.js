const https = require("https");
require('dotenv').config();

function sendMessageWhatsapp(textReponse, userNumber){
    const data = JSON.stringify(
        {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": userNumber,
        "type": "image",
        "image": {
            "link": "https://i.pinimg.com/originals/0a/bb/e5/0abbe546e479edc1eb62f5a8ccd66328.jpg"
        }
        })

    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/206896895838714/messages",
        method: "post",
        body: data,
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + procces.env.BEARER_TOKEN
        },
    }

    const req = https.request(options, res => {
        res.on("data", data => {
            process.stdout.write(data);
        });
    })

    req.on("error", error => {      // ERROR
        console.error(error);
    })

    req.write(data);
    req.end();          // close
}

module.exports = {
    sendMessageWhatsapp, 
}