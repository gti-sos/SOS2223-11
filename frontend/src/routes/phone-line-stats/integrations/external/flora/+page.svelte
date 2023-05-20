<script>
 import { onMount } from 'svelte';
 import * as echarts from 'echarts';
let datos
let chartContainer;
let chart;
let chartOptions;
const url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=76ff0443-65c2-404f-8697-a86e3bda5a57';
    const options = {
    method: 'GET',
};
onMount(async () => {
    const response = await fetch(url, options);
    if (response.ok){
      datos = await response.json();
      console.log("API response:", datos.result.records);
   const arreglo = datos.result.records
   const anos = arreglo.map(a => a.Year);
   const pajaros = arreglo.map(a => a.Birds);
   const peces = arreglo.map(a => a.Fish);
   const flora = arreglo.map(a => a.Flora);
   const ranas = arreglo.map(a => a.Frogs);
   const invertebrados = arreglo.map(a => a.Invertebrates);
   const Mamiferos = arreglo.map(a => a.Mammals);
   const reptiles = arreglo.map(a => a.Reptiles)
    console.log(anos);
chartOptions =     {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Flora', 'Invertebrados', 'Pajaros', 'Mamiferos', 'Peces', 'Reptiles', 'Ranas']
      },
      xAxis: {
        type: 'category',
        data: anos
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Flora',
          type: 'bar',
          stack: 'total',
          data: flora
        },
        {
          name: 'Invertebrados',
          type: 'bar',
          stack: 'total',
          data: invertebrados
        },
        {
          name: 'Pajaros',
          type: 'bar',
          stack: 'total',
          data: pajaros
        },
        {
          name: 'Mamiferos',
          type: 'bar',
          stack: 'total',
          data: Mamiferos
        },
        {
          name: 'Peces',
          type: 'bar',
          stack: 'total',
          data: peces
        },
        {
          name: 'Reptiles',
          type: 'bar',
          stack: 'total',
          data: reptiles
        },
        {
          name: 'Ranas',
          type: 'bar',
          stack: 'total',
          data: ranas
        }
      ]
    };

}
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