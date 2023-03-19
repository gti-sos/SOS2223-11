
var express = require("express");

var app = express();

var port = process.env.PORT || 12345;

var bodyParser = require("body-parser");

app.use("/", express.static("./public"));

app.use(bodyParser.json());

// Rutas para carpetas diferentes

var backend_igr = require("./backend/index_igr");

var backend_cac = require("./backend/index_cac");

var backend_vrj = require("./backend/index-vrj");

backend_igr(app);

backend_cac(app);

backend_vrj(app);

// Escuchar puertos abiertos

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});

