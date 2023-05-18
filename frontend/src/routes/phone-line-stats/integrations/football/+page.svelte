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
        console.log(furbo.response);
        patata = furbo.response.map(furbolista => ({
            name: furbolista.player.name
            data: furbolista.statistics.map(elem =>())
        }));
      }
    
   let options  = {
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
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
}
});
</script>
<div class="chart-container" bind:this={chartContainer}></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style>