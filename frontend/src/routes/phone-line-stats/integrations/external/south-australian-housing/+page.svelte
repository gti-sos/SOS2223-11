<script>
 import { onMount } from 'svelte';
  import Highcharts from 'highcharts';
   
let datos
const url = 'https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=850833e8-2fde-4c33-b17d-19742b722fc3&limit=5';
    const options = {
    method: 'GET',
};
onMount(async () => {
    const response = await fetch(url, options);
    if (response.ok){
      datos = await response.json();
      console.log("API response:", datos.result.records);
    }
  let anos = datos.result.records.map(e => e.year);
  console.log(anos);
  let serie = [
    {
      name: "Casas Aboriginales Experimentales",
      data: datos.result.records.map(e=> e["aboriginal housing probationary"])
    },
    {
      name: "Casas Publicas Experimentales",
      data: datos.result.records.map(e=> e["public housing probationary"])
    },
   ]

   Highcharts.chart('chart-container', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Evolución de viviendas'
        },
        xAxis: {
          categories: anos
        },
        yAxis: {
          title: {
            text: 'Cantidad'
          }
        },
        series: serie
      });
});
</script>

<div id="chart-container">

</div>