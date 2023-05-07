import db from '../firebase/firebase.js';

function backend_firebase_cac(app) {

// Enlace a la api

const apiUrl = "/api/firebase/phone-line-stats";

// Carga de datos

app.get(apiUrl + "/loadInitialData", (req, res) => {

    const projectionRef = db.ref("projection-homes-stats");

    projectionRef.once("value", (snapshot)=> {

        if (snapshot.val()){

            console.log("Ya hay datos en la base de datos");

        }
        
        else {

            console.log("Cargará los datos");

            projectionHomes.forEach((phone) =>{
                //var projectionRef = db.ref(`projection-homes-stats`)
                projectionRef.push(phone);
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
    
    else {
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

app.get(apiUrl + '/:province/:year', (req, res) => {

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

        /*

        if (req.query.province) valores = valores.filter((projection)=> projection.province === req.query.province);
        if (req.query.year) valores = valores.filter((projection)=> projection.year === parseInt(req.query.year));
        if (req.query.couple_children) valores = valores.filter((projection)=> projection.couple_children >= parseInt(req.query.couple_children));
        if (req.query.couple_nochildren) valores = valores.filter((projection)=> projection.couple_nochildren >= parseInt(req.query.couple_nochildren));
        if (req.query.single_parent) valores = valores.filter((projection)=> projection.single_parent >= parseInt(req.query.single_parent));  

        */

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

            projectionRef.child(obtenerId).update({

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
}
export{backend_firebase_cac};