<script>
import { onMount } from 'svelte';
import { dev } from "$app/environment";
import * as echarts from 'echarts';
let furbo;
const url = 'https://api-football-beta.p.rapidapi.com/players/topscorers?season=2019&league=39';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1e90c527d0mshfca2d1059414c55p12d357jsn99957525500d',
    'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
  }
};
//Usar grafico de radar para varias estadisticas
onMount(async () =>{
    const response = await fetch(url,options);
    if (response.ok){
        furbo = await response.json();
        //console.log("API response:", data);
        console.log(furbo);
    }
})
let algo = furbo;
</script>
        