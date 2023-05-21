<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';
  import { dev } from "$app/environment";
/*

const url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=316d96a5-715b-43ff-b7ba-af1bd02c536d&limit=20';
    const options = {
    method: 'GET',
};
*/
let datos;
let API = "/api/v2/phone-line-stats";
    if (dev) {
        API = "http://localhost:12345" + API;
    }
const recurso = API + "/proxy";
onMount(async () => {
  console.log(recurso)
    const response = await fetch(recurso);
    if (response.ok){
      datos = await response.json();
      console.log("API response:", datos.result.records);
      const pastel = datos.result.records.map(item => ({
      name: item.Animal,
      y: item["Total#Impounded"],
    }));
    console.log(pastel);
    
   
    Highcharts.chart("chart-container",{
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Estadísticas de la Perrera',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'capturado y retenido en una perrera',
          colorByPoint: true,
          data: pastel,
        },
      ],
    });

    }
});
</script>

<div id="chart-container">

</div>