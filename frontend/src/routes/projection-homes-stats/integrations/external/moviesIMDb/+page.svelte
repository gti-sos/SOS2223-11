<script>

import { onMount } from "svelte";
import ApexCharts from 'apexcharts';
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
    const response = await fetch(url, options);

    if (response.ok) {
      data = await response.json();
      const chartData = data.slice(0, 20) // Obtener solo los 20 primeros elementos
        .map((movie) => ({
          x: movie.title,
          y: parseInt(movie.rank),
      }));

      const options = {
        chart: {
          type: 'bar',
          height: 400
        },
        series: [
          {
            data: chartData
          }
        ],
        xaxis: {
          categories: chartData.map((movie) => movie.x),
          labels: {
            rotate: -45,
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Ranking'
          }
        },
        title: {
          text: 'Top 20 Películas de IMDB',
          align: 'center',
          style: {
            fontSize: '18px'
          }
        },
        tooltip: {
          enabled: true
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        }
      };

      const chart = new ApexCharts(document.querySelector("#barChart"), options);
      chart.render();
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
    height: 100px;
  }
</style>














