<script>
import { onMount } from 'svelte';
import { dev } from "$app/environment";
import * as echarts from 'echarts';

const url ="https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=63125b11-54a3-4ed4-9a39-d2de49ee17dc&limit=20";
    const options = {
      method: "GET",
      dataType: "jsonp",
    };
let data;
let chartData;
    onMount(async () => {
      const response = await fetch(url, options);
  
      if (response.ok) {
        data = await response.json();
        console.log("API response:", data);
        const jsonData = JSON.stringify(chartData, null, 2);
      const dataBlob = new Blob([jsonData], { type: "application/json" });
      const dataUrl = URL.createObjectURL(dataBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "chartData.json";
      downloadLink.textContent = "Download JSON";
      document.body.appendChild(downloadLink);
      }
    });

</script>