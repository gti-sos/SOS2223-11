<script>
  import { onMount } from 'svelte';
  import { dev } from "$app/environment";
  import * as echarts from 'echarts';

  let chart;
  let chartContainer;

  let API = "/api/v2/phone-line-stats";

  if (dev) {
    API = "http://localhost:12345" + API;
  }

  let phones = [];
  let result = "";
  let resultStatus = "";

  onMount(async () => {
    await getPhones();
    createChart();
  });
  async function getPhones() {
    resultStatus = result = "";
    const res = await fetch(API, {
      method: "GET",
    });
    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      phones = data;
      prueba = true;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
  }
  function createChart() {
    const xAxisData = phones.map(phone => `${phone.province}/${phone.year}`);

    const landlineData = phones.map(phone => phone.landline);
    const postPaymentPhoneLineData = phones.map(phone => phone.post_payment_phone_line);
    const wideLandlineData = phones.map(phone => phone.wide_landline);

    const chartOptions = {
      tooltip: {},
      legend: {
        data: ['Telefonia Fija', 'Linea PosPago', 'Telefonia Fija Ancha']
      },
      xAxis: {
        data: xAxisData,
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: 'Value'
      },
      series: [{
        name: 'Telefonia Fija',
        type: 'bar',
        data: landlineData,
        itemStyle: {
          color: '#a6cee3'
        }
      }, {
        name: 'Linea PosPago',
        type: 'bar',
        data: postPaymentPhoneLineData,
        itemStyle: {
          color: '#1f78b4'
        }
      }, {
        name: 'Telefonia Fija Ancha',
        type: 'bar',
        data: wideLandlineData,
        itemStyle: {
          color: '#b2df8a'
        }
      }]
    };
    chart = echarts.init(chartContainer);
    chart.setOption(chartOptions);
  }
</script>

<div class="chart-container" bind:this={chartContainer}></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style>
