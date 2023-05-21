<script>
    // import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Container, Row, Col } from "sveltestrap";

    let API = "/api/v2/association-stats";

    if (dev) API = "http://localhost:12345" + API;

    let graphs = [
        {
            title: "Asociaciones de Andalucía por año de creación",
            technology: "Highcharts",
            widget: "Spline",
            href: "/association-stats/integrations/highcharts"
        },
        {
            title: "Asociaciones de Andalucía por año de registro",
            technology: "D3",
            widget: "Area/Scatter",
            href: "/association-stats/integrations/d3"
        },
        {
            title: "Gráfica grupal",
            technology: "Highcharts",
            widget: "Stacked Column",
            href: "/analytics"
        },
        {
            title: "Asociaciones de Andalucía por año de registro (opcional)",
            technology: "D3",
            widget: "Bar",
            href: "/association-stats/integrations/optional"
        },
        {
            title: "Jugadores de cricket por ranking (API externa)",
            technology: "Highcharts",
            widget: "Areaspline",
            href: "/association-stats/integrations/external/cricket"
        },
        {
            title: "Estudiantes con discapacidad por año y nivel escolar en Australia (API externa)", 
            technology: "Highcharts",
            widget: "Column",
            href: "/association-stats/integrations/external/students"
        },
        {
            title: "Vuelos de aerolíneas domésticas por mes y año en Australia (API externa)",
            technology: "ECharts (Proxy)",
            widget: "Pie",
            href: "/association-stats/integrations/external/airlines"
        },
        {
            title: "Límite de velocidad medio en accidentes por mes y año en Australia (API externa)",
            technology: "Highcharts",
            widget: "Scatter",
            href: "/association-stats/integrations/external/crashes"
        },
        {
            title: "Desempeño de respuesta de consultas del Metro Adelaide en Australia (API externa)",
            technology: "D3",
            widget: "Area/Scatter",
            href: "/association-stats/integrations/external/metro"
        }
    ];
</script>

<svelte:head>
    <title>Integraciones</title>
</svelte:head>

<Container class="bg-light border my-5 mx-auto">
    <div class="py-3 px-3">
        <h2 class="p-2 mb-3">Gráficas</h2>
        {#each graphs as graph}
            <Row class="justify-content-center align-items-center mx-4 py-3 my-3 border">
                <Col>
                    <h4>{graph.title}</h4>
                </Col>
                <Col class="mx-5">
                    <i>Tecnología: {graph.technology}</i> <br>
                    <i>Widget: {graph.widget}</i>
                </Col>
                <Col class="text-center">
                    <Button color="primary" href={graph.href}>
                        Ir a la gráfica
                    </Button>
                </Col>
            </Row>
        {/each}
    </div>
</Container>