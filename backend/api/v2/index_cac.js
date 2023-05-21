// Base de datos neDB

import Datastore from 'nedb';

var db = new Datastore();

// Modularizar la app

function backend_cac(app) {

// ------------------------------Array datos con los tipos de familiares-------------------------------

var projectionHomes = [

    { province: "Almería", year: 2002, couple_children: 894148, couple_nochildren: 341796, single_parent: 150083 },
    { province: "Almería", year: 2003, couple_children: 886009, couple_nochildren: 409021, single_parent: 150465 },
    { province: "Almería", year: 2004, couple_children: 931404, couple_nochildren: 470139, single_parent: 164749 },
    { province: "Almería", year: 2005, couple_children: 859291, couple_nochildren: 452127, single_parent: 161659 },
    { province: "Almería", year: 2006, couple_children: 909246, couple_nochildren: 456352, single_parent: 201520 },
    { province: "Almería", year: 2007, couple_children:	948195, couple_nochildren: 515896, single_parent: 195633 },
    { province: "Almería", year: 2008, couple_children: 1068369, couple_nochildren:	575006, single_parent: 171857 },
    { province: "Almería", year: 2009, couple_children:	1041268, couple_nochildren:	558298, single_parent: 208899 },
    { province: "Almería", year: 2010, couple_children:	987317, couple_nochildren: 585697, single_parent: 221869 },
   
    { province: "Huelva", year: 2002, couple_children: 820268, couple_nochildren: 249523, single_parent: 112314 },
    { province: "Huelva", year: 2003, couple_children: 796178, couple_nochildren: 256464, single_parent: 157341 },
    { province: "Huelva", year: 2004, couple_children: 811178, couple_nochildren: 269092, single_parent: 154310 },
    { province: "Huelva", year: 2005, couple_children: 817166, couple_nochildren: 298709, single_parent: 139739 },
    { province: "Huelva", year: 2006, couple_children: 815255, couple_nochildren: 324463, single_parent: 149845 },
    { province: "Huelva", year: 2007, couple_children: 860537, couple_nochildren: 329468, single_parent: 136295 },
    { province: "Huelva", year: 2008, couple_children: 867127, couple_nochildren: 329036, single_parent: 168843 },
    { province: "Huelva", year: 2009, couple_children: 817493, couple_nochildren: 334032, single_parent: 195379 },
    { province: "Huelva", year: 2010, couple_children: 852547, couple_nochildren: 372149, single_parent: 175793 },

    { province: "Cádiz", year: 2002, couple_children: 1909621, couple_nochildren: 550387, single_parent: 343037 },
    { province: "Cádiz", year: 2003, couple_children: 1936252, couple_nochildren: 565014, single_parent: 349398 },
    { province: "Cádiz", year: 2004, couple_children: 1912470, couple_nochildren: 606882, single_parent: 374135 },
    { province: "Cádiz", year: 2005, couple_children: 1996224, couple_nochildren: 617296, single_parent: 414192 },
    { province: "Cádiz", year: 2006, couple_children: 1981071, couple_nochildren: 695731, single_parent: 416033 },
    { province: "Cádiz", year: 2007, couple_children: 1992055, couple_nochildren: 778801, single_parent: 402226 },
    { province: "Cádiz", year: 2008, couple_children: 2055457, couple_nochildren: 803720, single_parent: 371196 },
    { province: "Cádiz", year: 2009, couple_children: 2032731, couple_nochildren: 797903, single_parent: 449044 }, 
    { province: "Cádiz", year: 2010, couple_children: 1999625, couple_nochildren: 891097, single_parent: 452103 },

    { province: "Córdoba", year: 2002, couple_children: 1305981, couple_nochildren: 454832,	single_parent: 173546 },
    { province: "Córdoba", year: 2003, couple_children: 1284435, couple_nochildren: 493476,	single_parent: 199227 }, 
    { province: "Córdoba", year: 2004, couple_children: 1230638, couple_nochildren: 540266,	single_parent: 246301 }, 
    { province: "Córdoba", year: 2005, couple_children: 1272053, couple_nochildren: 530782,	single_parent: 227820 }, 
    { province: "Córdoba", year: 2006, couple_children: 1306643, couple_nochildren: 539972,	single_parent: 218450 },
    { province: "Córdoba", year: 2007, couple_children:	1314759, couple_nochildren: 608473, single_parent: 204615 },
    { province: "Córdoba", year: 2008, couple_children:	1355635, couple_nochildren: 627797, single_parent: 203440 },
    { province: "Córdoba", year: 2009, couple_children:	1318887, couple_nochildren:	609732, single_parent: 234550 },
    { province: "Córdoba", year: 2010, couple_children: 1294493, couple_nochildren:	595558, single_parent: 266654 },

    { province: "Granada", year: 2002, couple_children: 1328424, couple_nochildren:	502366,	single_parent: 267760 },
    { province: "Granada", year: 2003, couple_children: 1348303, couple_nochildren:	557555,	single_parent: 291271 },
    { province: "Granada", year: 2004, couple_children: 1355809, couple_nochildren:	589082,	single_parent: 262996 },
    { province: "Granada", year: 2005, couple_children: 1407582, couple_nochildren:	626791,	single_parent: 254097 },
    { province: "Granada", year: 2006, couple_children: 1407665, couple_nochildren:	635603,	single_parent: 274358 },
    { province: "Granada", year: 2007, couple_children: 1408566, couple_nochildren:	678103,	single_parent: 249874 },
    { province: "Granada", year: 2008, couple_children: 1489471, couple_nochildren:	704580,	single_parent: 279158 },
    { province: "Granada", year: 2009, couple_children: 1433202, couple_nochildren:	767741,	single_parent: 296184 },
    { province: "Granada", year: 2010, couple_children: 1433609, couple_nochildren:	740434,	single_parent: 299988 },
   
    { province: "Jaén",	year: 2002,	couple_children: 1088823, couple_nochildren: 440498, single_parent:178178 },
    { province: "Jaén",	year: 2003,	couple_children: 1096247, couple_nochildren: 442847, single_parent:179557 },
    { province: "Jaén",	year: 2004,	couple_children: 1129405, couple_nochildren: 435322, single_parent:188223 },
    { province: "Jaén",	year: 2005,	couple_children: 1170719, couple_nochildren: 457209, single_parent:175938 },
    { province: "Jaén",	year: 2006,	couple_children: 1126690, couple_nochildren: 493847, single_parent:180911 },
    { province: "Jaén",	year: 2007,	couple_children: 1111312, couple_nochildren: 530357, single_parent:159718 }, 
    { province: "Jaén",	year: 2008,	couple_children: 1173560, couple_nochildren: 519177, single_parent:148087 },
    { province: "Jaén",	year: 2009,	couple_children: 1138494, couple_nochildren: 531457, single_parent:175794 },
    { province: "Jaén",	year: 2010,	couple_children: 1157114, couple_nochildren: 531970, single_parent:174790 },

    { province: "Málaga", year:	2007, couple_children: 2414733, couple_nochildren: 1020268,	single_parent: 476654 },
    { province: "Málaga", year:	2008, couple_children: 2255481,	couple_nochildren: 1176578,	single_parent: 496190 }, 
    { province: "Málaga", year:	2009, couple_children: 2461516,	couple_nochildren: 1192378,	single_parent: 514051 }, 
    { province: "Málaga", year:	2010, couple_children: 2473148,	couple_nochildren: 1170040,	single_parent: 613185 },
    { province: "Málaga", year: 2002, couple_children: 2126565, couple_nochildren: 764957, single_parent: 549488 },
    { province: "Málaga", year:	2003, couple_children: 2151903, couple_nochildren: 775440, single_parent: 554023 },
    { province: "Málaga", year:	2004, couple_children: 2232270, couple_nochildren: 824201, single_parent: 493219 },
    { province: "Málaga", year:	2005, couple_children: 2283130, couple_nochildren: 924316, single_parent: 505388 },
    { province: "Málaga", year:	2006, couple_children: 2382660, couple_nochildren: 917733, single_parent: 528165 },

    { province: "Sevilla", year: 2002, couple_children: 2902647, couple_nochildren: 1089913, single_parent:	519509 },
    { province: "Sevilla", year: 2003, couple_children: 2909823, couple_nochildren: 1006532, single_parent: 588930 },
    { province: "Sevilla", year: 2004, couple_children: 3010156, couple_nochildren: 1005396, single_parent: 603765 }, 
    { province: "Sevilla", year: 2005, couple_children: 3007747, couple_nochildren: 1047912, single_parent: 616691 },
    { province: "Sevilla", year: 2006, couple_children: 2986264, couple_nochildren: 1116093, single_parent: 619367 },
    { province: "Sevilla", year: 2007, couple_children:	3033087, couple_nochildren:	1125681, single_parent:	634014 },
    { province: "Sevilla", year: 2008, couple_children:	3072403, couple_nochildren:	1143070, single_parent:	635357 },
    { province: "Sevilla", year: 2009, couple_children:	3023490, couple_nochildren:	1280795, single_parent:	689206 },
    { province: "Sevilla", year: 2010, couple_children:	3107350, couple_nochildren:	1353794, single_parent: 685160 }

];

const BASE_API_URL_PROJECT_V1 = "/api/v1/projection-homes-stats";

const BASE_API_URL_PROJECT = "/api/v2/projection-homes-stats";

// Redirigir al enlace /docs para la colección de llamadas de postman

app.get(BASE_API_URL_PROJECT_V1 + "/docs", (request, response) => {

    console.log("Redirection to the collection of calls Postman");

    response.redirect("https://documenter.getpostman.com/view/26061381/2s93JzN1UZ");

});

// Redirigir al enlace /docs para la colección de llamadas de postman

app.get(BASE_API_URL_PROJECT + "/docs", (request, response) => {

    console.log("Redirection to the collection of calls Postman");

    response.redirect("https://documenter.getpostman.com/view/26061381/2s93XsYRtF");

});

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

    var offset = 0; // Inicio

    var limit = 0; // Fin

    if (request.query.limit !== undefined) {
        limit = parseInt(request.query.limit);
    }
    if (request.query.offset !== undefined) {
        offset = parseInt(request.query.offset);
    }

    var search = {};

    if(request.query.province) search["province"] = request.query.province;

    if(request.query.year) search["year"] = parseInt(request.query.year);

    if(request.query.couple_children) search["couple_children"] = {$gte: parseInt(request.query.couple_children)};

    if(request.query.couple_nochildren) search["couple_nochildren"] = {$gte: parseInt(request.query.couple_nochildren)};

    if(request.query.single_parent) search["single_parent"] = {$gte: parseInt(request.query.single_parent)};

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

    var provinceParam = request.params.province;

    var offset = parseInt(request.query.offset); // Inicio

    var limit = parseInt(request.query.limit); // Fin

    var search = {};

    search["province"] = provinceParam;

    if(request.query.year) search["year"] = request.query.year;

    if(request.query.couple_children) search["couple_children"] = {$gte: parseInt(request.query.couple_children)};

    if(request.query.couple_nochildren) search["couple_nochildren"] = {$gte: parseInt(request.query.couple_nochildren)};

    if(request.query.single_parent) search["single_parent"] = {$gte: parseInt(request.query.single_parent)};

    // Ordenar los datos encontrados

    db.find(search).sort({year : 1, province : -1, couple_children : -2, couple_nochildren : -3, single_parent : -4})
    .skip(offset).limit(limit).exec((error, data) => {

            if(data.length === 0) {

                console.log("0 datas");

                response.sendStatus(404); // Page, Data Not Found

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

    const provinceParam = request.params.province;

    const yearParam = parseInt(request.params.year);

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

                    response.sendStatus(409); // Conflict

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

export { backend_cac };