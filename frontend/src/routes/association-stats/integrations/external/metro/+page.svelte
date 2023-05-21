<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { Container } from "sveltestrap";

    const url =
        "https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=10b88b52-7a48-466c-bdd5-2688167af980&limit=10";
    const options = {
        method: "GET",
    };

    let data;

    onMount(async () => {
        const response = await fetch(url, options);
        if (response.ok) {
            data = await response.json();
            const records = data.result.records;
            const chartData = records.map((record) => ({
                period: record["Quarterly Period"],
                volumes: parseInt(
                    record["Incoming\nCall Volumes"].replace(",", "")
                ),
                answered: parseFloat(
                    record["% of calls answered within 2 minutes"]
                ),
            }));

            const svgWidth = 900;
            const svgHeight = 600;
            const margin = { top: 50, right: 100, bottom: 50, left: 50 };
            const width = svgWidth - margin.left - margin.right;
            const height = svgHeight - margin.top - margin.bottom;

            const svg = d3
                .select("#chart-container")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight);

            const xScale = d3
                .scaleBand()
                .domain(chartData.map((item) => item.period))
                .range([0, width])
                .padding(0.1);

            const yVolumeScale = d3
                .scaleLinear()
                .domain([0, d3.max(chartData, (d) => d.volumes)])
                .range([height, 0]);

            const yAnsweredScale = d3
                .scaleLinear()
                .domain([0, d3.max(chartData, (d) => d.answered)])
                .range([height, 0]);

            const areaVolume = d3
                .area()
                .x(
                    (d) =>
                        xScale(d.period) + margin.left + xScale.bandwidth() / 2
                )
                .y0(height + margin.top)
                .y1((d) => yVolumeScale(d.volumes) + margin.top);

            const scatterPoints = svg
                .selectAll("circle")
                .data(chartData)
                .enter()
                .append("circle")
                .attr(
                    "cx",
                    (d) =>
                        xScale(d.period) + margin.left + xScale.bandwidth() / 2
                )
                .attr("cy", (d) => yAnsweredScale(d.answered) + margin.top)
                .attr("r", 4)
                .attr("fill", "steelblue")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);

            const tooltip = d3
                .select("#chart-container")
                .append("div")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "white")
                .style("border", "1px solid #ddd")
                .style("padding", "5px")
                .style("font-size", "12px")
                .style("font-family", "Arial, sans-serif")
                .style("pointer-events", "none");

            function handleMouseOver(event, d) {
                const volume = d.volumes.toLocaleString();
                const answered = d.answered.toFixed(2) + "%";
                tooltip
                    .html(
                        `Volumen: ${volume}<br>Porcentaje de respuesta: ${answered}`
                    )
                    .style("visibility", "visible");
            }

            function handleMouseOut() {
                tooltip.style("visibility", "hidden");
            }

            svg.append("path")
                .datum(chartData)
                .attr("fill", "steelblue")
                .attr("opacity", 0.5)
                .attr("d", areaVolume);

            const xAxis = d3.axisBottom(xScale);
            const yAxisVolume = d3.axisLeft(yVolumeScale);
            const yAxisAnswered = d3
                .axisRight(yAnsweredScale)
                .tickFormat((d) => d + "%");

            svg.append("g")
                .attr(
                    "transform",
                    `translate(${margin.left}, ${height + margin.top})`
                )
                .call(xAxis);

            svg.append("g")
                .attr(
                    "transform",
                    `translate(${margin.left + 20}, ${margin.top})`
                )
                .call(yAxisVolume)
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", -40)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Volumen")
                .attr("alignment-baseline", "hanging")
                .attr("transform", "rotate(0)");

            svg.append("g")
                .attr(
                    "transform",
                    `translate(${width + margin.left - 20}, ${margin.top})`
                )
                .call(yAxisAnswered)
                .append("text")
                .attr("fill", "#000")
                .attr("y", -50)
                .attr("dy", "1.80em")
                .text("Porcentaje de respuesta")
                .attr("alignment-baseline", "hanging");
        } else {
            console.error("Error retrieving data:", response.status);
        }
    });
</script>

<svelte:head>
    <title>Gráfica externa metro</title>
</svelte:head>

<Container container="fluid">
    <div class="my-3">
        <h2>
            Desempeño de respuesta de consultas del Metro Adelaide en Australia
        </h2>
    </div>
    <div
        id="chart-container"
        style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh;"
    />
</Container>
