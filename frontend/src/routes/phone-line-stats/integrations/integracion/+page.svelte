<script>
 import { onMount } from 'svelte';
  import { dev } from "$app/environment";
  import * as echarts from 'echarts';
   
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
let chartOptions ;

});
</script>