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
    const apiUrl = "/api/firebase/phone-line-stats";


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
    
        console.log("New POST request to /association-stats");
        const assocRef = db.ref(`association-stats`);
        if (!(isRequestBodyValid) || !(Object.values(req.body).length === 7)) {
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