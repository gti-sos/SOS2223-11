<script>
import { onMount } from 'svelte';
import { dev } from "$app/environment";
import * as echarts from 'echarts';
let furbo =[];
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
//Usar grafico de radar para varias estadisticas
onMount(async () =>{
    const response = await fetch(url,options);
    if (response.ok){
        furbo = await response.json();
        //console.log("API response:", data);
        console.log(furbo.response[0].statistics[0]);
        patata = furbo.response.map(furbolista => ({
            name: furbolista.player.name,
            data: filterData(furbolista.statistics[0])
        }));
      }
    
   let charOptions  = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
            { name: 'Goals', max: 40 },
            { name: 'Assists', max: 25 },
            { name: 'Key Passes', max: 50 },
            { name: 'Shots on Target', max: 60 },
            { name: 'Successful Dribbles', max: 30 }
          ],
  },
  series: [
    {
      name: 'Football_players statistics',
      type: 'radar',
      data: patata
    }
  ]
}
});
function filterData(estadisticas){
  let goles = estadisticas["goals"].total;
  let asistencias = estadisticas["goals"].assists;
  let keyPass = estadisticas["passes"].key;
  let shots_on_target = estadisticas["shots"].on;
  let successful_driblles = estadisticas["dribbles"].success
  let result = [goles,asistencias,keyPass,shots_on_target,successful_driblles];
  console.log(result)  

}
</script>
<div class="chart-container" bind:this={chartContainer}></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style>