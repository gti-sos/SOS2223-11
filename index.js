// Importaciones

// import path from 'path';

import express from "express";

import cors from "cors";

var app = express();

var port = process.env.PORT || 12345;

app.use(express.json());

app.use(cors());


// Rutas para carpetas diferentes

// --- Versión 1 ---

import {backend_igrv1} from "./backend/api/v1/index_igr.js";

import {backend_cacv1} from "./backend/api/v1/index_cac.js";

import {backend_vrjv1} from "./backend/api/v1/index_vrj.js";

// --- Versión 2 ---

import {backend_igr} from "./backend/api/v2/index_igr.js";

import {backend_cac} from "./backend/api/v2/index_cac.js";

import {backend_vrj} from "./backend/api/v2/index_vrj.js";

import { handler } from "./frontend/build/handler.js";

// --- Versión Firebase ---

 import {backend_firebase} from "./backend/api/firebase-vrj/phone-line-stats-firebase.js";

 import {backend_firebase_igr} from "./backend/api/firebase-igr/association-stats-firebase.js";

 import {backend_firebase_cac} from "./backend/api/firebase-cac/projection-homes-stats-firebase.js";

// --- Versión 1 ---

backend_igrv1(app);

backend_cacv1(app);

backend_vrjv1(app);

// --- Versión 2 ---

backend_igr(app);

backend_cac(app);

backend_vrj(app);

// --- Versión Firebase

 backend_firebase(app);

 backend_firebase_igr(app);

 backend_firebase_cac(app);

app.use(handler);

// Escucha de puerto

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});
