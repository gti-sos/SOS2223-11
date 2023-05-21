<script>
  import { onMount } from "svelte";
  import { Container } from "sveltestrap";

  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  let data;

  onMount(async () => {
    let Plotly = await import("plotly.js-basic-dist");
    const response = await fetch(url, options);

    if (response.ok) {
      data = await response.json();
      const chartData = data.slice(0, 20).map((movie) => ({
        x: movie.title,
        y: parseInt(movie.rank)
      }));

      const layout = {
        title: 'Top 20 Películas de IMDB',
        xaxis: {
          tickangle: -45,
          automargin: true,
          tickfont: {
            size: 12
          }
        },
        yaxis: {
          title: 'Ranking'
        }
      };

      const trace = {
        x: chartData.map((movie) => movie.x),
        y: chartData.map((movie) => movie.y),
        type: 'bar'
      };

      const plotData = [trace];

      Plotly.newPlot('barChart', plotData, layout);
    }
  });
</script>

<svelte:head>
  <title>Top 20 Películas de IMDB</title>
</svelte:head>

<Container>
  <div id="barChart"></div>
</Container>

<style>
  #barChart {
    width: 100%;
    height: 400px;
  }
</style>
