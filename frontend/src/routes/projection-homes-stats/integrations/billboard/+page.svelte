<script>

    // Importaciones

    import { onMount } from "svelte";

    import { dev } from "$app/environment";

    //import { Button, Container } from "sveltestrap";

    import billboard from 'billboard.js';

    let API = "/api/v2/projection-homes-stats";

    if (dev) 
    
        API = "https://sos2223-11.ew.r.appspot.com" + API;

    // Variables globales

    let projection = [];

    let result = "";

    let resultStatus = "";

    onMount(async () => {

        getProjection();

    });

    // Obtener las proyecciones
    
    async function getProjection() {

        resultStatus = result = "";

        const res = await fetch(API, {

            method: "GET",

        });

        try {

            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            projection = data;

        } 
        
        catch (error) {

            console.log(`Error parseando el resultado: ${error}`);

        }

        const status = await res.status;

        resultStatus = status;

    }

    // Ordenar los datos

    function mapAndOrder(arr) {

        const result = arr.reduce((acc, obj) => {

            acc[obj.name] = obj.creation_date;

            return acc;

        }, {});


        return Object.fromEntries(

            Object.entries(result).sort((a, b) => a[1] - b[1])

        );
    }

    // Dibujar la gráfica

    let chart;
    
    function drawChart(data) {

    // Convertir cada dato en un array de datos

    const values = Object.values(data);

      chart = billboard.generate({

      bindto: '#chart',

      data: {

        columns: [
          values
        ],

        type: 'donut',

      },

      donut: {
        title: "Title of the chart",
      },

      axis: {

        x: {
          label: 'Tipo de Proyección De Hogar',
          type: 'category',
          categories: Object.keys(data),
        },

        y: {
          label: 'Recuento de proyecciones de hogares por año',
        },

      },
    });
  };

</script>

<style>
  #chart {
    height: 300px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>

<h1>Proyecciones de hogares por año</h1>

<div id="chart"></div>

<button on:click={drawChart(mapAndOrder(projection))}>Ver gráfica</button>
