
<script>
import { onMount } from 'svelte';
import * as echarts from 'echarts';

let furbo =[];
let chart;
const url = 'https://api-football-beta.p.rapidapi.com/players/topscorers?season=2019&league=39';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1e90c527d0mshfca2d1059414c55p12d357jsn99957525500d',
    'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
  }
};
let chartContainer;
let patata = [];
let leyenda
onMount(async () =>{
    const response = await fetch(url,options);
    if (response.ok){
        furbo = await response.json();
        console.log("API response:", furbo);
        console.log(furbo.response[0].statistics[0]);
        patata = furbo.response.slice(0,5).map(furbolista => ({
            name: furbolista.player.name,
            value: filterData(furbolista.statistics[0])
        }));
      console.log(patata)
      leyenda = furbo.response.slice(0,5).map(furbolista => furbolista.player.name)
      console.log(leyenda)
      }
    
   let chartOptions  = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: leyenda
  },
  radar: {
     shape: 'circle',
    indicator: [
            { name: 'Goles', max: 30 },
            { name: 'Asistencias', max: 17 },
            { name: 'Pases Clave', max: 65 },
            { name: 'Disparos a porteria', max: 60 },
            { name: 'Regates con Exito', max: 60 }
          ],
  },
  series: [
    {
      name: 'Estadisticas de jugadores de futbol',
      type: 'radar',
      data: patata
    }
  ]
}
chart = echarts.init(chartContainer);
chart.setOption(chartOptions);
});
function filterData(estadisticas){
  let goles = estadisticas["goals"].total;
  let asistencias = estadisticas["goals"].assists;
  let keyPass = estadisticas["passes"].key;
  let shots_on_target = estadisticas["shots"].on;
  let successful_driblles = estadisticas["dribbles"].success
  let result = [goles,asistencias,keyPass,shots_on_target,successful_driblles];
  return result;

}
</script>
<div class="chart-container" bind:this={chartContainer}></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style> 
