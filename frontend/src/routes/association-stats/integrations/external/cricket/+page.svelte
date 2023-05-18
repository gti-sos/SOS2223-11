<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import { Container } from "sveltestrap";

  const url =
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen?formatType=test";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "eeee45067bmshf7bbc170a86dc03p16d26ajsncd5a1d1d6357",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  let data;

  onMount(async () => {
    const response = await fetch(url, options);

    if (response.ok) {
      data = await response.json();
      console.log("API response:", data);

      const chartData = data.rank.map((player) => ({
        name: player.name,
        country: player.country,
        rating: parseInt(player.rating),
      }));
      console.log("ChartData:", chartData);

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
    <title>Gráfica externa Cricket</title>
</svelte:head>

<Container>
  <div class="my-3">
    <h2>Puntuaciones de bateadores por el Consejo Internacional de Cricket</h2>
  </div>
  <div id="chart-container" style="min-width: 400px; height: 400px;" />
</Container>
