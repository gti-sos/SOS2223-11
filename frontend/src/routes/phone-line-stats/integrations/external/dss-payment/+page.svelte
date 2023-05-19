<script>
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';
    
    let chart;
    let chartContainer;
    let datos;
    const url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=80848a76-6529-434e-8f77-e4cf71c3dab9&limit=10';
    const options = {
    method: 'GET',
};
onMount(async () => {
    const response = await fetch(url, options);
    if (response.ok){
        datos = await response.json();
      console.log("API response:", datos.result.records);
    }
});

</script>