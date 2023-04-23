<script>
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { Button, Container } from "sveltestrap";
  import * as d3 from "d3";

  let API = "/api/v2/association-stats";

  if (dev) API = "http://localhost:12345" + API;

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
    const margin = { top: 40, right: 40, bottom: 190, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(Object.keys(data));

    const y = d3.scaleLinear().range([height, 0]).domain([1950, 2050]);

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    svg.append("g").attr("class", "y axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(Object.entries(data))
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d[1]))
      .style("fill", (d, i) => color(i))
      .on("mouseover", function (d) {
        d3.select(this).style("opacity", 0.5);
        const tooltip = d3.select("#tooltip");
        tooltip.style("visibility", "visible");
        tooltip
          .text(`${d[0]}: ${d[1]}`)
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mousemove", function () {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 1);
        d3.select("#tooltip").style("visibility", "hidden");
      });
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
