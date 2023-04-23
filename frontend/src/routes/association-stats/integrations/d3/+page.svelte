<script>
    import { onMount } from "svelte";
    // import { dev } from "$app/environment";
    import { Button, Container } from "sveltestrap";
    import * as d3 from "d3";
  
    let API = "/api/v2/association-stats";
  
    // if (dev) API = "http://localhost:12345" + API;
  
    let associations = [];
  
    let result = "";
    let resultStatus = "";
  
    onMount(async () => {
      getAssociations();
    });
  
    async function getAssociations() {
      resultStatus = result = "";
      const res = await fetch(API, {
        method: "GET",
      });
      try {
        const data = await res.json();
        result = JSON.stringify(data, null, 2);
        associations = data;
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
    }
  
    function mapAndOrder(arr) {
      const result = arr.reduce((acc, obj) => {
        acc[obj.name] = obj.creation_date;
        return acc;
      }, {});
  
      return Object.fromEntries(
        Object.entries(result).sort((a, b) => a[1] - b[0])
      );
    }
  
    function createChart(data) {
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
  
      const svg = d3
        .select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(Object.keys(data))
        .padding(0.1);
  
      const y = d3.scaleLinear().range([height, 0]);
  
      const xAxis = d3.axisBottom().scale(x);
  
      const yAxis = d3.axisLeft().scale(y);
  
      y.domain([1950, 2025]);
  
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
  
      svg.append("g").attr("class", "y axis").call(yAxis);
  
      svg
        .selectAll(".bar")
        .data(Object.entries(data))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d[0]))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => height - y(d[1]));
    }
  </script>
  
  <Container>
    <div class="my-3">
      <Button
        color="primary"
        on:click={() => createChart(mapAndOrder(associations))}
        >Cargar gráfica</Button
      >
    </div>
    <div id="chart-container" />
  </Container>
  