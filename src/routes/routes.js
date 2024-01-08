const express = require("express");
const router = express.Router();
const whatsAppController = require("../controllers/whatsappController");    // instanciamos el paquete "controller.js"

// endpoints
router
.get("/", whatsAppController.verifyToken)
.post("/", whatsAppController.receivedMessage)

module.exports = router;    // exportamos las rutas