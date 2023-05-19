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
     
    }
});
</script>