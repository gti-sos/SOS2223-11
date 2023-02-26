/*

---------------------------------Laboratorio F03: Realizar el siguiente algoritmo:----------------------------------------

a) Inicializa un array con los datos de ejemplo pestaña individual de la ficha de trabajo.

b) Usa iteradores (forEach, Map, filter, …) que permita calcular la media de valores de alguna de los campos 
numéricos del subconjunto de filas que comparten un determinado valor en el campo de información geográfica.

c) Al hacer “node index-YYY.js” se muestra el resultado del cálculo.

*/

// Inicializamos el array con los datos y imprimimos con .forEach

var projectionHomes = [

{province: "Almería", year: 2002, couple_children: 894148, couple_nochildren: 341796, single_parent: 150083},
{province: "Almería", year: 2003, couple_children: 886009, couple_nochildren: 409021, single_parent: 150465},
{province: "Almería", year: 2004, couple_children: 931404, couple_nochildren: 470139, single_parent: 164749},
{province: "Almería", year: 2005, couple_children: 859291, couple_nochildren: 452127, single_parent: 161659},
{province: "Almería", year: 2006, couple_children: 909246, couple_nochildren: 456352, single_parent: 201520},
{province: "Almería", year: 2007, couple_children: 948195, couple_nochildren: 515896, single_parent: 195633},
{province: "Almería", year: 2008, couple_children: 1068369, couple_nochildren: 575006,	single_parent: 171857},
{province: "Almería", year: 2009, couple_children: 1041268, couple_nochildren: 558298,	single_parent: 208899},
{province: "Almería", year: 2010, couple_children: 987317, couple_nochildren: 585697,  single_parent: 221869},

{province: "Huelva", year: 2011, couple_children: 851060, couple_nochildren: 452784, single_parent: 161686},
{province: "Huelva", year: 2012, couple_children: 857901, couple_nochildren: 403155, single_parent: 214345},
{province: "Huelva", year: 2013, couple_children: 814218, couple_nochildren: 417317, single_parent: 253532},
{province: "Huelva", year: 2014, couple_children: 748925, couple_nochildren: 466565, single_parent: 233697},
{province: "Huelva", year: 2015, couple_children: 810278, couple_nochildren: 409156, single_parent: 221309},
{province: "Huelva", year: 2016, couple_children: 829139, couple_nochildren: 359835, single_parent: 243771},
{province: "Huelva", year: 2017, couple_children: 887184, couple_nochildren: 344886, single_parent: 220562},
{province: "Huelva", year: 2018, couple_children: 873261, couple_nochildren: 385670, single_parent: 204814},
{province: "Huelva", year: 2019, couple_children: 863731, couple_nochildren: 399176, single_parent: 209060},
{province: "Huelva", year: 2020, couple_children: 861369, couple_nochildren: 406862, single_parent: 211070},
{province: "Huelva", year: 2021, couple_children: 860099, couple_nochildren: 414464, single_parent: 212114},

];

console.log("\nSample rows of data:");

projectionHomes.forEach(element => console.log(element));

// Filtramos desde el anyo 2005 hasta 2015 y queremos solo de Huelva para hacer la media, y calculamos el total.

var sum = projectionHomes.filter(anyo => anyo.year >= 2005 && anyo.year <= 2015 && anyo.province === "Huelva")
                         .map(couple => couple.couple_children)
                         .reduce((a, n) => (a += n, a), 0);

console.log("\nData sum couple_children from 2005 to 2015 from Huelva:");

console.log(sum);

// Calculamos la media de las parejas que tienen hijos desde el 2005 hasta 2015 de Huelva.

// Filtramos de nuevo los años y nos quedamos con la propiedad couple_children para saber la longitud.

var filters = projectionHomes.filter(anyo => anyo.year >= 2005 && anyo.year <= 2015 && anyo.province === "Huelva")
                             .map(couple => couple.couple_children)

var half = sum / filters.length;

console.log("\nMean Result:");

// Imprimimos el resultado y redondeamos a dos decimales.

console.log(half.toFixed(2));

