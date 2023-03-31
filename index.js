
import express from "express";

var app = express();

var port = process.env.PORT || 12345;

app.use(express.json());

// Rutas para carpetas diferentes

import {backend_igr} from "./backend/index_igr.js";

import {backend_cac} from "./backend/index_cac.js";

import {backend_vrj} from "./backend/index_vrj.js";

import { handler } from "./frontend/build/handler.js";

app.use(handler);

backend_igr(app);

backend_cac(app);

backend_vrj(app);

// Escuchar puertos abiertos

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});

