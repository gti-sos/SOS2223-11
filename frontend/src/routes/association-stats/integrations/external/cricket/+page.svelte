<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import { dev } from "$app/environment";
  import { Container } from "sveltestrap";

  let API = "/api/v2/association-stats";

if (dev) API = "http://localhost:12345" + API;

  const url =
    API + "/proxy";

  let data;


  onMount(async () => {
    const response = await fetch(url);

    if (response.ok) {
      data = await response.json();

      const chartData = data.rank.map((player) => ({
        name: player.name,
        country: player.country,
        rating: parseInt(player.rating),
      }));

      const chartConfig = {
        chart: {
          type: "areaspline", // Set the chart type to line in a polar-like chart
        },
        title: {
          text: "Puntuaciones de bateadores por el Consejo Internacional de Cricket",
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
        },
        xAxis: {
          categories: chartData.map((player) => player.name),
          tickmarkPlacement: "on",
          lineWidth: 0,
        },
        yAxis: {
          title: {
            text: "Puntuación",
          },
        },
        series: [
          {
            name: "Puntuación",
            data: chartData.map((player) => player.rating),
            pointPlacement: "on", // Place the data points evenly on the circular axis
          },
        ],
      };

      Highcharts.chart("chart-container", chartConfig);
    } else {
      console.error("Error retrieving data:", response.status);
    }
  });
</script>

<svelte:head>
    <title>Gráfica externa cricket</title>
</svelte:head>

<Container>
  <div class="my-3">
    <h2>Puntuaciones de bateadores por el Consejo Internacional de Cricket</h2>
  </div>
  <div id="chart-container" style="min-width: 400px; height: 400px;" />
</Container>
