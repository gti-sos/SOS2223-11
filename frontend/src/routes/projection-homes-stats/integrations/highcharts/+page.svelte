<script>
  
  // Importaciones

  import { onMount } from "svelte";

  import Highcharts from "highcharts/highcharts";

  import { dev } from "$app/environment";

  let API = "/api/v2/projection-homes-stats";

  onMount(async () => {

      getProjection();

  });

  if (dev) 
  
      API = "http://localhost:12345" + API;

  // Variables

  let projection = [];

  // Mostrar resultados

  let result = "";
  let resultStatus = "";

  // Obtener proyecciones

  async function getProjection() {

      resultStatus = result = "";

      const res = await fetch(API, {

          method: "GET",

      });

      try {

          const data = await res.json();

          result = JSON.stringify(data, null, 2);

          projection = data;

          loadChart(projection);

      } 
      
      catch (error) {

          console.log(`Error parseando el resultado: ${error}`);

      }

      const status = await res.status;

      resultStatus = status;

  }

  // Crear la gráfica

  async function loadChart(projection) {

      var colors = Highcharts.getOptions().colors;

      var provinces = [
          "Sevilla",
          "Málaga",
          "Jaén",
          "Huelva",
          "Granada",
          "Córdoba",
          "Cádiz",
          "Almería"
      ];

      var tipo = ["Parejas con hijos/as", "Parejas sin hijos/as"];

      // Cálculo de longitud

      var longitud = 0;

      var result = [];

      for (i = 0; i < projection.length; i += 1) {

          longitud +=

              projection[i].couple_children +
              projection[i].couple_nochildren +
              projection[i].single_parent;

      }

      provinces.forEach((provincia) => {

          // Filtrar los datos por categoria

          const provinceData = projection.filter(
              (d) => d.province === provincia
          );

          // Calcular la suma de todas las personas

          const coupleChildren = provinceData.reduce(
              (acc, d) => acc + d.couple_children,
              0
          );

          const coupleNoChildren = provinceData.reduce(
              (acc, d) => acc + d.couple_nochildren,
              0
          );

          const sum = coupleChildren + coupleNoChildren;

          // Agregar la categoría y las sumas al array

          result.push({
              province: provincia,
              porcentaje: Number(
                  ((sum / longitud) * 100).toFixed(1)
              ),
              total: sum,
              tipo: [coupleChildren, coupleNoChildren],
          });
      });

      var browserData = [];
      var versionsData = [];
      var i;
      var j;
      var dataLength = result.length;
      var drillDataLen;
      var brightness;

      for (i = 0; i < dataLength; i += 1) {

          browserData.push({
              name: provinces[i],
              y: result[i].porcentaje,
              color: colors[i],
          });

          for (j = 0; j < 3; j += 1) {
              brightness = 0.8 - j / 3 / 5;
              versionsData.push({
                  name: tipo[j],
                  y: Number(
                      (
                          (result[i].porcentaje * result[i].tipo[j]) /
                          result[i].total
                      ).toFixed(1)
                  ),
                  color: colors[i],
              });
          }
      }

      Highcharts.chart("container", {

          chart: {
              type: "pie",
          },

          title: {
              text: "Proyección de hogares sobre parejas (2002 - 2010)",
              align: "center",
              browserData,
          },
    
          plotOptions: {
              pie: {
                  shadow: true,
                  center: ["50%", "50%"],
              },
          },

          tooltip: {
              valueSuffix: "%",
          },

          series: [
              {
                  name: "Porcentaje Total",
                  data: browserData,
                  size: "100%",
                  dataLabels: {
                      formatter: function () {
                          return this.y > 5 ? this.point.name : null;
                      },
                      color: "#ffffff",
                      distance: -40,
                  },
              },
              {
                  name: "Porcentaje",
                  data: versionsData,
                  size: "80%",
                  innerSize: "60%",
                  dataLabels: {
                      formatter: function () {
                          return this.y > 1
                              ? "<b>" +
                                    this.point.name +
                                    ":</b> " +
                                    this.y +
                                    "%"
                              : null;
                      },
                  },
                  id: "versions",
              },
          ],
          responsive: {
              rules: [
                  {
                      condition: {
                          maxWidth: 300,
                      },
                      chartOptions: {
                          series: [
                              {},
                              {
                                  id: "versions",
                                  dataLabels: {
                                      enabled: true,
                                  },
                              },
                          ],
                      },
                  },
              ],
          },
      });
  }
</script>

<svelte:head>
 
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</svelte:head>

<main>
  <figure class="highcharts-figure">
      <div id="container" />
  </figure>
  <figure class="highcharts-figure">
      <div id="mychart" />
  </figure>
</main>