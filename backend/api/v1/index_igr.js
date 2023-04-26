import Datastore from 'nedb';
var db = new Datastore();

function backend_igrv1(app) {

    let associationData = [
        {
            name: `PADRES Y MADRES DE ALUMNOS EL CASTELLON DEL C.P. RURAL FILABRES`,
            goal: `A) ASISTIR A LOS PADRES O TUTORES EN TODO AQUELLO QUE CONCIERNE A LA EDUCACION DE SUS HIJOS O REPRESENTADOS. B) COLABORAR EN LAS ACTIVIDADES EDUCATIVAS DE LOS CENTROS, Y EN LAS ACTIVIDADES COMPLEMENTARIAS Y EXTRAESCOLARES DE LOS MISMOS. - C) PROMOVER LA PARTICIPACION DE LOS PADRES DE LOS ALUMNOS EN LA GESTION DEL CENTRO. D) FACILITAR LA REPRESENTACION Y PARTICIPACION DE LOS PADRES DE ALUMNOS EN LOS CONSEJOS ESCOLARES DE LOS CENTROS PUBLICOS Y CONCERTADOS, PARA LO CUAL PODRAN PRESENTAR... - CANDIDATURAS EN LOS CORRESPONDIENTES PROCESOS ELECTORALES. E) PROMOVER EL DESARROLLO DE PROGRAMAS DE EDUCACION FAMILIAR. F) REPRESENTAR A LOS PADRES ASOCIADOS A LAS MISMAS ANTE LAS INSTITUCIONES EDUCATIVAS Y OTROS ORGANISMOS. - G) REPRESENTAR A LOS PADRES ASOCIADOS ANTE LAS INSTANCIAS EDUCATIVAS Y OTROS ORGANISMOS, ADEMAS DE PARTICIPAR EN LOS ORGANOS DEL CENTRO, MUNICIPIO, PROVINCIA, COMUNIDAD AUTONOMA, O ADMINISTRACION CENTRAL DEL ESTADO EN LOS QUE SE HAYA ESTABLECIDO O SE ... - REQUIERA LA PRESENCIA DE LA ASOCIACION. H) ORIENTAR Y ESTIMULAR A LOS PADRES RESPECTO DE LAS OBLIGACIONES QUE LES INCUMBEN EN RELACION CON LA EDUCACION DE SUS HIJOS. I) COLABORAR EN LA MEDIDA QUE ASI LE SEA SOLICITADO, EN LA ELABORACION DESARROLLO O ... - MODIFICAICON DEL REGALMENTO DE ORGANIZACION Y FUNCIONAMIENTO DEL CENTRO. J) FOMENTAR LAS RELACIONES DE COOPERACION DEL CENTRO CON OTROS ESTABLECIMIENTOS ESCOLARES Y CON LOS SECTORES SOCIALES Y CULTURALES DEL ENTORNO. J) PROMOVER LA PLENA REALIZACION DEL.. - PRINCIPIO DE GRATUIDAD EN EL AMBITO DEL CENTRO, COMO LA EFECTIVA IGUALDAD DE DERECHOS DE TODOS LOS ALUMNOS, ASI DISCRIMINACION POR RAZONES DE SEXO, DE CONFORMIDAD CON O DISPUESTO POR EL ART. 27.3 CE Y POR LOS ART. 18.1 Y 20.1 LODE. K) OTROS...`,
            registration_date: 2000,
            creation_date: 1999,
            zip_code: 4857,
            province: `ALMERIA`,
            township_code: 46
        },
        {
            name: `CULTURAL ARTISTICA DUENDE Y COMPAS`,
            goal: `ESTUDIO, REALIZACIÓN Y DIVULGACIÓN DEL FLAMENCO EN SUS VERSIONES DE CANTE, GUITARRA, BAILE Y PERCUSIÓN. - CURSOS DE BAILE, TOQUE Y CANTE. - CONFERENCIAS, VIAJES CULTURALES Y DE CONVIVENCIA. - - - -`,
            registration_date: 2001,
            creation_date: 2000,
            zip_code: 4002,
            province: `ALMERIA`,
            township_code: 139
        },
        {
            id: 38131,
            name: `JUVENIL TEATROAK`,
            goal: `DIFUSION CULTURAL. - - - - - -`,
            registration_date: 2002,
            creation_date: 2002,
            zip_code: 4003,
            province: `ALMERIA`,
            township_code: 139
        },
        {
            name: `SOCIEDAD CASINO PRINCIPAL`,
            goal: `LA LUCHA, CON INICIATIVAS PROPIAS O EN COLABORACIÓN CON OTRAS ASOCIACIONES, ORGANIZACIONES NO GUBERNAMENTALES O ENTIDADES PÚBLICAS POR LA ERRADICACIÓN EN LA INJUSTICIA SOCIAL. - LA PROMOCIÓN Y DIFUSIÓN DE LA CULTURA, PRESTANDO ESPECIAL ATENCIÓN A LA HISTORIA, GASTRONOMÍA, FOLCLORE Y ARTESANÍA DE NUESTRO ÁMBITO DE ACTUACIÓN. - EL MECENAZGO DE LAS ARTES Y LAS LETRAS, CON ESPECIAL DEDICACIÓN A LOS ESCRITORES Y ARTISTAS RESIDENTES EN NUESTRO ÁMBITO DE ACTUACIÓN. - DOTAR A SUS ASOCIADOS Y FAMILIARES DE UN LUGAR DE REUNIÓN Y ESPARCIMIENTOS. - - -`,
            registration_date: 1966,
            creation_date: 1966,
            zip_code: 4600,
            province: `ALMERIA`,
            township_code: 530
        },
        {
            name: `PADRES DE ALUMNOS SIERRA DE GADOR DEL I.E.S. SANTO DOMINGO`,
            goal: `Asistir a los padres o tutores en todo aquello que concierne a la educación de sus hijos. - Colaborar en las actividades educativas de los Centros, y en las actividades complementarias y extraescolares de los mismos. - Promover la participación de los padres de alumnos en la gestión del centro. - Asistir a los padres de alumnos e el jercicio de su derecho a intervenir en el control y gestión del centro. - Facilitar la representacion y participación de los padres de alumnos en el Consejo Escolar del Centro y en cualquiera otro organo colegiado del mismo, y en su caso, municipio o provincia o cualquiera otra instancia pública de ámbito territorial mas amplio - promoviendo candidatos, velando por el cumplimiento y la legalidad del proceso de elección de los mismos y colaborando en la correcta realización de las elecciones. -`,
            registration_date: 1971,
            creation_date: 1970,
            zip_code: 4700,
            province: `ALMERIA`,
            township_code: 9026
        },
        {
            name: `ALUMNAS Y ALUMNOS DE EDUCACIÓN PERMANENTE BOLLULLOS DEL C.E.P. LA PIÑA`,
            goal: `Colaborar con la comunidad educativa del Centro de Educación Permanete en la educación y en la formación para lograr una formación integral y una educación para la igualdad.La defensa de los derechos del alumnado, en el sentido de que reciban de una forma - eficiente la debida enseñanza del centro de educación permanente " La Piña".Estimular la creación y desarrollo de instituciones, servicios y actividades del Centro de Educación Permanente "La Piña", culturales, pedagógicas, éticas, educación en valores, - educación para la paz y la no violencia, educación en igualdad de oportunidades entre mujeres y hombres y en definitiva a la formación integral del alumnado.Ayudar al Centro de Educación Permanente....... - - - -`,
            registration_date: 2007,
            creation_date: 2007,
            zip_code: 21710,
            province: `HUELVA`,
            township_code: 139
        },
        {
            name: `PEÑA CULTURAL FLAMENCA DE ARJONA`,
            goal: `a) Estudio, conservación promoción y divulgación del Arte Flamenco en cualquiera de sus formas de expresión, cante, toque y baile, procurando su introducción en los Centros escolares, como elemento cultural y actividad propia del pueblo andaluz. b) Velar por la pureza del Flamenco y luchar contra su adulteración o manipulación en cualquier tipo. c) La promoción de nuevos interpretes del flamenco, naturales o residentes en esta localidad, con recopilación, de ser posible de los antes autóctonos conocidos. d) Promocionar a sus miembros medios materiales, (discografía, bibliografía, conferencias, recitales, tertulias, etc.) que les permitan profundizar en el conocimiento de este arte y les sirva para su recreo. c) Ofrecer a sus miembros y familiares, en todo momento un ambiente de grata y cordial convivencia.`,
            registration_date: 1985,
            creation_date: 1985,
            zip_code: 23760,
            province: `JAEN`,
            township_code: 63
        },
        {
            name: `JOVEN ORQUESTA PROVINCIAL DE MÁLAGA`,
            goal: `1º.- El sostenimiento y promoción de su orquesta.- 2º.- Fomentr la afición a la música en la sociedad, difundiendo desde la Orquestal a la de Cámara en la Provncia de Málaga en particular, y en toda Andalucía, en general, con especial atención a los niños y jóvenes.Prestando interés en el ocio y la Educación Inclusiva, así como en la Diversidad Educativa. Desdenuestra Asocición y siempre que haya demanda colaboraremos por integrar en nuestras orquesta personas en necesidades educativas diversas. Dado que la juventud y la educación es nuestra herramienta de trabajo, colaboraremos en los aspectos anteriores.- 3º.- Completar la formación de los niños y jóvenes estudiantes de música, ofreciéndoles una formación musical integral que les permita iniciarse, prepararse o especializarse en la práctica colectiva de la música.- 4º.- La Asociación Joven Orquesta Provincial de Málaga asume como principios fundamentales en su régimen de orden interno y funcionamiento, la igualdad de género entre sus asociados, así como la paridad en sus órganos de gestión y dirección. La Junta Directiva habrá de estar integrada en una proporción de 50% entre asociados y asociadas o viceversa.- 5º.- Así mismo adopta un compromiso claro con el Medio Ambiente, la Ecología y la sostenibilidad. Favoreciendo el reciclaje y el consumo responsable. Las comunicaciones a y entre los componenetes de la Asociación, a partir de ahora pasan a ser vía electrónica. El Transporte de la orquesta a los espacios escénicos donde desarrolle sus actividades, se hará en transporte colectivo.- 6º.- Nuestra asociación, apuesta por las nuevas tecnologías y la innovación, para ello apuesta por el trabajo en red, sindo las comunicaciones, notificaciones, envío de material, certificaciones, audiovisuales y cualquier otra actividad que surja, entre los componentes de la asociación y su entorno, se hará vía telemática y a través de las Redes Sociales.- 7º.- Apostamos por el entendimiento intercultural y la colaboración transfronteriza. Constituye una vocación y objetivo fundamental de nuestra asociación, así como la formación y la integración de la diversidad en nustro común proyecto. Nuestra colaboración transcultural y transfronteriza se basa en los intercambios que cada año las y los jóvenes componentes de la orquesta participan en festivales de orquestas de jóvenes interactuando con las mas variopintas nacionalidades.- 8º.- Resolución de conflictos, mediacion. Para la solución de los conflictos o divergencias que pudieren generarse en el devenir de nuestra asociación las y los componentes de nuestra asociación, se someten de manera expresa a la mediación y arbitraje de la Comisión de asociados que se creará al efecto, y que estará integrada por tres miembros de la asociación elegidos en Asamblesa General con facultades decisorias.- 9º (incluido según acuerdo de la A.G. de 2 La labor de nuestra asociación se está haciendo muy amplia y pensamos que debemos colaborar de forma activa en el tejido de........`,
            registration_date: 1994,
            creation_date: 1994,
            zip_code: 29006,
            province: `MALAGA`,
            township_code: 672
        },
        {
            name: `CASA DE LA PAZ`,
            goal: `2.1-CREAR EN SEVILLA UN ESPACIO "CASA DE LA PAZ"QUE SERÁ SEDE DE LOS TRES GRUPOS PROMOTORES,SIEMPRE QUE ESTOS PERTENEZCAN A LA FEDERACION,DONDE REALIZAR LAS ACTIVIDADES PROPIAS DE ESTOS GRUPOS Y LOS DE LA FEDERACION.2.2-SERVIR DE UNION,COORDINACION,INTERC - AMBIO Y ORIENTACION ENTRE LAS ASOCIACIONES FEDERADAS,PARA EL MEJOR DESARROLLO DE SUS FINES COMUNES. - SE ADJUNTA FOTOCOPIA DE FINES. - - - -`,
            registration_date: 1979,
            creation_date: 1979,
            zip_code: 41003,
            province: `SEVILLA`,
            township_code: 917
        },
        {
            name: `EMPRESARIAL DE ARTESANOS CASTALLA`,
            goal: `A) REPRESENTAR A SUS ASOCIADOS EN LA DEFENSA DE SUS INTERESES LABORALES, PROFESIONALES Y ECONOMICOS. B) PROMOCIÓN, CONTROL Y DEFENSA DE LA ACTIVIDAD PROFESIONAL EN EL SECTOR.`,
            registration_date: 2000,
            creation_date: 2000,
            zip_code: 41950,
            province: `SEVILLA`,
            township_code: 299
        }
    ];

    // Base url declaration
    const BASE_API_URL_ASSOC = "/api/v1/association-stats";

    // Redirection to documentation
    app.get(BASE_API_URL_ASSOC + "/docs", (req, res) => {
        console.log("Redirection to Postman documentation");
        res.redirect("https://documenter.getpostman.com/view/26035195/2s93Jxt2eg");
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
                    console.log(`Inserted ${associationData.length} contacts`)
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
        const nameReq = req.body.name;
        const goalReq = req.body.goal;
        const regReq = req.body.registration_date;
        const creReq = req.body.creation_date;
        const zipReq = req.body.zip_code;
        const proReq = req.body.province;
        const townCodeReq = req.body.township_code;
        const isRequestBodyValid = (nameReq !== undefined) && (goalReq !== undefined) && (regReq !== undefined) && (creReq !== undefined) && (zipReq !== undefined) && (proReq !== undefined) && (townCodeReq !== undefined);
        const newAssociation = req.body;
        console.log("New POST request to /association-stats");
        if (!(isRequestBodyValid) || !(Object.values(req.body).length === 7)) {
            console.log("Body request format not valid");
            res.sendStatus(400);
            return;
        }
        db.find({ province: newAssociation.province, registration_date: newAssociation.registration_date }, (err, data) => {
            if (err) {
                console.log("Error retrieving associations data");
            }
            else {
                if (data.length > 0) {
                    console.log("Association already exists");
                    res.sendStatus(409);
                } else {
                    console.log("Created new association");
                    db.insert(newAssociation);
                    // APIAssocData.push(newAssociation);
                    res.sendStatus(201);
                }
            }
        })
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
                console.log(`Deleted ${numRemoved} association(s)`);
                res.sendStatus(200);
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
        const isRequestBodyValid = (nameReq !== undefined) && (goalReq !== undefined) && (regReq !== undefined) && (creReq !== undefined) && (zipReq !== undefined) && (proReq !== undefined) && (townCodeReq !== undefined) && (Object.values(req.body).length === 7);
        const areParamsMatching = provinceParam === proReq && parseInt(regParam) === regReq;
        console.log(`New PUT request to /association-stats/${provinceParam}/${regParam}`);
        if (isRequestBodyValid && areParamsMatching) {
            db.update({ province: provinceParam, registration_date: regParam }, {
                $set: {
                    name: nameReq,
                    goal: goalReq,
                    creation_date: creReq,
                    zip_code: zipReq,
                    township_code: townCodeReq
                }
            }, {}, (err, numReplaced) => {
                if (err) {
                    console.log(`Error updating data`);
                    res, sendStatus(500);
                } else {
                    console.log(`Updated ${numReplaced} association(s)`);
                    res.sendStatus(201);
                }
            });
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
                    console.log(`Removed ${numRemoved} association(s)`);
                    res.sendStatus(404);
                } else {
                    console.log(`Removed ${numRemoved} association(s)`);
                    res.sendStatus(200);
                }
            }
        });
    });

}

export { backend_igrv1 };