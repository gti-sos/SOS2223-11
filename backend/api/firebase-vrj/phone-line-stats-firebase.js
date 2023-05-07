import db from '../firebase/firebase.js';
import serviceAccount from '../firebase/creds.json' assert {type: 'json'};

/*
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sos2223-11-bbc8a-default-rtdb.europe-west1.firebasedatabase.app'
  });
*/



function backend_firebase(app){

var phoneArray = [{
    year: 2021,
    province: "Almeria",
    landline: 222492,
    post_payment_phone_line: 600789,
    wide_landline: 212484,
},
{
    year: 2021,
    province: "Cadiz",
    landline: 423226,
    post_payment_phone_line: 1089523,
    wide_landline: 391532,
},
{
    year: 2020,
    province: "Almeria",
    landline: 233958,
    post_payment_phone_line: 569175,
    wide_landline: 197537,
},
{
    year: 2020,
    province: "Cadiz",
    landline: 435857,
    post_payment_phone_line: 1069142,
    wide_landline: 382361,
},
{
    year: 2019,
    province: "Almeria",
    landline: 220754,
    post_payment_phone_line: 552149,
    wide_landline: 184055,
},
{
    year: 2019,
    province: "Cadiz",
    landline: 427619,
    post_payment_phone_line: 1036807,
    wide_landline: 364029,
},
{
    year: 2018,
    province: "Almeria",
    landline: 221809,
    post_payment_phone_line: 520852,
    wide_landline: 178567,
},
{
    year: 2018,
    province: "Cadiz",
    landline: 430298,
    post_payment_phone_line: 930651,
    wide_landline: 352690,
},
{
    year: 2017,
    province: "Almeria",
    landline: 227071,
    post_payment_phone_line: 510534,
    wide_landline: 171232,
},
{
    year: 2017,
    province: "Cadiz",
    landline: 440327,
    post_payment_phone_line: 956742,
    wide_landline: 349104,
}
];

//var db = admin.database();
const apiUrl = "/api/firebase/phone-line-stats";


app.get(apiUrl + "/loadInitialData", (req, res) => {
    console.log("Carga de datos");
    const phoneRef = db.ref("phone-line-stats");
    phoneRef.once("value", (snapshot)=>{
        if (snapshot.val()){
            console.log("ya hay datos en la base de datos");
        }else{
            console.log("Va a cargar los datos");
            phoneArray.forEach((phone) =>{
                var phoneRef = db.ref(`phone-line-stats`)
                phoneRef.push(phone);
            });

        }
        res.sendStatus(200);
    });

});


app.post(apiUrl, (req, res) => {

    console.log(req.body);
    const newprovince = req.body.province;
    const newyear = parseInt(req.body.year);
    const newlandline = parseInt(req.body.landline);
    const newpost_payment_phone_line = parseInt(req.body.post_payment_phone_line);
    const newwide_landline = parseInt(req.body.wide_landline);
    const validRequest = newprovince && newyear && newlandline && newpost_payment_phone_line && newwide_landline && Object.values(req.body).length === 5;
    const newPhoneLine = req.body;
    console.log(validRequest);
    console.log("New POST request to /phone-line-stats");
    const phoneRef = db.ref(`phone-line-stats`);
    if(validRequest){
    phoneRef.once("value", (snapshot) =>{
        const data = snapshot.val();
        if(data){
        const valores = Object.values(data).filter((phone)=> phone.year === newyear && phone.province === newprovince);
        if (valores.length!=0){
            res.sendStatus(409);
            console.log("Recurso ya existente");
        }else{
            phoneRef.push(req.body);
            res.sendStatus(201);
        }

    }else{
            console.log("Enviando el primer dato de la base de datos");
            phoneRef.push(req.body);
            res.sendStatus(201);

    }});
    }else{
        console.log("Error 400 los campos no son los esperados o no hay 5 campos con sus respectivos nombre");
        res.sendStatus(400);
    }
});

app.post(apiUrl+ "/:province/:year", (req, res) => {
console.log("Metodo no permitido");
res.sendStatus(405);
});


app.get(apiUrl+'/:province/:year', (req, res) => {

  const  phoneRef = db.ref("phone-line-stats");
  const filtro = phoneRef.orderByChild(`province`).equalTo(req.params.province);
    filtro.once("value", (snapshot)=>{
        const data = snapshot.val();
        const result = Object.values(data).filter((phone)=> phone.year === parseInt(req.params.year))[0];
        res.json(result);
    });
});

app.get(apiUrl, (req, res) => {
    console.log("Get a todo");
    //const queryParams = req.query;
    const phoneRef = db.ref('phone-line-stats');
    phoneRef.once("value", (snapshot) =>{
        const datos = snapshot.val();
        let valores = Object.values(datos);
        console.log("Provincia = "+ req.query.province);
        console.log("wide_landline query = "+ req.query.wide_landline_over);
        if (req.query.province) valores = valores.filter((phone)=> phone.province === req.query.province);
        if (req.query.year) valores = valores.filter((phone)=> phone.year === parseInt(req.query.year));
        if (req.query.landline_over) valores = valores.filter((phone)=> phone.landline >= parseInt(req.query.landline_over));
        if (req.query.post_payment_phone_line_over) valores = valores.filter((phone)=> phone.post_payment_phone_line >= parseInt(req.query.post_payment_phone_line_over));
        if (req.query.wide_landline_over) valores = valores.filter((phone)=> phone.wide_landline >= parseInt(req.query.wide_landline_over));  
        res.json(valores);
    });
  });
  
  app.put(apiUrl, (req, res) => {
    console.log("Metodo no permitido solo se actualiza un recurso");
    res.sendStatus(405);
  });
  

app.delete(apiUrl + "/:province/:year",  (req, res) => {
    console.log("Borrar un recurso");
    var province = req.params.province;
    var year = parseInt(req.params.year);
        const phoneRef = db.ref(`phone-line-stats`);
        phoneRef.once("value",(snapshot)=>{
           if(snapshot.val()){
            const datos = snapshot.val();
            const obetenerId = Object.keys(datos).find(
                (key) => datos[key].province === province && datos[key].year === year);
        if (obetenerId){
            phoneRef.child(obetenerId).remove();
            res.sendStatus(200);
        }else{
            console.log("No existe el recurso");
            res.sendStatus(404);
        }
        }else{
            res.sendStatus(404);
            console.log("la base de datos esta vacia");
        }});
       
      
});

app.delete(apiUrl ,  (req, res) => {
    console.log("Borrar todo");
        const phoneRef = db.ref(`phone-line-stats`);
        phoneRef.remove();      
    res.sendStatus(200);
});


app.put(apiUrl + "/:province/:year", (req, res) => {
    const paramProvince = req.params.province;
    const paramYear = parseInt(req.params.year);
    const newlandline = parseInt(req.body.landline);
    const newpost_payment_phone_line = parseInt(req.body.post_payment_phone_line);
    const newwide_landline = parseInt(req.body.wide_landline);
    const validRequest = newlandline && newpost_payment_phone_line && newwide_landline ;
    console.log(`New PUT request to /phone-line-stats/${paramProvince}/${paramYear}`);
    if (validRequest && (paramProvince === req.body.province && parseInt(req.body.year) === paramYear)) {
        const phoneRef = db.ref(`phone-line-stats`);
        phoneRef.once("value",(snapshot)=>{
            const datos = snapshot.val();
            if(datos){
            const obetenerId = Object.keys(datos).find(
                (key) => datos[key].province === paramProvince && datos[key].year === paramYear);
        if (obetenerId){
            phoneRef.child(obetenerId).update({

                year: paramYear,
                province: paramProvince,
                landline: newlandline,
                 post_payment_phone_line: newpost_payment_phone_line,
                wide_landline: newwide_landline
            });
            res.sendStatus(200);
        }else{
            console.log("No existe el recurso");
            res.sendStatus(404);
        }
        }else{
            res.sendStatus(404);
            console.log("No hay datos");
        }});
    } else {
        console.log("Cuerpo de la peticion no es valido o los parametros de la URL no coinciden con la peticion")
        res.sendStatus(400);
    }

});
}
export{backend_firebase};