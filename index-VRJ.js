

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
var total = 0;

function averageWideLandline(province){
    
   s =  phoneArray.filter(n => n.province === province);
   size = s.length;
   s.forEach(element => {
    total = total + element.wide_landline
});
    console.log(total);
   return total/size

}


console.log(averageWideLandline("Almeria"))




