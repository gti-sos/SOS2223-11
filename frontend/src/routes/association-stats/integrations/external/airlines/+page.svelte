<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";
  
    const url =
      "https://data.gov.au/data/api/3/action/datastore_search?resource_id=c8c5774c-bfbc-498b-83b6-154a6545b1ca&limit=20";
    const options = {
      method: "GET",
      dataType: "jsonp",
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
  
        const chartData = {
          categories: records.map((record) => record.Month),
          seriesData: records.map((record) => parseFloat(record.Passenger_Trips)),
        };
  
        const chartConfig = {
          chart: {
            type: "scatter",
          },
          title: {
            text: "Domestic Australian Airlines Flights by Month and Year",
          },
          xAxis: {
            categories: chartData.categories,
          },
          yAxis: {
            title: {
              text: "Passenger Trips",
            },
          },
          series: [
            {
              name: "Passenger Trips",
              data: chartData.seriesData,
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
  