<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import { Container } from "sveltestrap";

  const url =
    "https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=72d3b563-8b1e-4d48-9df3-a4c2b2ec7ae9&limit=10";
  const options = {
    method: "GET",
  };

  let data;

  onMount(async () => {
    const response = await fetch(url, options);
    if (response.ok) {
      data = await response.json();
      const records = data.result.records;
      const chartData = records.map((record) => {
        const values = Object.entries(record)
          .filter(([key, value]) => key.match(/^\d{4}$/))
          .map(([key, value]) => ({ year: key, value: parseFloat(value) }));

        return {
          Year_Level: record.Year_Level,
          values: values,
        };
      });

      const chartConfig = {
        chart: {
          type: "column",
        },
        title: {
          text: "Estudiantes con discapacidad por año y nivel escolar en Australia",
        },
        xAxis: {
          categories: chartData[0].values.map((item) => item.year),
        },
        yAxis: {
          title: {
            text: "Value",
          },
        },
        series: chartData.map((item) => ({
          name: item.Year_Level,
          data: item.values.map((value) => value.value),
        })),
      };

      Highcharts.chart("chart-container", chartConfig);
    } else {
      console.error("Error retrieving data:", response.status);
    }
  });
</script>

<svelte:head>
  <title>Gráfica externa estudiantes</title>
</svelte:head>

<Container>
  <div class="my-3">
    <h2>Estudiantes con discapacidad por año y nivel escolar en Australia</h2>
  </div>
  <div id="chart-container" style="min-width: 400px; height: 500px;" />
</Container>
