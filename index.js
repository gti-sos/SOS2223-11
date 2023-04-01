
import express from "express";

import cors from "cors";

var app = express();

var port = process.env.PORT || 12345;

app.use(express.json());

app.use(cors());

// Rutas para carpetas diferentes

import {backend_igr} from "./backend/index_igr.js";

import {backend_cac} from "./backend/index_cac.js";

import {backend_vrj} from "./backend/index_vrj.js";

import { handler } from "./frontend/build/handler.js";

backend_igr(app);

backend_cac(app);

backend_vrj(app);

app.use(handler);

// Escuchar puertos abiertos

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});

