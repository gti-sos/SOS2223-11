// Importaciones

import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './creds.json' assert {type: 'json'};

// Usos

const app = express();

app.use(cors());

app.use(express.json());

// Iniciar app

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sos222311-cac-default-rtdb.europe-west1.firebasedatabase.app'
});

var port = process.env.PORT || 12345;

const db = admin.database();

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});

// ------------------------------Array datos con los tipos de familiares-------------------------------

var projectionHomes = [

    { province: "Almería", year: 2002, couple_children: 894148, couple_nochildren: 341796, single_parent: 150083 },
    { province: "Almería", year: 2003, couple_children: 886009, couple_nochildren: 409021, single_parent: 150465 },
    { province: "Almería", year: 2004, couple_children: 931404, couple_nochildren: 470139, single_parent: 164749 },
    { province: "Almería", year: 2005, couple_children: 859291, couple_nochildren: 452127, single_parent: 161659 },
    { province: "Almería", year: 2006, couple_children: 909246, couple_nochildren: 456352, single_parent: 201520 },
    { province: "Almería", year: 2007, couple_children: 948195, couple_nochildren: 515896, single_parent: 195633 },
    { province: "Almería", year: 2008, couple_children: 1068369, couple_nochildren: 575006, single_parent: 171857 },
    { province: "Almería", year: 2009, couple_children: 1041268, couple_nochildren: 558298, single_parent: 208899 },
    { province: "Almería", year: 2010, couple_children: 987317, couple_nochildren: 585697, single_parent: 221869 },

    { province: "Huelva", year: 2011, couple_children: 851060, couple_nochildren: 452784, single_parent: 161686 },
    { province: "Huelva", year: 2012, couple_children: 857901, couple_nochildren: 403155, single_parent: 214345 },
    { province: "Huelva", year: 2013, couple_children: 814218, couple_nochildren: 417317, single_parent: 253532 },
    { province: "Huelva", year: 2014, couple_children: 748925, couple_nochildren: 466565, single_parent: 233697 },
    { province: "Huelva", year: 2015, couple_children: 810278, couple_nochildren: 409156, single_parent: 221309 },
    { province: "Huelva", year: 2016, couple_children: 829139, couple_nochildren: 359835, single_parent: 243771 },
    { province: "Huelva", year: 2017, couple_children: 887184, couple_nochildren: 344886, single_parent: 220562 },
    { province: "Huelva", year: 2018, couple_children: 873261, couple_nochildren: 385670, single_parent: 204814 },
    { province: "Huelva", year: 2019, couple_children: 863731, couple_nochildren: 399176, single_parent: 209060 },
    { province: "Huelva", year: 2020, couple_children: 861369, couple_nochildren: 406862, single_parent: 211070 },
    { province: "Huelva", year: 2021, couple_children: 860099, couple_nochildren: 414464, single_parent: 212114 }

];

// Enlace a la api

const apiUrl = "/api/firebase/projection-homes-stats";

// Carga de datos

app.get(apiUrl + "/loadInitialData", (req, res) => {

    const projectionRef = db.ref("projection-homes-stats");

    projectionRef.once("value", (snapshot)=> {

        if (snapshot.val()){

            console.log("Ya hay datos en la base de datos");

        }
        
        else {

            console.log("Cargará los datos");

            projectionHomes.forEach((projection) =>{
                var projectionRef = db.ref(`projection-homes-stats`)
                projectionRef.push(projection);
            });

        }
        res.sendStatus(200);
    });

});

// Crear nuevo dato

app.post(apiUrl, (req, res) => {

    const newprovince = req.body.province;
    const newyear = parseInt(req.body.year);
    const newcouple_children = parseInt(req.body.couple_children);
    const newcouple_nochildren = parseInt(req.body.couple_nochildren);
    const newsingle_parent = parseInt(req.body.single_parent);

    const validRequest = newprovince && newyear && newcouple_children && newcouple_nochildren
                         && newsingle_parent && Object.values(req.body).length === 5;

    const newProjection = req.body;

    console.log("New POST request to /projection-homes-stats");

    const projectionRef = db.ref(`projection-homes-stats`);

    if(validRequest) {

    projectionRef.once("value", (snapshot) =>{

        const data = snapshot.val();

        if(data) {

        const valores = Object.values(data).filter((projection)=> projection.year === newyear && 
                        projection.province === newprovince);

        if (valores.length!=0) {

            res.sendStatus(409);

            console.log("Recurso ya existente");

        }
        
        else {

            projectionRef.push(req.body);

            res.sendStatus(201);

        }

    }
    
    else{
            console.log("Enviando el primer dato de la base de datos");

            projectionRef.push(req.body);

            res.sendStatus(201);

    }});

    }
    
    else {

        console.log("Error 400: Los campos no son los esperados o no hay 5 campos con sus respectivos nombres");

        res.sendStatus(400);
    }
});

