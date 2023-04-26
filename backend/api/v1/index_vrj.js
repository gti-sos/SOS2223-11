import Datastore from 'nedb';
var db = new Datastore();
function backend_vrjv1(app) {

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

    const BASE_API_URL_PHONE = "/api/v1/phone-line-stats";
    //var apiPhoneData = [];
    app.get(BASE_API_URL_PHONE + "/docs", (req, res) => {
        console.log("Redirection to Postman documentation");
        res.redirect("https://documenter.getpostman.com/view/26051684/2s93JzMgNi");
    });
    app.get(BASE_API_URL_PHONE + "/loadInitialData", (req, res) => {
        db.count({}, (err, count) => {
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
                tatatatatata
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

        console.log(req.body);
        const newprovince = req.body.province;
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

export { backend_vrjv1 };