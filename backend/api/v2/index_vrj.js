import Datastore from 'nedb';
import request from 'request';
var db = new Datastore();
function backend_vrj(app) {

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
        year: 2021,
        province: "Cordoba",
        landline: 234320,
        post_payment_phone_line: 700169,
        wide_landline: 206901,
    },
    {
        year: 2021,
        province: "Granada",
        landline: 326299,
        post_payment_phone_line: 846861,
        wide_landline: 295197,
    },
    {
        year: 2021,
        province: "Huelva",
        landline: 141254,
        post_payment_phone_line: 420321,
        wide_landline: 129509,
    },
    {
        year: 2021,
        province: "Jaen",
        landline: 202220,
        post_payment_phone_line: 547224,
        wide_landline: 182274,
    },
    {
        year: 2021,
        province: "Malaga",
        landline: 624347,
        post_payment_phone_line: 1519874,
        wide_landline: 611258,
    },
    {
        year: 2021,
        province: "Sevilla",
        landline: 637952,
        post_payment_phone_line: 1856332,
        wide_landline: 608133,
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
        year: 2020,
        province: "Cordoba",
        landline: 252304,
        post_payment_phone_line: 710365,
        wide_landline: 202591,
    },
    {
        year: 2020,
        province: "Cordoba",
        landline: 252304,
        post_payment_phone_line: 710365,
        wide_landline: 202591,
    },
    {
        year: 2020,
        province: "Granada",
        landline: 341365,
        post_payment_phone_line: 824533,
        wide_landline: 287811,
    },
    {
        year: 2020,
        province: "Huelva",
        landline: 140305,
        post_payment_phone_line: 417588,
        wide_landline: 123794,
    },
    {
        year: 2020,
        province: "Jaen",
        landline: 208715,
        post_payment_phone_line: 524474,
        wide_landline: 171101,
    },
    {
        year: 2020,
        province: "Malaga",
        landline: 632670,
        post_payment_phone_line: 1469852,
        wide_landline: 556914,
    },
    {
        year: 2020,
        province: "Sevilla",
        landline: 660400,
        post_payment_phone_line: 1793888,
        wide_landline: 582859,
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
        year: 2019,
        province: "Cordoba",
        landline: 248862,
        post_payment_phone_line: 704266,
        wide_landline: 195663,
    },
    {
        year: 2019,
        province: "Granada",
        landline: 346515,
        post_payment_phone_line: 775713,
        wide_landline: 278873,
    },
    {
        year: 2019,
        province: "Huelva",
        landline: 141580,
        post_payment_phone_line: 415776,
        wide_landline: 117360,
    },
    {
        year: 2019,
        province: "Jaen",
        landline: 203501,
        post_payment_phone_line: 492486,
        wide_landline: 161732,
    },
    {
        year: 2019,
        province: "Jaen",
        landline: 203501,
        post_payment_phone_line: 492486,
        wide_landline: 161732,
    },
    {
        year: 2019,
        province: "Malaga",
        landline: 620193,
        post_payment_phone_line: 1437702,
        wide_landline: 545634,
    },
    {
        year: 2019,
        province: "Sevilla",
        landline: 667602,
        post_payment_phone_line: 1747011,
        wide_landline: 567335,
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
        year: 2018,
        province: "Cordoba",
        landline: 244296,
        post_payment_phone_line: 616967,
        wide_landline: 184345,
    },
    {
        year: 2018,
        province: "Granada",
        landline: 325535,
        post_payment_phone_line: 733503,
        wide_landline: 261704,
    },
    {
        year: 2018,
        province: "Huelva",
        landline: 142308,
        post_payment_phone_line: 373929,
        wide_landline: 114456,
    },
    {
        year: 2018,
        province: "Jaen",
        landline: 200541,
        post_payment_phone_line: 481006,
        wide_landline: 150709,
    },
    {
        year: 2018,
        province: "Malaga",
        landline: 608881,
        post_payment_phone_line: 1351549,
        wide_landline: 519645,
    },
    {
        year: 2018,
        province: "Sevilla",
        landline: 683966,
        post_payment_phone_line: 1723634,
        wide_landline: 563420,
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
    },
    {
        year: 2017,
        province: "Cordoba",
        landline: 254001,
        post_payment_phone_line: 616475,
        wide_landline: 183230,
    },
    {
        year: 2017,
        province: "Granada",
        landline: 350321,
        post_payment_phone_line: 712115,
        wide_landline: 260449,
    },
    {
        year: 2017,
        province: "Huelva",
        landline: 150358,
        post_payment_phone_line: 382239,
        wide_landline: 115596,
    },
    {
        year: 2017,
        province: "Jaen",
        landline: 210561,
        post_payment_phone_line: 482973,
        wide_landline: 148997,
    },
    {
        year: 2017,
        province: "Malaga",
        landline: 632966,
        post_payment_phone_line: 1298761,
        wide_landline: 501758,
    },
    {
        year: 2017,
        province: "Sevilla",
        landline: 662484,
        post_payment_phone_line: 1608067,
        wide_landline: 543048,
    }
    ];

    const BASE_API_URL_PHONE = "/api/v2/phone-line-stats";
    //var apiPhoneData = [];
    app.use(BASE_API_URL_PHONE + "/proxy", (req,res)=>{
        console.log("patata");
        const url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=316d96a5-715b-43ff-b7ba-af1bd02c536d&limit=20'
        req.pipe(request(url)).pipe(res);
    });


    app.get("/api/v1/phone-line-stats/docs", (req, res) => {
        console.log("Redirection to Postman documentation");
        res.redirect("https://documenter.getpostman.com/view/26051684/2s93JzMgNi");
    });

    app.get(BASE_API_URL_PHONE + "/docs", (req, res) => {
        console.log("Redirection to Postman documentation");
        res.redirect("https://documenter.getpostman.com/view/26051684/2s93XsYRjS");
    });
    app.get(BASE_API_URL_PHONE + "/loadInitialData", (req, res) => {
        db.count({}, (err, count) => {
            console.log("alfhksdhfkasdghñdlkhgkljadhgks")
            if (err) {
                console.log("Error count");
                res.sendStatus(500);
            } else {
                if (count === 0) {
                    db.insert(phoneArray);
                    console.log(`Añadidos ${phoneArray.length}`);
                }
                res.sendStatus(200);
            }
        });
    });

    app.get(BASE_API_URL_PHONE, (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        var search = {};
        console.log(req.query.year);
        if (req.query.province) search["province"] = req.query.province;
        if (req.query.year) search["year"] = parseInt(req.query.year);
        if (req.query.landline_over) search["landline"] = { $gte: parseInt(req.query.landline_over) };
        if (req.query.post_payment_phone_line_over) search["post_payment_phone_line"] = { $gte: parseInt(req.query.post_payment_phone_line_over) };
        if (req.query.wide_landline_over) search["wide_landline"] = { $gte: parseInt(req.query.wide_landline_over) };
        console.log(search);
        console.log("Patataaaaaaaaaaaaaaaaaaaa");
        db.find(search).sort({ year: 1, province: -1, landline: -2, post_payment_phone_line: -3, wide_landline: -4 }).skip(offset).limit(limit).exec((err, data) => {
            if (err) {
                console.log("Error cogiendo datos");
                res.sendStatus(500);
            } else {
                if (data.length === 0) {
                    console.log("No content to show");
                    res.json(data);
                }
                /*
                else if (data.length===1){
                    delete data[0]._id;
                    res.json(data[0]);
    
                }
                */
                else {
                    console.log(data.length);
                    data.map(d => {
                        delete d._id;
                        return d;
                    });
                    res.json(data);
                }
            }
        });
    });
    app.get(BASE_API_URL_PHONE + "/:province", (req, res) => {
        const provinciaParam = req.params.province;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.limit);
        var search = {};
        search["province"] = provinciaParam;
        if (req.query.year) search["year"] = parseInt(req.query.year);
        if (req.query.landline_over) search["landline"] = { $gte: parseInt(req.query.landline_over) };
        if (req.query.post_payment_phone_line_over) search["post_payment_phone_line"] = { $gte: parseInt(req.query.post_payment_phone_line_over) };
        if (req.query.wide_landline_over) search["wide_landline"] = { $gte: parseInt(req.query.wide_landline_over) };
        console.log("Peticion GET provincia param");
        console.log("Patataaaaaaaaaaaaaaaaaaaa");
        console.log(search);
        db.find(search).sort({ year: 1, province: -1, landline: -2, post_payment_phone_line: -3, wide_landline: -4 }).skip(offset).limit(limit).exec((err, data) => {
            if (data.length === 0) {
                console.log("No content to show");
                res.sendStatus(404);
            }
            /*
            else if (data.length===1){
                console.log("estamos en tamaño data 1");
                delete data[0]._id;
                console.log(data);
                res.json(data[0]);
            }
            */
            else {
                console.log(data.length);
                data.map(d => {
                    delete d._id;
                    return d;
                });
                res.json(data);
            }

        });
    });

    app.get(BASE_API_URL_PHONE + "/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);
        var search = {};
        search["province"] = province;
        search["year"] = year;
        db.find(search).sort({ year: 1, province: -1, landline: -2, post_payment_phone_line: -3, wide_landline: -4 }).exec((err, data) => {
            if (data.length === 0) {
                console.log("No content to show");
                res.sendStatus(404);
            }
            else if (data.length === 1) {
                delete data[0]._id;
                res.json(data[0]);

            }

            else {
                console.log(data.length);
                data.map(d => {
                    delete d._id;
                    return d;
                });
                res.json(data);
            }

        });
    });


    app.post(BASE_API_URL_PHONE, (req, res) => {
        let newprovince = null;
        console.log(req.body);
        console.log(typeof(req.body.province));
        if(typeof(req.body.province)==="string"){
             newprovince = req.body.province;
        }
        const newyear = parseInt(req.body.year);
        const newlandline = parseInt(req.body.landline);
        const newpost_payment_phone_line = parseInt(req.body.post_payment_phone_line);
        const newwide_landline = parseInt(req.body.wide_landline);
        const validRequest = newprovince && newyear && newlandline && newpost_payment_phone_line && newwide_landline && Object.values(req.body).length === 5;
        const newPhoneLine = req.body;
        console.log("New POST request to /phone-line-stats");
        if (!(validRequest)) {
            console.log(req.body);
            console.log("Format not valid and more than 5 values");
            res.sendStatus(400);
        } else {
            db.find({ year: newyear, province: newprovince }, (err, data) => {
                if (err) {
                    console.log("Error tomando datos Post");
                }
                else {
                    if (data.length > 0) {
                        console.log("Ya existe el objeto");
                        res.sendStatus(409);
                    } else {
                        console.log(req.body);
                        console.log("Created new phoneLine");
                        db.insert(newPhoneLine);
                        res.sendStatus(201);
                    }
                }

            });

        }
    });
    app.post(BASE_API_URL_PHONE + "/:province/:year", (req, res) => {
        console.log("Method not allowed");
        res.sendStatus(405);
    });

    app.put(BASE_API_URL_PHONE + "/:province/:year", (req, res) => {

        const paramProvince = req.params.province;
        const paramYear = parseInt(req.params.year);
        const newlandline = parseInt(req.body.landline);
        const newpost_payment_phone_line = parseInt(req.body.post_payment_phone_line);
        const newwide_landline = parseInt(req.body.wide_landline);
        const validRequest = newlandline && newpost_payment_phone_line && newwide_landline && Object.values(req.body).length === 5;
        console.log(`New PUT request to /phone-line-stats/${paramProvince}/${paramYear}`);
        if (validRequest && (paramProvince === req.body.province && parseInt(req.body.year) === paramYear)) {
            db.update({ year: paramYear, province: paramProvince }, {
                $set: {
                    year: paramYear,
                    province: paramProvince,
                    landline: newlandline,
                    post_payment_phone_line: newpost_payment_phone_line,
                    wide_landline: newwide_landline

                }
            }, (err, numReplaced) => {
                if (err) {
                    console.log("Error actualizando los datos");
                    res.sendStatus(500);
                } else {
                    if (numReplaced === 0) {
                        console.log("No se ha encontrado el recurso a actualizar");
                        res.sendStatus(404);
                    } else {
                        console.log(`Updated ${numReplaced} phone`);
                        res.sendStatus(200);
                    }
                }
            });
        } else {
            console.log("Cuerpo de la peticion no es valido o los parametros de la URL no coinciden con la peticion")
            res.sendStatus(400);
        }

    });

    app.put(BASE_API_URL_PHONE, (req, res) => {
        console.log("Method not allowed");
        res.sendStatus(405);
    });

    app.delete(BASE_API_URL_PHONE, (req, res) => {
        console.log("New delete to /phone-line-stats");
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.log("Error borrando datos");
                res.sendStatus(500);
            } else {
                console.log(`Se han eliminado ${numRemoved} datos`);
                res.sendStatus(200);
            }
        });
    });

    app.delete(BASE_API_URL_PHONE + "/:province/:year", (req, res) => {
        const paramProvince = req.params.province;
        const paramYear = parseInt(req.params.year);
        console.log(`New DELETE request to /phone-line-stats/${paramProvince}/${paramYear}`);
        db.remove({ province: paramProvince, year: paramYear }, {}, (err, numRemoved) => {
            if (err) {
                console.log("Error al borrar los datos");
                res.sendStatus(500);
            } else {
                if (numRemoved === 0) {
                    res.sendStatus(404);
                } else {
                    console.log(`Se ha borrado ${numRemoved} phone`);
                    res.sendStatus(200);
                }
            }
        });
    });

}

export { backend_vrj };