<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import { Container } from "sveltestrap";

  const url =
    "https://data.gov.au/data/api/3/action/datastore_search?resource_id=d54f7465-74b8-4fff-8653-37e724d0ebbb&limit=1000";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  let data;

  onMount(async () => {
    const response = await fetch(url, options);

    if (response.ok) {
      data = await response.json();
      const records = data.result.records;

      if (records.length === 0) {
        console.warn("No records found.");
        return;
      }

      // Group records by Month and Year
      const groupedData = {};
      records.forEach((record) => {
        const month = record.Month;
        const year = record.Year;
        const key = `${month}-${year}`;
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(record);
      });

      const categories = Object.keys(groupedData);
      const seriesData = categories.map((key) => {
        const sum = groupedData[key].reduce(
          (acc, record) => acc + parseFloat(record["Speed Limit"]),
          0
        );
        const average = sum / groupedData[key].length;
        return [key, parseFloat(average.toFixed(2))];
      });

      const chartConfig = {
        chart: {
          type: "scatter",
        },
        title: {
          text: "Límite de velocidad medio en accidentes por mes y año en Australia",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "Límite de velocidad medio",
          },
        },
        series: [
          {
            name: "Límite de velocidad medio",
            data: seriesData,
          },
        ],
        tooltip: {
          formatter: function () {
            return `${this.key}<br>Límite de velocidad medio: ${this.y}`;
          },
        },
      };

      Highcharts.chart("chart-container", chartConfig);
    } else {
      console.error("Error retrieving data:", response.status);
    }
  });
</script>

<svelte:head>
  <title>Gráfica externa accidentes</title>
</svelte:head>

<Container>
  <div class="my-3">
    <h2>Límite de velocidad medio en accidentes por mes y año en Australia</h2>
  </div>
  <div id="chart-container" style="min-width: 400px; height: 500px;" />
</Container>
