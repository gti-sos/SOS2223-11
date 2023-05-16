<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";
  
    const url = "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen?formatType=test";
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
  
        Highcharts.chart("chart-container", {
          chart: {
            type: "column",
          },
          title: {
            text: "ICC Test Batsmen Rankings",
          },
          xAxis: {
            categories: chartData.map((player) => player.name),
          },
          yAxis: {
            title: {
              text: "Rating",
            },
          },
          series: [
            {
              name: "Rating",
              data: chartData.map((player) => player.rating),
            },
          ],
        });
      } else {
        console.error("Error retrieving data:", response.status);
      }
    });
  </script>
  
  <div id="chart-container" style="min-width: 400px; height: 400px;"></div>
  