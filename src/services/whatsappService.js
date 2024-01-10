const https = require("https");
require('dotenv').config();

function sendMessageWhatsapp(textReponse, userNumber){
    const bearerToken = "Bearer " + procces.env.BEARER_TOKEN;

    const data = JSON.stringify(
        {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": userNumber,
        "type": "text",
        "text": {
            "body": textReponse
        }
        })

    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/206896895838714/messages",
        method: "post",
        body: data,
        headers: {
            "Content-type": "application/json",
            Authorization: bearerToken
        },
    }

    const req = https.request(options, res => {
        res.on("data", dat => {
            process.stdout.write(dat);
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