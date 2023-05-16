<script>
import { onMount } from 'svelte';
import { dev } from "$app/environment";
import * as echarts from 'echarts';
let zillow;
const url = 'https://zillow56.p.rapidapi.com/search?location=houston%2C%20tx';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1e90c527d0mshfca2d1059414c55p12d357jsn99957525500d',
    'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
  }
};
onMount(async () =>{
    const response = await fetch(url,options);
    if (response.ok){
        zillow = await response.json();
        console.log("API response:", data);
    }
})
let habitable = zillow.;
</script>