module.exports = (app)=>{

    var phoneArray= [{
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
        wide_landline:171232,
    },
    {
        year: 2017,
        province: "Cadiz",
        landline: 440327,
        post_payment_phone_line: 956742,
        wide_landline: 349104,
    }
    ];

BASE_API_URL_PHONE = "/api/v1/phone-line-stats";
var apiPhoneData = [];
app.get(BASE_API_URL_PHONE+"/loadInitialData",(req,res)=>{
    if (apiPhoneData.length === 0){
        console.log("datos cargados")
        apiPhoneData = phoneArray;
       
    }
    //res.json(apiPhoneData);
    res.sendStatus(200);
});

app.get(BASE_API_URL_PHONE,(req,res)=>{
    var filters = req.query;
    var filteredPhones = apiPhoneData.filter(phone => {
        let isValid = true;
        for (key in filters) {
          console.log(key, phone[key], filters[key]);
          isValid = isValid && phone[key] == filters[key];
        }
        return isValid;
      });
      if (filteredPhones.length!=0){
            res.json(filteredPhones);
      }else{
        res.json(apiPhoneData);
      }
    res.sendStatus(200);

});
app.get(BASE_API_URL_PHONE+"/:province",(req,res)=>{
    var provincia = req.params.province;
    var filtro = apiPhoneData.filter(phone=>phone.province === provincia);
    if (filtro.length!=0){
        res.json(filtro);
    }
    else {

        res.sendStatus(404);
    }
    
});

app.get(BASE_API_URL_PHONE+"/:province/:year",(req,res)=>{
    var provincia = req.params.province;
    var year = parseInt(req.params.year);
    var filtro = apiPhoneData.filter(phone=>phone.province === provincia && phone.year === year);
    if (filtro.length!=0){
        res.json(filtro);
    }
    else {

        res.sendStatus(404);
    }
    
});


app.post(BASE_API_URL_PHONE, (req, res) => {
    var newPhoneLine = req.body;
    var provincia = newPhoneLine.province;
    console.log(provincia);
    var year = parseInt(newPhoneLine.year);
    console.log(year);
    console.log("New POST request to /phone-line-stats");
    if (apiPhoneData.filter(phone => phone.province === provincia && year === phone.year).length != 0) {
        console.log("Resource already exists");
        res.sendStatus(409);
    }
    else {
        apiPhoneData.push(newPhoneLine);
        res.sendStatus(201);
    }
});
app.post(BASE_API_URL_PHONE+"/:province/:year", (req, res)=>{
    console.log("Method not allowed");
    res.sendStatus(405);
});

app.put(BASE_API_URL_PHONE+"/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = parseInt(req.params.year);
    var landline = req.body.landline;
    var post_payment_phone_line = req.body.landline;
    var wide_landline =  req.body.landline;
    console.log(`New PUT request to /association-stats/${province}/${year}`);
    if (landline && wide_landline && post_payment_phone_line){
        apiPhoneData.map(phone=>{
            if (phone.province===province && phone.year === year){
            phone.landline = landline;
            phone.post_payment_phone_line = post_payment_phone_line;
            phone.wide_landline = wide_landline;
            return phone;
        }else{
            return phone;
        }
        });
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
});

app.put(BASE_API_URL_PHONE,(req,res)=>{
    console.log("Method not allowed");
    res.sendStatus(405);
});

app.delete(BASE_API_URL_PHONE,(req,res)=>{
    console.log("New delete to /phone-line-stats");
    apiPhoneData = [];
    res.sendStatus(200);
});

app.delete(BASE_API_URL_PHONE+"/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = parseInt(req.params.year);
    console.log(`New DELETE request to /association-stats/${province}/${year}`);
    if(apiPhoneData.filter(phone=> phone.province === province && phone.year===year).length>0){
        borra = apiPhoneData.filter(phone=> phone.province === province && phone.year===year)[0];
        apiPhoneData = apiPhoneData.filter(phone => phone!=borra);
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
});

}