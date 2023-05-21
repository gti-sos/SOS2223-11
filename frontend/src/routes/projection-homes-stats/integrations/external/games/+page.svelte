<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";
    import bb, { spline } from 'billboard.js';
  
    const url = 'https://csgo-matches-and-tournaments.p.rapidapi.com/matches?page=1&limit=10';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
        'X-RapidAPI-Host': 'csgo-matches-and-tournaments.p.rapidapi.com'
      }
    };

    let data;
  
    onMount(async () => {
      const response = await fetch(url, options);
  
      if (response.ok) {
        data = await response.json();
        console.log(data);
        const chartData = data.data.slice(0, 10).map((game) => ({
          x: game.team_lose.title,
          y: Math.max(parseInt(game.score_lose), 0)
        }));
  
        const chart = bb.generate({
          bindto: '#splineChart',
          data: {
            columns: [
              ['Puntuación equipo perdedores', ...chartData.map((game) => game.y)]
            ],
            type: spline(),
            labels: true
          },
          axis: {
            x: {
              type: 'category',
              categories: chartData.map((game) => game.x)
            },
            y: {
              label: {
                text: 'Puntuación',
                position: 'outer-middle'
              },
              tick: {
                format: function (value) {
                  if (value >= 0) {
                    return value.toFixed(0);
                  } else {
                    return '';
                  }
                }
              }
            }
          },
          tooltip: {
            format: {
              value: function (value) {
                return value.toFixed(0);
              }
            }
          },
          title: {
            text: 'Puntuación de los perdedores en equipos de CS:GO'
          },
          legend: {
            position: 'right',
            inset: {
              anchor: 'top-right',
              x: 10,
              y: 10,
              step: 2
            }
          },
        });
  
        chart.resize();
      }
    });
  </script>
  
  <svelte:head>
    <title>Score Won in CS:GO Matches</title>
  </svelte:head>
  
  <Container>
    <div id="splineChart"></div>
  </Container>
  
  <style>
    #splineChart {
      width: 100%;
      height: 400px;
    }
  </style>
  