<script>
    import { onMount } from "svelte";
    import Highcharts from 'highcharts';
    import { dev } from "$app/environment";

    let API = "/api/v2/phone-line-stats";
    let phones = [];
    let resultStatus = ""; 
    let result = "";
    


    if (dev) {
        API = "http://localhost:12345" + API;
    }
    
    onMount(async () => {
        await getPhones();
        grafica(phones);
    });

    async function getPhones() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            phones = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    function grafica(datos){
    var filtro = datos.filter(p => p.province == "Almeria")
    var years = filtro.map(p=> p.year)
    var serie = [
      {
        name: "Telefonia Fija",
        data: filtro.map(p => p.landline)
    },
    {
        name: "Linea PosPago",
        data: filtro.map(p => p.post_payment_phone_line)
    },
    {
        name: "Telefonia Fija Ancha",
        data: filtro.map(p => p.wide_landline)
    }
  ]
  console.log(serie);
  Highcharts.chart("chart-container", {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Líneas telefónicas en Almería'
    },
    xAxis: {
      categories: ['2017', '2018', '2019', '2020', '2021'],
    },
    yAxis: {
      title: {
        text: 'Número de líneas telefónicas',
      },
    },
    series: serie
})

    }
  
</script>

<div id="chart-container">

</div>
  
  