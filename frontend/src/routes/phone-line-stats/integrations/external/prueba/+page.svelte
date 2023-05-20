<script>
  import { onMount } from 'svelte';
    import * as echarts from 'echarts';
    let chart;
    let chartContainer;
    let patata = ["J.Vardy", "P.Aubumeyang"];
    let leyenda = [
        {
            value: [19,4,16,35,15],
            name: "J.Vardy" 
        },
        {
            value:[17,1,20,27,14],
            name: "P.Aubumeyang"
        }
    ]
    onMount(async () =>{
      let chartOptions  = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: patata
  },
  radar: {
     shape: 'circle',
    indicator: [
            { name: 'Goals', max: 20 },
            { name: 'Assists', max: 20 },
            { name: 'Key Passes', max: 20 },
            { name: 'Shots on Target', max: 40 },
            { name: 'Successful Dribbles', max: 20 }
          ],
  },
  series: [
    {
      name: 'Football_players statistics',
      type: 'radar',
      data: leyenda
    }
  ]
}
chart = echarts.init(chartContainer);
chart.setOption(chartOptions);

    })
</script>

<div class="chart-container" bind:this={chartContainer}></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style>
