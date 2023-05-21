<script>
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { Button, Container } from "sveltestrap";
  import * as d3 from "d3";

  let API = "/api/v2/association-stats";

  if (dev) API = "http://localhost:12345" + API;

  let associations = [];

  onMount(async () => {
    await getAssociations();
    await createChart(mapAndOrder(associations));
  });

  async function getAssociations() {
    const res = await fetch(API, {
      method: "GET",
    });
    try {
      const data = await res.json();
      associations = data;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
  }

  function mapAndOrder(arr) {
    const result = arr.reduce((acc, obj) => {
      acc[obj.name] = obj.registration_date;
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(result).sort((a, b) => a[1] - b[1])
    );
  }

  let margin = { top: 40, right: 40, bottom: 190, left: 60 };
  let width = 600 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;

  let svg, y, yAxis;
  let buttonVisibility = false;
  let chartCreated = false;

  function createChart(data) {
    buttonVisibility = true;
    if (chartCreated) {
      console.log("La gráfica ya ha sido creada");
    } else {
      chartCreated = true;
      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(Object.keys(data));

      y = d3.scaleLinear().range([height, 0]).domain([1950, 2050]);

      const xAxis = d3.axisBottom(x);

      yAxis = d3.axisLeft(y);

      const color = d3
        .scaleOrdinal()
        .range([
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
          "#a6cee3",
          "#b2df8a",
          "#fb9a99",
          "#fdbf6f",
          "#cab2d6",
        ]);

      svg = d3
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

      const tooltip = d3.select("#tooltip");

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
        .on("mouseover", function (event, d) {
          d3.select(this).style("opacity", 0.5);
          const [xPos, yPos] = d3.pointer(event, svg.node());
          tooltip
            .style("visibility", "visible")
            .style("top", yPos - 10 + "px")
            .style("left", xPos + 10 + "px")
            .text(`${d[0]}: ${d[1]}`);
        })
        .on("mousemove", function (event) {
          const tooltip = d3.select("#tooltip");
          const [x, y] = d3.pointer(event); // get current mouse position
          tooltip.style("top", y - 10 + "px").style("left", x + 10 + "px"); // update tooltip position
        })
        .on("mouseout", function () {
          d3.select(this).style("opacity", 1);
          d3.select("#tooltip").style("visibility", "hidden");
        });
    }
  }
  function updateChartScale() {
    const newMax = document.getElementById("scale-slider").value;
    y.domain([1950, newMax]); // update the domain with the new maximum value
    svg.select(".y.axis").transition().duration(1000).call(yAxis);
    svg
      .selectAll(".bar")
      .transition()
      .duration(1000)
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => height - y(d[1]));
  }

  function reverseBars() {
    const newData = Object.entries(mapAndOrder(associations)).reverse();

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(newData.map((d) => d[0]));

    const color = d3
      .scaleOrdinal()
      .range([
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
        "#a6cee3",
        "#b2df8a",
        "#fb9a99",
        "#fdbf6f",
        "#cab2d6",
      ]);

    svg
      .selectAll(".bar")
      .data(newData)
      .transition()
      .duration(1000)
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => height - y(d[1]))
      .style("fill", (d, i) => color(i));

    const xAxis = d3.axisBottom(x);

    // update the tick labels on the x-axis
    svg
      .select(".x.axis")
      .transition()
      .duration(1000)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");
  }
</script>

<svelte:head>
  <title>Gráfica opcional</title>
</svelte:head>

<Container>
  <div class="my-3">
    <h2>Asociaciones de Andalucía por fecha de registro</h2>
  </div>
  <div class="my-3">
    <label for="scale-slider">Escala del eje Y:</label>
    <input
      id="scale-slider"
      type="range"
      min="1950"
      max="2050"
      value="2050"
      on:input={() => updateChartScale()}
    />
  </div>
  <Button
    color="primary"
    style="display:{buttonVisibility ? 'inline-block' : 'none'}"
    id="reverse"
    on:click={() => reverseBars()}>Invertir barras</Button
  >

  <div id="tooltip" />
  <div id="chart-container" />
</Container>

<style>
  #tooltip {
    position: relative;
    visibility: hidden;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 5px;
  }
</style>
