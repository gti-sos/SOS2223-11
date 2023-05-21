<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";
    import { dev } from "$app/environment";
    import Highcharts from "highcharts";
  
    let API_associations = "/api/v2/association-stats";
    let API_phones = "/api/v2/phone-line-stats";
    let API_projection = "/api/v2/projection-homes-stats";
  
    if (dev) {
      API_associations = "http://localhost:12345" + API_associations;
      API_phones = "http://localhost:12345" + API_phones;
      API_projection = "http://localhost:12345" + API_projection;
    }
  
    let associations = [];
    let phones = [];
    let projection = [];
  
    onMount(async () => {
      await getAssociations();
      await getPhones();
      await getProjection();
      createChart();
    });
  
    async function getAssociations() {
      const res = await fetch(API_associations, {
        method: "GET",
      });
      try {
        const data = await res.json();
        associations = data.map((item) => ({
          x: item.registration_date,
          y: item.province.toLowerCase().replace(/[\u0300-\u036f]/g, ""),
          name: item.name,
        }));
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
    }
  
    async function getPhones() {
      const res = await fetch(API_phones, {
        method: "GET",
      });
      try {
        const data = await res.json();
        phones = data.map((item) => ({
          x: item.year,
          y: item.province.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          name: "Teléfono fijo: " + item.landline,
        }));
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
    }
  
    async function getProjection() {
      const res = await fetch(API_projection, {
        method: "GET",
      });
      try {
        const data = await res.json();
        projection = data.map((item) => ({
          x: item.year,
          y: item.province.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          name: "Pareja con hijos: " + item.couple_children,
        }));
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
    }
  
    function createChart() {
  const provinces = ["malaga", "cadiz", "sevilla", "huelva", "granada", "cordoba", "jaen", "almeria"];

  const processedAssociations = provinces.map((province) => {
    const provinceAssociations = associations.filter((item) => item.y === province);
    return provinceAssociations.map((item) => ({
      x: provinces.indexOf(province),
      y: 1, // Set y-value to 1 for all data points
      originalY: item.x, // Store the original y-value for the tooltip
      name: item.name,
    }));
  }).flat();

  const processedPhones = provinces.map((province) => {
    const provincePhones = phones.filter((item) => item.y === province);
    return provincePhones.map((item) => ({
      x: provinces.indexOf(province),
      y: 1, // Set y-value to 1 for all data points
      originalY: item.x, // Store the original y-value for the tooltip
      name: item.name,
    }));
  }).flat();

  const processedProjection = provinces.map((province) => {
    const provinceProjection = projection.filter((item) => item.y === province);
    return provinceProjection.map((item) => ({
      x: provinces.indexOf(province),
      y: 1, // Set y-value to 1 for all data points
      originalY: item.x, // Store the original y-value for the tooltip
      name: item.name,
    }));
  }).flat();

  Highcharts.chart("chart-container", {
    chart: {
      type: "column",
    },
    title: {
      text: "Gráfica grupal",
    },
    xAxis: {
      categories: provinces,
      title: {
        text: "Provincia",
      },
    },
    yAxis: {
      title: {
        text: "Cantidad",
      },
    //   min: 1950,
    //   max: 2050,
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: "Asociaciones",
        data: processedAssociations,
        tooltip: {
          pointFormatter: function () {
            return this.name + "<br>Año de registro: " + this.originalY; // Show the original y-value in the tooltip
          }
        }
      },
      {
        name: "Líneas de teléfono",
        data: processedPhones,
        tooltip: {
          pointFormatter: function () {
            return this.name + "<br>Año: " + this.originalY; // Show the original y-value in the tooltip
          }
        }
      },
      {
        name: "Proyección de hogares",
        data: processedProjection,
        tooltip: {
          pointFormatter: function () {
            return this.name + "<br>Año: " + this.originalY; // Show the original y-value in the tooltip
          }
        }
      },
    ],
  });
}

  </script>

  
  <Container>
    <div class="my-3">
    </div>
    <div id="chart-container" />
  </Container>
  