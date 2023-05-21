<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";
    import bb, { bar } from 'billboard.js';
  
    const url = 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Bratislava&country_name=Slovakia';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
      }
    };
  
    let data;
  
    onMount(async () => {
      const response = await fetch(url, options);
  
      if (response.ok) {
        data = await response.json();
        console.log(data);
        const chartData = data.prices.slice(35, 40).map((cost) => ({
          x: cost.item_name,
          y: parseFloat(cost.min)
        }));
  
        const chart = bb.generate({
          bindto: '#columnChart',
          data: {
            columns: [
              ['Precio Mínimo', ...chartData.map((cost) => cost.y)]
            ],
            type: bar(),
            labels: true
          },
          bar: {
            width: {
              ratio: 0.8 // Ajustar el ancho de las barras
            }
          },
          axis: {
            x: {
              type: 'category',
              categories: chartData.map((cost) => cost.x),
              tick: {
                centered: true // Centrar las etiquetas del eje X
              }
            },
            y: {
              label: {
                text: 'Cantidad',
                position: 'outer-middle'
              },
              tick: {
                format: function (d) {
                  return d;
                }
              },
              max: Math.ceil(Math.max(...chartData.map((cost) => cost.y)) / 1000) * 1000
            }
          },
          tooltip: {
            format: {
              value: function (value) {
                return (value).toFixed(2);
              }
            }
          },
          title: {
            text: 'Precio Mínimo en Bratislava'
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
          padding: {
            bottom: 20 // Ajustar el espacio inferior del gráfico
          }
        });
  
        chart.resize();
      }
    });
  </script>
  
  <svelte:head>
    <title>Precio Mínimo en Bratislava</title>
  </svelte:head>
  
  <Container>
    <div id="columnChart"></div>
  </Container>
  
  <style>
    #columnChart {
      width: 100%;
      height: 400px;
    }
  </style>
  