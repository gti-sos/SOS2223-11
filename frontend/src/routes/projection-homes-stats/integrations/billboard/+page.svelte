<script>

  // Importaciones

  import { onMount } from "svelte";

  import { dev } from "$app/environment";

  import bb, {areaStep} from "billboard.js";

  let API = "/api/v2/projection-homes-stats";

  if (dev) 
  
      API = "http://localhost:12345" + API;

  // Variables

  let projection = [];
  let province = [];
  let year = [];
  let couple_children = [];
  let couple_nochildren = [];
  let single_parent = [];
  let yAxisMinValue = null;
  let yAxisMaxValue = null;

   // Mostrar resultados

   let result = "";

   let resultStatus = "";

  // Obtener proyecciones

  onMount(async () => {

    getProjection();

  });

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

    projection.forEach((project) => {

      if (project.year >= 2002 && project.year <= 2005) {
                
                province.push(project.province);
                couple_children.push(project.couple_children);
                couple_nochildren.push(project.couple_nochildren);
                single_parent.push(project.single_parent);
      }
            });

    loadGraph(projection);

  } 

  catch (error) {

    console.log(`Error parseando el resultado: ${error}`);

  }

  const status = await res.status;

  resultStatus = status;

  }

  // Cargar gráfica

  function loadGraph() {

    // Calcular suma de datos para cada provincia
  const provinceData = {};
  projection.forEach((project) => {
    if (project.year >= 2002 && project.year <= 2005) {
      const province = project.province;
      if (!provinceData[province]) {
        provinceData[province] = {
          province,
          couple_children: 0,
          couple_nochildren: 0,
          single_parent: 0,
        };
      }
      provinceData[province].couple_children += project.couple_children;
      provinceData[province].couple_nochildren += project.couple_nochildren;
      provinceData[province].single_parent += project.single_parent;
    }
  });

  // Extraer los datos de las provincias calculadas
  const provinces = Object.values(provinceData);

  const columns = [
    ["x", ...provinces.map((province) => province.province)],
    ["Familia con hijos", ...provinces.map((province) => province.couple_children)],
    ["Familia sin hijos", ...provinces.map((province) => province.couple_nochildren)],
    ["Personas solteras", ...provinces.map((province) => province.single_parent)],
  ];

  bb.generate({
    bindto: "#chart-container",
    data: {
      x: "x",
      columns,
      type: areaStep(),
      labels: true,
    },
    axis: {
      x: {
        type: "category",
      },
      y: {
        label: {
          text: "Cantidad",
          position: "outer-middle",
        },
        min: yAxisMinValue, // Valor mínimo del eje y
        max: yAxisMaxValue, // Valor máximo del eje y
      },
    },
    title: {
      text: "Proyección de hogares por provincia (2002-2005)",
    },
    legend: {
      show: true,
    },
    tooltip: {
      show: true,
    },
    interaction: {
      enabled: true,
    },
  });
}

// Función para manejar el cambio en el menú desplegable del eje y
function handleYAxisRangeChange(event) {
  const [minValue, maxValue] = event.target.value.split(",");
  adjustYAxisRange(parseFloat(minValue), parseFloat(maxValue));
}

  // Función para ajustar el rango del eje y
  function adjustYAxisRange(minValue, maxValue) {
  yAxisMinValue = minValue;
  yAxisMaxValue = maxValue;
  loadGraph();
}


    
</script>

<div class="dropdown-container">
  <select class="dropdown" on:change={handleYAxisRangeChange}>
    <option value="null,null">Restablecer</option>
    <option value="0,1000000">De 0 a 1M</option>
    <option value="1000000,5000000">De 1M a 5M</option>
    <option value="5000000,10000000">De 5M a 10M</option>
    <option value="10000000,15000000">De 10M a 15M</option>
  </select>
</div>

<style>

#chart-container {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dropdown-container {
    text-align: right;
    margin-bottom: 20px;
  }

  .dropdown {
    padding: 12px 20px;
    border-radius: 4px;
    border: 1px solid #999;
    background-color: #f5f5f5;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s;
  }

  .dropdown:focus {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    background-color: #e8e8e8;
  }



</style>
    <svelte:head>

            <script src="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.js"></script>
            <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.css">

    </svelte:head>

    
    
    <main>
        
        <div id="chart-container" align="center"></div>
        <br><br>
    </main>


























  