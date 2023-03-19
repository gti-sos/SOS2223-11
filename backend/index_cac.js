// Base de datos neDB

var Datastore = require('nedb');

var db = new Datastore();

// Modularizar la app

module.exports = (app) => {

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
    { province: "Huelva", year: 2021, couple_children: 860099, couple_nochildren: 414464, single_parent: 212114 },

];

const BASE_API_URL_PROJECT = "/api/v1/projection-homes-stats";

// Redirigir al enlace /docs para la colección de llamadas de postman

app.get(BASE_API_URL_PROJECT + "/docs", (request, response) => {

    console.log("Redirection to the collection of calls Postman");

    response.redirect("");

})

// Cargar datos en la base de datos

app.get(BASE_API_URL_PROJECT + "/loadInitialData", (request, response) => {

    db.count({}, (error, count) => {

        if(error) {

            console.log("Error counting datas");

            response.sendStatus(500); // Internal Server Error

        }

        else {

            if(count === 0) {

                db.insert(projectionHomes);

                console.log(`Inserted ${projectionHomes.length}`);

            }

            response.sendStatus(200); // Ok

        }
    })
    });

//--------------------------------------Métodos GET-------------------------------------

// Obtener datos desde un punto a otro

app.get(BASE_API_URL_PROJECT, (request, response) => {

    let offset = parseInt(request.query.offset); // Inicio

    let limit = parseInt(request.query.limit); // Fin

    var search = {};

    console.log(request.query.year);

    if(request.query.province) search["province"] = request.query.province;

    if(request.query.year) search["year"] = parseInt(request.query.year);

    if(request.query.couple_children) search["couple_children"] = {$gte: parseInt(request.query.couple_children)};

    if(request.query.couple_nochildren) search["couple_nochildren"] = {$gte: parseInt(request.query.couple_nochildren)};

    if(request.query.single_parent) search["single_parent"] = {$gte: parseInt(request.query.single_parent)};

    console.log("Search datas:");

    console.log(search);

    // Ordenar los datos encontrados

    db.find(search).sort({year : 1, province : -1, couple_children : -2, couple_nochildren : -3, single_parent : -4})
    .skip(offset).limit(limit).exec((error, data) => {

        if(error) {

            console.log("Error getting data");

            response.sendStatus(500); // Internal Server Error

        }

        else {

            if(data.length === 0) {

                console.log("0 datas");

                response.json(data);

            }

            else if(data.length === 1) {

                delete data[0]._id;

                response.json(data[0]);
            }

            else {

                console.log(data.length);

                data.map(ds => {
                    
                    delete ds._id;

                    return ds;

                });

                response.json(data);

            }
        }
    });
})

// Obtener datos de una provincia

app.get(BASE_API_URL_PROJECT + "/:province", (request, response) => {

    let provinceParam = request.params.province;

    let offset = parseInt(request.query.offset); // Inicio

    let limit = parseInt(request.query.limit); // Fin

    var search = {};

    search["province"] = provinceParam;

    if(request.query.year) search["year"] = request.query.year;

    if(request.query.couple_children) search["couple_children"] = {$gte: parseInt(request.query.couple_children)};

    if(request.query.couple_nochildren) search["couple_nochildren"] = {$gte: parseInt(request.query.couple_nochildren)};

    if(request.query.single_parent) search["single_parent"] = {$gte: parseInt(request.query.single_parent)};

    console.log("Param: Province");

    console.log("Search datas:");

    console.log(search);

    // Ordenar los datos encontrados

    db.find(search).sort({year : 1, province : -1, couple_children : -2, couple_nochildren : -3, single_parent : -4})
    .skip(offset).limit(limit).exec((error, data) => {

            if(data.length === 0) {

                console.log("0 datas");

                response.sendStatus(404); // Page, Data Not Found
            }

            else if(data.length === 1) {

                delete data[0]._id;

                response.json(data[0]);
            }

            else {

                console.log(data.length);

                data.map(ds => {
                    
                    delete ds._id;

                    return ds;

                });

                response.json(data);

            }
    });
});

// Obtener datos de una provincia y un anyo dados

app.get(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    let provinceParam = request.params.province;

    let yearParam = parseInt(request.params.year);

    console.log(`New GET request to /projection-homes-stats/${provinceParam}/${yearParam}`);

    db.findOne({province : provinceParam, year : yearParam}, {_id: 0}, (error, data) => {

        if(error) {

            console.log("Error getting data");

        }

        else {

            data ? response.json(data) : response.sendStatus(404);

        }
    });
});

