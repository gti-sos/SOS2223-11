import Datastore from 'nedb';
var db = new Datastore();
import request from 'request';

function backend_igr(app) {

    // let associationData = [
    //     {
    //         name: `PADRES Y MADRES DE ALUMNOS EL CASTELLON DEL C.P. RURAL FILABRES`,
    //         goal: `ASISTIR A LOS PADRES O TUTORES EN TODO AQUELLO QUE CONCIERNE A LA EDUCACION DE SUS HIJOS O REPRESENTADOS.`,
    //         registration_date: 2000,
    //         creation_date: 1999,
    //         zip_code: 4857,
    //         province: `ALMERIA`,
    //         township_code: 46
    //     },
    //     {
    //         name: `CULTURAL ARTISTICA DUENDE Y COMPAS`,
    //         goal: `ESTUDIO, REALIZACIÓN Y DIVULGACIÓN DEL FLAMENCO EN SUS VERSIONES DE CANTE, GUITARRA, BAILE Y PERCUSIÓN.`,
    //         registration_date: 2001,
    //         creation_date: 2000,
    //         zip_code: 4002,
    //         province: `ALMERIA`,
    //         township_code: 139
    //     },
    //     {
    //         name: `JUVENIL TEATROAK`,
    //         goal: `DIFUSION CULTURAL.`,
    //         registration_date: 2002,
    //         creation_date: 2002,
    //         zip_code: 4003,
    //         province: `ALMERIA`,
    //         township_code: 139
    //     },
    //     {
    //         name: `SOCIEDAD CASINO PRINCIPAL`,
    //         goal: `LA PROMOCIÓN Y DIFUSIÓN DE LA CULTURA, PRESTANDO ESPECIAL ATENCIÓN A LA HISTORIA, GASTRONOMÍA, FOLCLORE Y ARTESANÍA DE NUESTRO ÁMBITO DE ACTUACIÓN.`,
    //         registration_date: 1966,
    //         creation_date: 1966,
    //         zip_code: 4600,
    //         province: `ALMERIA`,
    //         township_code: 530
    //     },
    //     {
    //         name: `PADRES DE ALUMNOS SIERRA DE GADOR DEL I.E.S. SANTO DOMINGO`,
    //         goal: `Asistir a los padres o tutores en todo aquello que concierne a la educación de sus hijos.`,
    //         registration_date: 1971,
    //         creation_date: 1970,
    //         zip_code: 4700,
    //         province: `ALMERIA`,
    //         township_code: 9026
    //     },
    //     {
    //         name: `ALUMNAS Y ALUMNOS DE EDUCACIÓN PERMANENTE BOLLULLOS DEL C.E.P. LA PIÑA`,
    //         goal: `Colaborar con la comunidad educativa del Centro de Educación Permanete en la educación y en la formación para lograr una formación integral y una educación para la igualdad.La defensa de los derechos del alumnado, en el sentido de que reciban de una forma - eficiente la debida enseñanza del centro de educación permanente`,
    //         registration_date: 2007,
    //         creation_date: 2007,
    //         zip_code: 21710,
    //         province: `HUELVA`,
    //         township_code: 139
    //     },
    //     {
    //         name: `PEÑA CULTURAL FLAMENCA DE ARJONA`,
    //         goal: `Estudio, conservación promoción y divulgación del Arte Flamenco en cualquiera de sus formas de expresión, cante, toque y baile, procurando su introducción en los Centros escolares, como elemento cultural y actividad propia del pueblo andaluz.`,
    //         registration_date: 1985,
    //         creation_date: 1985,
    //         zip_code: 23760,
    //         province: `JAEN`,
    //         township_code: 63
    //     },
    //     {
    //         name: `JOVEN ORQUESTA PROVINCIAL DE MÁLAGA`,
    //         goal: `Fomentar la afición a la música en la sociedad, difundiendo desde la Orquestal a la de Cámara en la Provncia de Málaga en particular, y en toda Andalucía, en general, con especial atención a los niños y jóvenes.`,
    //         registration_date: 1994,
    //         creation_date: 1994,
    //         zip_code: 29006,
    //         province: `MALAGA`,
    //         township_code: 672
    //     },
    //     {
    //         name: `CASA DE LA PAZ`,
    //         goal: `CREAR EN SEVILLA UN ESPACIO "CASA DE LA PAZ"QUE SERÁ SEDE DE LOS TRES GRUPOS PROMOTORES,SIEMPRE QUE ESTOS PERTENEZCAN A LA FEDERACION,DONDE REALIZAR LAS ACTIVIDADES PROPIAS DE ESTOS GRUPOS Y LOS DE LA FEDERACION.`,
    //         registration_date: 1979,
    //         creation_date: 1979,
    //         zip_code: 41003,
    //         province: `SEVILLA`,
    //         township_code: 917
    //     },
    //     {
    //         name: `EMPRESARIAL DE ARTESANOS CASTALLA`,
    //         goal: `REPRESENTAR A SUS ASOCIADOS EN LA DEFENSA DE SUS INTERESES LABORALES, PROFESIONALES Y ECONOMICOS.`,
    //         registration_date: 2000,
    //         creation_date: 2000,
    //         zip_code: 41950,
    //         province: `SEVILLA`,
    //         township_code: 299
    //     },

    // ];

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
            goal: `DIFUSION CULTURAL.`,
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
            goal: `Colaborar con la comunidad educativa del Centro de Educación Permanete en la educación y en la formación para lograr una formación integral y una educación para la igualdad.La defensa de los derechos del alumnado, en el sentido de que reciban de una forma - eficiente la debida enseñanza del centro de educación permanente`,
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
        },
        {
            name: `TARIFEÑA DE DEFENSA DEL PATRIMONIO CULTURAL - MELLARIA`,
            goal: `DEFENDER EL PATRIMONIO HISTORICO, ARTISTICO,ARQUELOGICO,ANTROPOLOGICO,ARQUITECTONICO,DOCUMENTAL Y CULTURAL DE TITULARIDAD PUBLICA O PRIVADA QUE SE ENCUENTRE EN EL MUNICIPIO DE TARIFA( CADIZ).`,
            registration_date: 2000,
            creation_date: 2000,
            zip_code: 11380,
            province: `CADIZ`,
            township_code: 355
        },
        {
            name: `JUVENIL CULTURAL "LOS COLOMITAS"`,
            goal: `EDUCACION EN CONTENIDOS COMPRENDIENDO LAS MATERIAS ORIGINALES - EDUCACION EN SENTIMIENTOS INTENTANDO INCULCAR VALORES - EDUCACION EN RESPONSABILIDAD CONCIENCIANDO A LOS ALUMNOS DE QUE VIVEN EN UNA SOCIADAD DEMOCRATICA CON DERECHOS Y DEBERES`,
            registration_date: 1999,
            creation_date: 1999,
            zip_code: 11401,
            province: `CADIZ`,
            township_code: 201
        },
        {
            name: `AMPA FELIPE SOLIS`,
            goal: `ASISTIR A LOS PADRES O TUTORES EN TODO QUELLO QUE CONCIERNE A LA EDUACION DE SUS HIJOS O PUPILOS`,
            registration_date: 1990,
            creation_date: 1980,
            zip_code: 14940,
            province: `CORDOBA`,
            township_code: 137
        },
        {
            name: `PENSIONISTAS VIRGEN DEL ROMERO`,
            goal: `Favorecer una mayor convivencia e identidad de los socios de la Tercera Edad y Pensionistas, por medio de promoción social, cultural recreativa y asociativa de las personsa que la forman. - Velar por los intereses comunes de cuantos integran la Asociación.`,
            registration_date: 1995,
            creation_date: 1994,
            zip_code: 14447,
            province: `CORDOBA`,
            township_code: 168
        },
        {
            name: `SIGNOS DE IDENTIDAD`,
            goal: `LA ENSEÑANZA DEL LENGUAJE DE SIGNOS, LA FORMACIÓN DEL PROFESORADO, ASI COMO LAS ACTIVIDADES DE FOMENTO DE LA COMUNICACIÓN ENTRE Y CON LOS SORDOS Y DISMINUIDOS SENSORIALES, ASÍ COMO CON LOS OYENTES.`,
            registration_date: 2005,
            creation_date: 2005,
            zip_code: 18004,
            province: `GRANADA`,
            township_code: 877
        },
        {
            name: `SOCIEDAD DE CAZADORES LA PARRA`,
            goal: `LA PRÁCTICA DEPORTIVA DE LA CAZA`,
            registration_date: 2002,
            creation_date: 2002,
            zip_code: 18830,
            province: `GRANADA`,
            township_code: 981
        },
        {
            name: `DEL HOGAR MUNICIPAL DEL PENSIONISTA`,
            goal: `Defender los derechos de la Tercera Edad.`,
            registration_date: 1980,
            creation_date: 1980,
            zip_code: 23537,
            province: `JAEN`,
            township_code: 9027
        },
        {
            name: `VECINOS EXTRAMUROS DE SAN PEDRO`,
            goal: `El desarrollo cultural, deportivo y convivencial de la vecindad donde se constituye esta Asociación. La comunicación con otras asociaciones y comunidades análogas. Defensa de los intereses de los asociados y vecinos ante los órganos y estamentos que - hiciera falta.`,
            registration_date: 1994,
            creation_date: 1994,
            zip_code: 41410,
            province: `SEVILLA`,
            township_code: 248
        },
        {
            name: `CULTURAL KARMA KAYU DE BENALMADENA`,
            goal: `EL PRESERVAR Y PROMOVER LA CULTURA, LA FILOSOFIA Y LA RELIGION BUDISTA TIBETANA DE LA TRADICION DE LA ESCUELA KARMA KAYU, BAJO LA AUTORIDAD ESPIRITUAL DEL VANERABLE LOPON TSECHU RIMPOCHE`,
            registration_date: 2001,
            creation_date: 2001,
            zip_code: 29630,
            province: `MALAGA`,
            township_code: 252
        },
        {
            name: `ENCINA LAURA`,
            goal: `LA ASOCIACIÓN TIENE COMO MISIÓN Y OBJETO BÁSICO DEFENDER LOS DERECHOS Y MEJORAR LA CALIDAD DE VIDA DE LAS PERSONAS CON DISCAPACIDAD INTELECTUAL Y DE SUS FAMILIAS EN EL ÁMBITO TERRITORIAL DE LA PROVINCIA DE MÁLAGA`,
            registration_date: 1997,
            creation_date: 1997,
            zip_code: 29130,
            province: `MALAGA`,
            township_code: 75
        },


    ];

    // Base url declaration
    const BASE_API_URL_ASSOC = "/api/v2/association-stats";

    app.get('/react-igr', (req, res) => {
        res.redirect('https://sos2223-11-react.vercel.app/');
    });

    app.use(BASE_API_URL_ASSOC + '/proxy', (req, res) => {
        const proxyUrl =
            "https://data.gov.au/data/api/3/action/datastore_search?resource_id=c8c5774c-bfbc-498b-83b6-154a6545b1ca&limit=20";
        const proxyOptions = {
            method: "GET",
            dataType: "jsonp",
        };

        // Pipe the request to the proxy URL
        req.pipe(request(proxyUrl, proxyOptions)).pipe(res);
    });

    // Redirection to documentation
    app.get(BASE_API_URL_ASSOC + "/docs", (req, res) => {
        console.log("Redirection to Postman documentation");
        res.redirect("https://documenter.getpostman.com/view/26035195/2s93XsYRab");
    });

    // Load initial data route
    app.get(BASE_API_URL_ASSOC + "/loadInitialData", (req, res) => {
        console.log("Loaded initial data to /association-stats");
        db.count({}, (err, count) => {
            if (err) {
                console.log(`Error counting data`);
            }
            else {
                if (count === 0) {
                    console.log(`Inserted ${associationData.length} associations`)
                    db.insert(associationData);
                }
                res.sendStatus(200);
            }
        });
    });

    // Get request of all data entries
    app.get(BASE_API_URL_ASSOC, (req, res) => {
        console.log("New GET request to /association-stats");
        let limit = 0;
        let offset = 0;
        if (req.query.limit !== undefined) {
            limit = req.query.limit;
        }
        if (req.query.offset !== undefined) {
            offset = req.query.offset;
        }
        let search = {};
        if (req.query.name_contains) {
            const regName = new RegExp(req.query.name_contains, "i");
            search["name"] = { $regex: regName };
        }
        if (req.query.goal_contains) {
            const regGoal = new RegExp(req.query.goal_contains, "i");
            search["goal"] = { $regex: regGoal };
        }
        if (req.query.registration_date) search["registration_date"] = parseInt(req.query.registration_date);
        if (req.query.creation_date_over) search["creation_date"] = { $gte: parseInt(req.query.creation_date_over) };
        if (req.query.zip_code_over) search["zip_code"] = { $gte: parseInt(req.query.zip_code_over) };
        if (req.query.province) search["province"] = req.query.province;
        if (req.query.township_code_over) search["township_code"] = { $gte: parseInt(req.query.township_code_over) };
        db.find(search, { _id: 0 }).skip(offset).limit(limit).exec((err, data) => {
            if (err) {
                console.log(err);
                console.log("Error getting association-stats");
                res.sendStatus(500);
            }
            else {
                console.log("Data returned");
                res.json(data);
            }
        });
    });

    // Post request of data entry to base url
    app.post(BASE_API_URL_ASSOC, (req, res) => {

        const newAssociation = req.body;

        const nameReq = req.body.name;
        const goalReq = req.body.goal;
        const regReq = req.body.registration_date;
        const creReq = req.body.creation_date;
        const zipReq = req.body.zip_code;
        const proReq = req.body.province;
        const townCodeReq = req.body.township_code;

        // Validate field types
        if (
            typeof nameReq !== 'string' ||
            typeof goalReq !== 'string' ||
            typeof regReq !== 'number' ||
            typeof creReq !== 'number' ||
            typeof zipReq !== 'number' ||
            typeof proReq !== 'string' ||
            typeof townCodeReq !== 'number'
        ) {
            console.log("Body format parameters type is not correct");
            res.sendStatus(400);
            return;
        }

        const isRequestBodyValid = (
            nameReq !== undefined &&
            goalReq !== undefined &&
            regReq !== undefined &&
            creReq !== undefined &&
            zipReq !== undefined &&
            proReq !== undefined &&
            townCodeReq !== undefined
        );

        console.log("New POST request to /association-stats");
        if (!isRequestBodyValid || Object.values(req.body).length !== 7) {
            console.log("Body request format not valid");
            res.sendStatus(400);
            return;
        }

        db.find(
            { province: newAssociation.province, registration_date: newAssociation.registration_date },
            (err, data) => {
                if (err) {
                    console.log("Error retrieving associations data");
                } else {
                    if (data.length > 0) {
                        console.log("Association already exists");
                        res.sendStatus(409);
                    } else {
                        console.log(`Created new association with province ${newAssociation.province} and registration date ${newAssociation.registration_date}`);
                        db.insert(newAssociation);
                        res.sendStatus(201);
                    }
                }
            }
        );
    });


    // Put request of data entry to base url (error)
    app.put(BASE_API_URL_ASSOC, (req, res) => {
        console.log("New PUT request to /association-stats");
        res.sendStatus(405);
    });

    // Delete request of data entry to base url
    app.delete(BASE_API_URL_ASSOC, (req, res) => {
        console.log("New DELETE request to /association-stats");
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.log('Error deleting data');
                res.sendStatus(500);
            }
            else {
                if (numRemoved == 0) {
                    console.log(`No associations to delete`);
                    res.sendStatus(404);
                }
                else {
                    console.log(`Deleted ${numRemoved} association(s)`);
                    res.sendStatus(200);
                }
            }
        });
    });

    // Get request of data entry by province field
    app.get(BASE_API_URL_ASSOC + "/:province", (req, res) => {
        const provinceParam = req.params.province;
        console.log(`New GET request to /association-stats/${provinceParam}`);
        let limit = 0;
        let offset = 0;
        if (req.query.limit !== undefined) {
            limit = req.query.limit;
        }
        if (req.query.offset !== undefined) {
            offset = req.query.offset;
        }
        db.find({ province: provinceParam }, { _id: 0 }).skip(offset).limit(limit).exec((err, data) => {
            if (err) {
                console.log('Error retrieving data');
                res.sendStatus(500);
            } else {
                if (data.length > 0) {
                    console.log("Data found");
                    res.json(data);
                }
                else {
                    console.log("Data not found");
                    res.sendStatus(404);
                }
            }
        });
    });

    // Get request of data entry by province and registration date field 
    app.get(BASE_API_URL_ASSOC + "/:province/:regDate", (req, res) => {
        const provinceParam = req.params.province;
        const regParam = parseInt(req.params.regDate);
        console.log(`New GET request to /association-stats/${provinceParam}/${regParam}`);
        db.findOne({ province: provinceParam, registration_date: regParam }, { _id: 0 }, (err, data) => {
            if (err) {
                console.log('Error retrieving data');
            } else {
                console.log(data);
                data ? res.json(data) : res.sendStatus(404);
            }
        });
    });

    // Post request of data entry by province and registration date field (error)
    app.post(BASE_API_URL_ASSOC + "/:province/:regDate", (req, res) => {
        var provinceParam = req.params.province;
        var regParam = parseInt(req.params.regDate);
        console.log(`New POST request to /association-stats/${provinceParam}/${regParam}`);
        console.log("Method not allowed");
        res.sendStatus(405);
    });

    // Put request of data entry by province field
    app.put(`${BASE_API_URL_ASSOC}/:province/:regDate`, (req, res) => {
        const provinceParam = req.params.province;
        const regParam = parseInt(req.params.regDate);
        const nameReq = req.body.name;
        const goalReq = req.body.goal;
        const regReq = req.body.registration_date;
        const creReq = req.body.creation_date;
        const zipReq = req.body.zip_code;
        const proReq = req.body.province;
        const townCodeReq = req.body.township_code;
    
        // Validate field types
        if (
            typeof nameReq !== 'string' ||
            typeof goalReq !== 'string' ||
            typeof regReq !== 'number' ||
            typeof creReq !== 'number' ||
            typeof zipReq !== 'number' ||
            typeof proReq !== 'string' ||
            typeof townCodeReq !== 'number'
        ) {
            console.log("Body format parameters type is not correct");
            res.sendStatus(400);
            return;
        }
    
        const isRequestBodyValid =
            nameReq !== undefined &&
            goalReq !== undefined &&
            regReq !== undefined &&
            creReq !== undefined &&
            zipReq !== undefined &&
            proReq !== undefined &&
            townCodeReq !== undefined &&
            Object.values(req.body).length === 7;
    
        const areParamsMatching =
            provinceParam === proReq &&
            parseInt(regParam) === regReq;
    
        console.log(`New PUT request to /association-stats/${provinceParam}/${regParam}`);
        if (isRequestBodyValid && areParamsMatching) {
            db.update(
                { province: provinceParam, registration_date: regParam },
                {
                    $set: {
                        name: nameReq,
                        goal: goalReq,
                        creation_date: creReq,
                        zip_code: zipReq,
                        township_code: townCodeReq
                    }
                },
                {},
                (err, numReplaced) => {
                    if (err) {
                        console.log(`Error updating data`);
                        res.sendStatus(500);
                    } else {
                        console.log(`Updated ${numReplaced} association(s)`);
                        res.sendStatus(201);
                    }
                }
            );
        } else {
            if (!isRequestBodyValid) {
                console.log("Request body not valid");
            }
            if (!areParamsMatching) {
                console.log("URL parameters not matching with request body");
            }
            res.sendStatus(400);
        }
    });
    

    // Delete request of data entry by province and registration date field
    app.delete(`${BASE_API_URL_ASSOC}/:province/:regDate`, (req, res) => {
        const provinceParam = req.params.province;
        const regParam = parseInt(req.params.regDate);
        console.log(`New DELETE request to /association-stats/${provinceParam}/${regParam}`);
        db.remove({ province: provinceParam, registration_date: regParam }, {}, (err, numRemoved) => {
            if (err) {
                console.log('Error deleting data');
                res.sendStatus(500);
            } else {
                if (numRemoved === 0) {
                    console.log(`Association not found`);
                    res.sendStatus(404);
                } else {
                    console.log(`Removed ${numRemoved} association(s)`);
                    res.sendStatus(200);
                }
            }
        });
    });

}

export { backend_igr };