<script>
  import { onMount } from "svelte";
  import { Container } from "sveltestrap";

  const url = 'https://flight-data4.p.rapidapi.com/get_airline_flights';
  const requestOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
      'X-RapidAPI-Host': 'flight-data4.p.rapidapi.com',
    },
  };

  let data = [];

  onMount(async () => {
    let Plotly = await import("plotly.js-basic-dist");
    const response = await fetch(`${url}?airline=SIA`, requestOptions);

    if (response.ok) {
      data = await response.json();
      console.log(data);

      const chartData = data.slice(0, 10).map((flight) => ({
        x: flight.arrival,
        y: parseInt(flight.groundspeed),
      }));

      const labelsData = chartData.map((flight) => flight.x);
      const seriesData = chartData.map((flight) => flight.y);

      const plotData = [{
        values: seriesData,
        labels: labelsData,
        type: 'pie',
        textinfo: 'value',
        hoverinfo: 'label+percent',
        marker: {
          colors: [
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#ff00ff',
          ],
        },
      }];

      const layout = {
        title: 'Velocidad en tierra de vuelos de SIA',
      };

      Plotly.newPlot('pieChart', plotData, layout);
    }
  });
</script>

<svelte:head>
  <title>Velocidad en tierra de vuelos de SIA</title>
</svelte:head>

<Container>
  <div id="pieChart"></div>
</Container>

<style>
  #pieChart {
    margin: 0 auto;
    width: 100%;
    height: 400px;
  }
</style>
