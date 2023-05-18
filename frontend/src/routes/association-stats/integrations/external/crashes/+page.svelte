<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

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
      console.log("API response:", data);

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
        console.log("average: " + average);
        return [key, parseFloat(average.toFixed(2))];
      });
      console.log("seriesdata " + seriesData);

      const chartConfig = {
        chart: {
          type: "line",
        },
        title: {
          text: "Average Speed Limit in crashes by Month and Year (Australia)",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "Average Speed Limit",
          },
        },
        series: [
          {
            name: "Average Speed Limit",
            data: seriesData,
          },
        ],
      };

      Highcharts.chart("chart-container", chartConfig);
    } else {
      console.error("Error retrieving data:", response.status);
    }
  });
</script>

<div id="chart-container" style="min-width: 400px; height: 400px;"></div>
