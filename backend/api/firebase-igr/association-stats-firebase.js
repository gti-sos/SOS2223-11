import db from '../firebase/firebase.js';
import serviceAccount from '../firebase/creds.json' assert {type: 'json'};
/*
const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});
*/
//var port = process.env.PORT || 12345;

/*
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sos2223-11-bbc8a-default-rtdb.europe-west1.firebasedatabase.app'
});
*/

function backend_firebase_igr(app) {

   // var db = admin.database();
    const apiUrl = "/api/firebase/association-stats";

    let associationData = [
        {
            name: `PADRES Y MADRES DE ALUMNOS EL CASTELLON DEL C.P. RURAL FILABRES`,
            goal: `ASISTIR A LOS PADRES O TUTORES EN TODO AQUELLO QUE CONCIERNE A LA EDUCACION DE SUS HIJOS O REPRESENTADOS.`,
            registration_date: 2000,
            creation_date: 1999,
            zip_code: 4857,
            province: `ALMERIA`,
            township_code: 46
        },
        {
            name: `CULTURAL ARTISTICA DUENDE Y COMPAS`,
            goal: `ESTUDIO, REALIZACIÓN Y DIVULGACIÓN DEL FLAMENCO EN SUS VERSIONES DE CANTE, GUITARRA, BAILE Y PERCUSIÓN.`,
            registration_date: 2001,
            creation_date: 2000,
            zip_code: 4002,
            province: `ALMERIA`,
            township_code: 139
        },
        {
            name: `JUVENIL TEATROAK`,
            goal: `DIFUSION CULTURAL. - - - - - -`,
            registration_date: 2002,
            creation_date: 2002,
            zip_code: 4003,
            province: `ALMERIA`,
            township_code: 139
        },
        {
            name: `SOCIEDAD CASINO PRINCIPAL`,
            goal: `LA PROMOCIÓN Y DIFUSIÓN DE LA CULTURA, PRESTANDO ESPECIAL ATENCIÓN A LA HISTORIA, GASTRONOMÍA, FOLCLORE Y ARTESANÍA DE NUESTRO ÁMBITO DE ACTUACIÓN.`,
            registration_date: 1966,
            creation_date: 1966,
            zip_code: 4600,
            province: `ALMERIA`,
            township_code: 530
        },
        {
            name: `PADRES DE ALUMNOS SIERRA DE GADOR DEL I.E.S. SANTO DOMINGO`,
            goal: `Asistir a los padres o tutores en todo aquello que concierne a la educación de sus hijos.`,
            registration_date: 1971,
            creation_date: 1970,
            zip_code: 4700,
            province: `ALMERIA`,
            township_code: 9026
        },
        {
            name: `ALUMNAS Y ALUMNOS DE EDUCACIÓN PERMANENTE BOLLULLOS DEL C.E.P. LA PIÑA`,
            goal: `Colaborar con la comunidad educativa del Centro de Educación Permanete en la educación y en la formación para lograr una formación integral y una educación para la igualdad.La defensa de los derechos del alumnado, en el sentido de que reciban de una forma - eficiente la debida enseñanza del centro de educación permanente "`,
            registration_date: 2007,
            creation_date: 2007,
            zip_code: 21710,
            province: `HUELVA`,
            township_code: 139
        },
        {
            name: `PEÑA CULTURAL FLAMENCA DE ARJONA`,
            goal: `Estudio, conservación promoción y divulgación del Arte Flamenco en cualquiera de sus formas de expresión, cante, toque y baile, procurando su introducción en los Centros escolares, como elemento cultural y actividad propia del pueblo andaluz.`,
            registration_date: 1985,
            creation_date: 1985,
            zip_code: 23760,
            province: `JAEN`,
            township_code: 63
        },
        {
            name: `JOVEN ORQUESTA PROVINCIAL DE MÁLAGA`,
            goal: `Fomentar la afición a la música en la sociedad, difundiendo desde la Orquestal a la de Cámara en la Provncia de Málaga en particular, y en toda Andalucía, en general, con especial atención a los niños y jóvenes.`,
            registration_date: 1994,
            creation_date: 1994,
            zip_code: 29006,
            province: `MALAGA`,
            township_code: 672
        },
        {
            name: `CASA DE LA PAZ`,
            goal: `CREAR EN SEVILLA UN ESPACIO "CASA DE LA PAZ"QUE SERÁ SEDE DE LOS TRES GRUPOS PROMOTORES,SIEMPRE QUE ESTOS PERTENEZCAN A LA FEDERACION,DONDE REALIZAR LAS ACTIVIDADES PROPIAS DE ESTOS GRUPOS Y LOS DE LA FEDERACION.`,
            registration_date: 1979,
            creation_date: 1979,
            zip_code: 41003,
            province: `SEVILLA`,
            township_code: 917
        },
        {
            name: `EMPRESARIAL DE ARTESANOS CASTALLA`,
            goal: `REPRESENTAR A SUS ASOCIADOS EN LA DEFENSA DE SUS INTERESES LABORALES, PROFESIONALES Y ECONOMICOS.`,
            registration_date: 2000,
            creation_date: 2000,
            zip_code: 41950,
            province: `SEVILLA`,
            township_code: 299
        }
    ];


    app.get(apiUrl + "/loadInitialData", (req, res) => {
        console.log("Carga de datos");
        const assocRef = db.ref("association-stats");
        assocRef.once("value", (snapshot) => {
            if (snapshot.val()) {
                console.log("ya hay datos en la base de datos");
            } else {
                console.log("Va a cargar los datos");
                associationData.forEach((phone) => {
                    //var assocRef = db.ref(`association-stats/${phone.province}/${phone.year}`)
                    var assocRef = db.ref(`association-stats`)
                    assocRef.push(phone);
                });
    
            }
            res.sendStatus(200);
        });
    
    });


    app.post(apiUrl, (req, res) => {

        console.log(req.body);
        const nameReq = req.body.name;
        const goalReq = req.body.goal;
        const regReq = req.body.registration_date;
        const creReq = req.body.creation_date;
        const zipReq = req.body.zip_code;
        const proReq = req.body.province;
        const townCodeReq = req.body.township_code;
        const isRequestBodyValid = (nameReq !== undefined) && (goalReq !== undefined) && (regReq !== undefined) && (creReq !== undefined) && (zipReq !== undefined) && (proReq !== undefined) && (townCodeReq !== undefined);
        console.log(!(Object.values(req.body).length === 7));
        console.log(!isRequestBodyValid);
        console.log("New POST request to /association-stats");
        const assocRef = db.ref(`association-stats`);
        if ((isRequestBodyValid) && (Object.values(req.body).length === 7)) {
            assocRef.once("value", (snapshot) => {
                const data = snapshot.val();
                const valores = Object.values(data).filter((assoc) => assoc.registration_date === nameReq && assoc.province === proReq);
                if (valores.length != 0) {
                    res.sendStatus(409);
                    console.log("Recurso ya existente");
                } else {
                    assocRef.push(req.body);
                    res.sendStatus(201);
                }
    
            });
        } else {
            console.log("Error 400 los campos no son los esperados o no hay 7 campos con sus respectivos nombre");
            res.sendStatus(400);
        }
    });

    app.post(apiUrl + "/:province/:registration_date", (req, res) => {
        console.log("Metodo no permitido");
        res.sendStatus(405);
    });


    app.get(apiUrl + '/:province/:year', (req, res) => {

        const assocRef = db.ref("association-stats");
        const filtro = assocRef.orderByChild(`province`).equalTo(req.params.province);
        filtro.once("value", (snapshot) => {
            const data = snapshot.val();
            const result = Object.values(data).filter((assoc) => assoc.registration_date === req.params.registration_date)[0];
            res.json(result);
        });
    });

    app.get(apiUrl, (req, res) => {
        console.log("Get a todo");
        //const queryParams = req.query;
        const assocRef = db.ref('association-stats');
        assocRef.once("value", (snapshot) => {
            const datos = snapshot.val();
            let valores = Object.values(datos);
    
            // if (req.query.province) valores = valores.filter((phone) => phone.province === req.query.province);
            // if (req.query.year) valores = valores.filter((phone) => phone.year === parseInt(req.query.year));
            // if (req.query.landline_over) valores = valores.filter((phone) => phone.landline >= parseInt(req.query.landline_over));
            // if (req.query.post_payment_phone_line_over) valores = valores.filter((phone) => phone.post_payment_phone_line >= parseInt(req.query.post_payment_phone_line_over));
            // if (req.query.wide_landline_over) valores = valores.filter((phone) => phone.wide_landline >= parseInt(req.query.wide_landline_over));
            res.json(valores);
        });
    });

    app.put(apiUrl, (req, res) => {
        console.log("Metodo no permitido solo se actualiza un recurso");
        res.sendStatus(405);
    });


    app.delete(apiUrl + "/:province/:year", (req, res) => {
        console.log("Borrar un recurso");
        const provinceParam = req.params.province;
        const regParam = parseInt(req.params.regDate);
        const assocRef = db.ref(`association-stats`);
        assocRef.once("value", (snapshot) => {
            const datos = snapshot.val();
    
            const obtenerId = Object.keys(datos).find(
                (key) => datos[key].province === provinceParam && datos[key].registration_date === regParam);
            if (obtenerId) {
                assocRef.child(obtenerId).remove();
                res.sendStatus(200);
            } else {
                console.log("No existe el recurso");
                res.sendStatus(404);
            }
        });
    
    
    });

    app.delete(apiUrl, (req, res) => {
        console.log("Borrar todo");
        const assocRef = db.ref(`association-stats`);
        assocRef.remove();
        res.sendStatus(200);
    });


    app.put(apiUrl + "/:province/:year", (req, res) => {
        const provinceParam = req.params.province;
        const regParam = parseInt(req.params.regDate);
        const nameReq = req.body.name;
        const goalReq = req.body.goal;
        const regReq = req.body.registration_date;
        const creReq = req.body.creation_date;
        const zipReq = req.body.zip_code;
        const proReq = req.body.province;
        const townCodeReq = req.body.township_code;
        const isRequestBodyValid = (nameReq !== undefined) && (goalReq !== undefined) && (regReq !== undefined) && (creReq !== undefined) && (zipReq !== undefined) && (proReq !== undefined) && (townCodeReq !== undefined) && (Object.values(req.body).length === 7);
        const areParamsMatching = provinceParam === proReq && parseInt(regParam) === regReq;
        console.log(`New PUT request to /association-stats/${provinceParam}/${regParam}`);
        if (isRequestBodyValid && areParamsMatching) {
            const assocRef = db.ref(`association-stats`);
            assocRef.once("value", (snapshot) => {
                const datos = snapshot.val();
                const obtenerId = Object.keys(datos).find(
                    (key) => datos[key].province === provinceParam && datos[key].registration_date === regParam);
                if (obtenerId) {
                    assocRef.child(obtenerId).update({
    
                        name: nameReq,
                        goal: goalReq,
                        registration_date: regParam,
                        creation_date: creReq,
                        zip_code: zipReq,
                        province: proReq,
                        township_code: townCodeReq
                    });
                    res.sendStatus(200);
                } else {
                    console.log("No existe el recurso");
                    res.sendStatus(404);
                }
            });
        } else {
            console.log("Cuerpo de la peticion no es valido o los parametros de la URL no coinciden con la peticion")
            res.sendStatus(400);
        }
    
    });
}
export { backend_firebase_igr };