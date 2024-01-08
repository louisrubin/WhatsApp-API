const express = require("express");
const apiRoute = require("./src/routes/routes");    // importamos el modulo "routes"

const app = express();

const PORT = process.env.PORT || 3000;  // constante del puerto por defecto 3000

app.use(express.json());    // express tiene que utilizar 'express.json()' para recibir los datos que estamos enviando en formato JSON

app.use("/whatsapp", apiRoute);     // ruta en donde se ejecutarán las routes
app.use("/", apiRoute);    // arriba ruta especifica y aca ruta raiz

app.listen(PORT, () => {
    console.log("LISTENING PORT: "+ PORT);
})