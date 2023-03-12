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

// funcion media de parejas con hijos de Huelva entre los anyos 2005 hasta 2015 (ambos incluidos)

function averageCoupleChildren(province) {

    var sum = projectionHomes.filter(anyo => anyo.year >= 2005 && anyo.year <= 2015 && anyo.province === province)
        .map(couple => couple.couple_children)
        .reduce((a, n) => (a += n, a), 0);

    var filters = projectionHomes.filter(anyo => anyo.year >= 2005 && anyo.year <= 2015 && anyo.province === province)
        .map(couple => couple.couple_children)

    var half = sum / filters.length;

    var round = half.toFixed(2);

    return round;

}

app.get("/samples/CAC", (req, res) => {
    res.send(averageCoupleChildren("Huelva"));
    console.log(`New data request to CAC route`);
});

const BASE_API_URL_PROJECT = "/api/v1/projection-homes-stats";

var APIProjectData = [];

app.get(BASE_API_URL_PROJECT + "/loadInitialData", (req, response) => {

    if (APIProjectData.length === 0) {

        console.log("Loaded initial data to /projection-homes-stats");

        APIProjectData = projectionHomes;

    }

    response.sendStatus(200);

});

//-------------------------------Métodos y Códigos de estados de Christian--------------------------

app.get(BASE_API_URL_PROJECT, (request, response) => {

    console.log("New GET request to /projection-homes-stats");

        response.json(APIProjectData);

        request.sendStatus(400); // Bad Request

});

app.post(BASE_API_URL_PROJECT, (request, response) => {

    var newProject = request.body;

    var filters = APIProjectData.filter(x => x.province === newProject.province).length;

    console.log(`newProject = ${JSON.stringify(newProject, filters, 2)}`);

    console.log("New POST request to /projection-homes-stats");

    if(filters > 0) {

        response.sendStatus(409); // Conflict

    }

    else {

        response.sendStatus(201); // Created

        projectionHomes.push(newProject);

    }

});

app.put(BASE_API_URL_PROJECT, (request, response) => {

    console.log("New PUT request to /projection-homes-stats");

    response.sendStatus(405); // Method not allowed

});

app.delete(BASE_API_URL_PROJECT, (request, response) => {

    console.log("New DELETE request to /projection-homes-stats");

    APIProjectData = [];

    response.sendStatus(200); // Ok

});

// Métodos con un recurso más: 

// GET para provincia

app.get(BASE_API_URL_PROJECT + "/:province" + "/:year", (request, response) => {

    var provinceParam = request.params.province;

    var yearParam = parseInt(request.params.year);

    console.log(`New GET request to /projection-homes-stats/${provinceParam}/${yearParam}`);

    var home = APIProjectData.filter(x => {

        if (x.province === provinceParam && x.year === yearParam) {

            return x;

        }

    });

    if (home.length > 0) {

        response.json(home);

    }

    else {

        response.sendStatus(404); // Not Found

    }

});

// GET para provincia

app.get(BASE_API_URL_PROJECT + "/:province", (request, response) => {

    var provinceParam = request.params.province;

    console.log(`New GET request to /projection-homes-stats/${provinceParam}`);

    var home = APIProjectData.filter(x => {

        if (x.province === provinceParam) {

            return x;

        }

    });

    if (home.length > 0) {

        response.json(home);

    }

    else {

        response.sendStatus(404); // Not Found

    }
});

app.post(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    console.log(`New POST request to /projection-homes-stats/${request.params.province}/${parseInt(request.params.year)}`);

    response.sendStatus(405); // Method Not Allowed

});

app.put(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    var provinceParam = request.params.province;
    
    var yearParam = parseInt(request.params.year);

    console.log(`New PUT request to /projection-homes-stats/${provinceParam}/${yearParam}`);

    var provinceReq = request.body.province;
    var yearReq = request.body.year;
    var couple_childrenReq = request.body.couple_children;
    var couple_nochildrenReq = request.body.couple_nochildren;
    var single_parentReq = request.body.single_parent;

    if (provinceReq && yearReq && couple_childrenReq && couple_nochildrenReq && single_parentReq ) {

        APIProjectData.map(x => {

            if (x.province === provinceParam && x.yearParam) {

                x.province = provinceReq;
                x.year = yearReq;
                x.couple_children = x.couple_childrenReq;
                x.couple_nochildren = x.couple_nochildrenReq;
                x.single_parent = single_parentReq;
                return x;
            }

            else {

                return x;

            }
        });

            response.sendStatus(201); // Created

        }

        else {

            responde.sendStatus(400); // Bad Request
        }

    });

app.delete(BASE_API_URL_PROJECT + "/:province/:year", (request, response) => {

    var provinceParam = request.params.province;

    var yearParam = parseInt(request.params.year);

    console.log(`New DELETE request to /projection-homes-stats/${provinceParam}/${yearParam}`);

    if (APIProjectData.filter(x => x.province === provinceParam && x.year === x.yearParam).length > 0) {

         objToDelete = APIProjectData.filter(x => x.province === provinceParam && x.year === x.yearParam)[0];

         APIProjectData = APIProjectData.filter(x => x !== objToDelete);

         response.sendStatus(200);

        }

    else {

         response.sendStatus(404);

        }
        

});
}