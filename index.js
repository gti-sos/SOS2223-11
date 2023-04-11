// Importaciones

import express from "express";

import cors from "cors";

var app = express();

var port = process.env.PORT || 12345;

app.use(express.json());

app.use(cors());

// Rutas para carpetas diferentes

// --- Versión 1 ---

import {backend_igr} from "./backend/api/v1/index_igr.js";

import {backend_cac} from "./backend/api/v1/index_cac.js";

import {backend_vrj} from "./backend/api/v1/index_vrj.js";

// --- Versión 2 ---

import {backend_igrv2} from "./backend/api/v2/index_igr.js";

import {backend_cacv2} from "./backend/api/v2/index_cac.js";

import {backend_vrjv2} from "./backend/api/v2/index_vrj.js";

import { handler } from "./frontend/build/handler.js";

// --- Versión 1 ---

backend_igr(app);

backend_cac(app);

backend_vrj(app);

// --- Versión 2 ---

backend_igrv2(app);

backend_cacv2(app);

backend_vrjv2(app);

app.use(handler);

// Escuchar puertos abiertos

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});