// Crear un nuevo dato con provincia y año: no se puede

app.post(apiUrl+ "/:province/:year", (req, res) => {

    console.log("Metodo no permitido");

    res.sendStatus(405);

    });

// Obtener dato de la provincia y año

app.get(apiUrl+'/:province/:year', (req, res) => {

  const projectionRef = db.ref("projection-homes-stats");

  const filtro = projectionRef.orderByChild(`province`).equalTo(req.params.province);

    filtro.once("value", (snapshot)=>{

        const data = snapshot.val();

        const result = Object.values(data).filter((projection)=> projection.year === parseInt(req.params.year))[0];
        res.json(result);
    });
});

app.get(apiUrl, (req, res) => {

    const projectionRef = db.ref('projection-homes-stats');

    projectionRef.once("value", (snapshot) => {

        const datos = snapshot.val();
        let valores = Object.values(datos);

        if (req.query.province) valores = valores.filter((projection)=> projection.province === req.query.province);
        if (req.query.year) valores = valores.filter((projection)=> projection.year === parseInt(req.query.year));
        if (req.query.couple_children) valores = valores.filter((projection)=> projection.couple_children >= parseInt(req.query.couple_children));
        if (req.query.couple_nochildren) valores = valores.filter((projection)=> projection.couple_nochildren >= parseInt(req.query.couple_nochildren));
        if (req.query.single_parent) valores = valores.filter((projection)=> projection.single_parent >= parseInt(req.query.single_parent));  

        res.json(valores);
    });
  });
  
  // Actualizar datos

  app.put(apiUrl, (req, res) => {

    console.log("Metodo no permitido: Sólo se actualiza un recurso");

    res.sendStatus(405);

  });
  
  // Eliminar un dato

app.delete(apiUrl + "/:province/:year",  (req, res) => {

    var province = req.params.province;
    var year = parseInt(req.params.year);

        const projectionRef = db.ref(`projection-homes-stats`);

        projectionRef.once("value",(snapshot) => {

           if(snapshot.val()) {

            const datos = snapshot.val();
            const obtenerId = Object.keys(datos).find(
                (key) => datos[key].province === province && datos[key].year === year);

        if (obtenerId) {

            projectionRef.child(obtenerId).remove();

            res.sendStatus(200);

        }
        
        else {

            console.log("No existe el recurso");

            res.sendStatus(404);

        }
        }
        
        else {

            res.sendStatus(404);

            console.log("La base de datos está vacía");

        }});  
});

// Eliminar todos los datos

app.delete(apiUrl, (req, res) => {

        const projectionRef = db.ref(`projection-homes-stats`);

        projectionRef.remove(); 

        res.sendStatus(200);
});

// Actualizar sobre un dato y provincia

app.put(apiUrl + "/:province/:year", (req, res) => {

    const paramProvince = req.params.province;
    const paramYear = parseInt(req.params.year);
    const newcouple_children = parseInt(req.body.couple_children);
    const newcouple_nochildren = parseInt(req.body.couple_nochildren);
    const newsingle_parent = parseInt(req.body.single_parent);

    const validRequest = newcouple_children && newcouple_nochildren && newsingle_parent;

    console.log(`New PUT request to /projection-homes-stats/${paramProvince}/${paramYear}`);

    if (validRequest && (paramProvince === req.body.province && parseInt(req.body.year) === paramYear)) {

        const projectionRef = db.ref(`projection-homes-stats`);

        projectionRef.once("value",(snapshot)=>{

            const datos = snapshot.val();

            if(datos) {

            const obtenerId = Object.keys(datos).find(

                (key) => datos[key].province === paramProvince && datos[key].year === paramYear);

        if (obtenerId) {

            projectionRef.child(obetenerId).update({

                year: paramYear,
                province: paramProvince,
                couple_children: newcouple_children,
                couple_nochildren: newcouple_nochildren,
                single_parent: newsingle_parent

            });

            res.sendStatus(200);

        }
        
        else {

            console.log("No existe el recurso");

            res.sendStatus(404);

        }

        }
        
        else {

            res.sendStatus(404);

            console.log("No hay datos");

        }});

    } 
    
    else {

        console.log("Cuerpo de la peticion no es válido o los parametros de la URL no coinciden con la peticion");

        res.sendStatus(400);
    }

});