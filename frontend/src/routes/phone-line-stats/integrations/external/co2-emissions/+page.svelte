<script>
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';
    
    let chart;
    let chartContainer;
    let datos;
    let anos; 
    let valores;
    const url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=7c13f590-a4c6-415c-af4d-9a8e982a0578&limit=15';
    const options = {
    method: 'GET',
};
onMount(async () => {
    const response = await fetch(url, options);
    if (response.ok){
        datos = await response.json();
      console.log("API response:", datos.result.records);
      anos = datos.result.records.map(e => e.Year)
      valores = datos.result.records.map(e=>e["CO2e emissions (tonnes per capita)"])
      console.log(valores);
    }
    let chartOptions = {
  xAxis: {
    type: 'category',
    data: anos
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: valores,
      type: 'line',
      smooth: true
    }
  ]
};
chart = echarts.init(chartContainer);
chart.setOption(chartOptions);
});
</script>

<div class="chart-container" bind:this={chartContainer}></div>

<style>
    .chart-container {
      width: 100%;
      height: 500px;
    }
  </style>