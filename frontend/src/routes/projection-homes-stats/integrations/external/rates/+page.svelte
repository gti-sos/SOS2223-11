<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";
  
    const url = 'https://interest-rate-by-api-ninjas.p.rapidapi.com/v1/interestrate';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
		'X-RapidAPI-Host': 'interest-rate-by-api-ninjas.p.rapidapi.com'
	}
};
    let data;
  
    onMount(async () => {
        let Plotly = await import("plotly.js-basic-dist");
      const response = await fetch(url, options);
  
      if (response.ok) {
        data = await response.json();
        console.log(data)
        const chartData = data.central_bank_rates.slice(0, 15).map((bank) => ({
            x: bank.central_bank,
        y: parseFloat(bank.rate_pct)
      }));

      const trace = {
        x: chartData.map((bank) => bank.x),
        y: chartData.map((bank) => bank.y),
        fill: 'tozeroy',
        type: 'scatter'
      };

      const layout = {
        title: 'Tasas del Banco Central',
        xaxis: {
          title: 'Banco Central'
        },
        yaxis: {
          title: 'Tasa'
        }
      };

      const plotData = [trace];

      Plotly.newPlot('areaChart', plotData, layout);
    }
  });
</script>

<svelte:head>
  <title>Tasas del Banco Central</title>
</svelte:head>

<Container>
  <div id="areaChart"></div>
</Container>

<style>
  #areaChart {
    width: 100%;
    height: 400px;
  }
</style>
  