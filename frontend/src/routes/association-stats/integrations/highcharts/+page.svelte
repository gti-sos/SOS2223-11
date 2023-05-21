<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Container } from "sveltestrap";
    import Highcharts from "highcharts";

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
            acc[obj.name] = obj.creation_date;
            return acc;
        }, {});

        return Object.fromEntries(
            Object.entries(result).sort((a, b) => a[1] - b[1])
        );
    }

    function createChart(data) {
        const values = Object.values(data);
        Highcharts.chart("chart-container", {
            chart: {
                type: "spline",
                zoomType: "x",
            },
            title: {
                text: "Asociaciones de Andalucía por fecha de creación",
            },
            xAxis: {
                categories: Object.keys(data),
                title: {
                    text: "Nombre de la asociación",
                },
            },
            yAxis: {
                title: {
                    text: "Año de creación",
                },
                tickInterval: 10, // set the tick interval to 10
                min: 1950,
                max: 2050,
            },
            series: [
                {
                    name: "Fecha de creación",
                    data: values,
                },
            ],
        });
    }
</script>

<svelte:head>
    <title>Gráfica Highcharts</title>
</svelte:head>

<Container>
    <div class="my-3">
        <h2>Asociaciones de Andalucía por fecha de creación</h2>
    </div>
    <div id="chart-container" />
</Container>
