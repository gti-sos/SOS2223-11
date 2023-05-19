<script>
     import { onMount } from 'svelte';
  import Highcharts from 'highcharts';

  let datos
const url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=316d96a5-715b-43ff-b7ba-af1bd02c536d&limit=20';
    const options = {
    method: 'GET',
};
onMount(async () => {
    const response = await fetch(url, options);
    if (response.ok){
      datos = await response.json();
      console.log("API response:", datos.result.records);
      const pastel = datos.result.records.map(item => ({
      name: item.Animal,
      y: item["Total#Impounded"],
    }));
    console.log(pastel);
    
    // Chart options
    Highcharts.chart("chart-container",{
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Animal Pound Statistics',
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
          name: 'Impounded',
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