<script>
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { dev } from "$app/environment";
  import { Container } from "sveltestrap";

  let API = "/api/v2/association-stats";

  if (dev) API = "http://localhost:12345" + API;

  const url = API + "/proxy";

  let data;

  onMount(async () => {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      const records = data.result.records;
      if (records.length === 0) {
        console.warn("No records found.");
        return;
      }

      const chartData = records.map((record) => ({
        name: record.Month,
        value: parseFloat(record.Passenger_Trips),
      }));

      const chartConfig = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "Viajes con pasajeros",
            type: "pie",
            radius: "50%",
            data: chartData,
          },
        ],
      };

      const chartContainer = document.getElementById("chart-container");
      const chart = echarts.init(chartContainer);
      chart.setOption(chartConfig);
    } else {
      console.error("Error retrieving data:", response.status);
    }
  });
</script>

<svelte:head>
  <title>Gráfica externa aerolíneas</title>
</svelte:head>

<Container>
  <div class="mt-3">
    <h2>Vuelos de aerolíneas domésticas por mes y año en Australia</h2>
  </div>
  <div id="chart-container" style="min-width: 800px; height: 800px;" />
</Container>
