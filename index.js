//-------------------------------------Array datos de entidades-----------------------------------



// --------------------------------- Array lineas telefonicas ------------------------------

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

// funcion media de codigos por provincia

function getTownshipCodeAverage(dataArray) {

    let filteredArray = dataArray.filter(dataRow => dataRow[8] === "ALMERIA");

    let length = filteredArray.length;
    let sum = 0;
    filteredArray.forEach(element => {
        sum += element[10];
    });

    /*
    let sum = filteredArray.reduce((acum, current) => {
        acum + current[10], initial;
    })
    */

    return sum / length;
}

// funcion media lineas telefonicas 

function averageWideLandline(province) {

    s = phoneArray.filter(n => n.province === province);
    size = s.length;
    let total = 0
    s.forEach(element => {
        total = total + element.wide_landline
    });
    console.log(total);
    return total / size

}

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

// Abrir puertos y caras ascii


var cool = require("cool-ascii-faces");

var express = require("express");

var app = express();

var port = process.env.PORT || 12345;

var bodyParser = require("body-parser");

app.use(bodyParser.json());

// cool faces (obtener ruta /cool)

app.get("/cool", (req, res) => {
    res.send(cool());
    console.log("New face request");

});

// Obtener los resultados de las medias por cada ruta

app.get("/samples/IGR", (req, res) => {
    res.send(`` + getTownshipCodeAverage(associationData));
    console.log(`New data request to IGR route`);
});

app.get("/samples/VRJ", (req, res) => {
    res.send(String(averageWideLandline("Almeria")));
    console.log(`New data request to VRJ route`);
});

app.get("/samples/CAC", (req, res) => {
    res.send(averageCoupleChildren("Huelva"));
    console.log(`New data request to CAC route`);
});

var backend_igr = require("./backend/index_igr");

backend_igr(app);


// Escuchar puertos abiertos

app.listen(port, () => {
    console.log(`Server ready in port ${port}`);
});