//--------------------------------------Métodos POST-------------------------------------

// Cargar nuevos datos

app.post(BASE_API_URL_PROJECT, (request, response) => {

    console.log(request.body);

    var provinceReq = request.body.province;
    var yearReq = parseInt(request.body.year);
    var couple_childrenReq = parseInt(request.body.couple_children);
    var couple_nochildrenReq = parseInt(request.body.couple_nochildren);
    var single_parentReq = parseInt(request.body.single_parent);

    var requestValid = provinceReq && yearReq && couple_childrenReq 
                       && couple_nochildrenReq && single_parentReq
                       && Object.values(request.body).length == 5;

    var newProjectionHome = request.body;

    console.log(`New POST request to /projection-homes-stats`);

    if(!(requestValid)) {

        console.log(request.body);

        console.log("More than 5 values and parsers not valids");

        response.sendStatus(400); // Bad Request

    }

    else {

        db.find({year: yearReq, province: provinceReq}, (error, data) => {

            if(error) {

                console.log("Error size Post");

            }

            else {

                if(data.length > 0) {

                    console.log("Exist the value");

                    response.sendStatus(400); // Bad Request

                }

                else {

                    console.log(request.body);

                    console.log("ProjectionHome created");

                    db.insert(newProjectionHome);

                    response.sendStatus(201); // Created

                }
            }
        });
    }
});
    
// Poner datos segun el anyo y la provincia: No se puede

app.post(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    console.log("Impossible POST of province and year");

    response.sendStatus(405); // Method not allowed

});

//--------------------------------------Métodos PUT-------------------------------------

// Actualizar todos los datos: No se puede

app.put(BASE_API_URL_PROJECT, (request, response) => {

    console.log("Impossible PUT of datas");

    response.sendStatus(405); // Method not allowed

});

// Actualizar los datos según la provincia y el anyo

app.put(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    var provinceParam = request.params.province;
    var yearParam = parseInt(request.params.year);

    console.log(`New PUT request to /projection-homes-stats/${provinceParam}/${yearParam}`);

    var couple_childrenReq = parseInt(request.body.couple_children);
    var couple_nochildrenReq = parseInt(request.body.couple_nochildren);
    var single_parentReq = parseInt(request.body.single_parent);

    var requestValid = couple_childrenReq 
                       && couple_nochildrenReq && single_parentReq
                       && Object.values(request.body).length == 5;

    if(requestValid && (provinceParam === request.body.province && parseInt(request.body.year) === yearParam)) {

        db.update({year: yearParam, province: provinceParam}, {

            $set: {

                year: yearParam,
                province: provinceParam,
                couple_children: couple_childrenReq,
                couple_nochildren: couple_nochildrenReq,
                single_parent: single_parentReq

            }
        }, (error, replaced) => {

            if(error) {

                console.log("Error update datas");

                response.sendStatus(500); // Internal Server error

            }

            else {

                if(replaced === 0) {

                    console.log("Object not found");

                    response.sendStatus(404); // Not Found


                }

                else {

                    console.log(`Updated ${replaced} projectionHome`);

                    response.sendStatus(200); // Ok

                }
            }
        });

    }

    else {

        console.log("Body not valid or params not equals");

        response.sendStatus(400); // Not Found
    }

    });

//--------------------------------------Métodos DELETE-------------------------------------

// Eliminar todos los datos

app.delete(BASE_API_URL_PROJECT, (request, response) => {

    console.log("New DELETE request to /projection-homes-stats");

    db.remove({}, {multi: true}, (error, removed) => {

        if(error) {

            console.log("Error remove datas");

            response.sendStatus(500); // Internal Server Error

        }

        else {

            console.log(`Remove ${removed} datas`);

            response.sendStatus(200); // Ok

        }
    });
});

// Eliminar los datos de una provincia y un anyo dados
    
app.delete(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    var provinceParam = request.params.province;

    var yearParam = parseInt(request.params.year);

    console.log(`New DELETE request to /projection-homes-stats/${provinceParam}/${yearParam}`);

    db.remove({province : provinceParam, year: yearParam}, {}, (error, removed) => {

        if(error) {

            console.log("Error remove datas");

            response.sendStatus(500); // Internal Server Error

        }

        else {

            if(removed === 0) {

                console.log(`Remove ${removed} datas`);

                response.sendStatus(404); // Not Found

            }

            else {

            console.log(`Remove ${removed} datas`);

            response.sendStatus(200); // Ok

            }

        }
    });
});
}