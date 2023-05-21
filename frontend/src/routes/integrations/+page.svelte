<script>
    // import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Container, Row, Col } from "sveltestrap";

    let API = "/api/v2/association-stats";

    if (dev) API = "http://localhost:12345" + API;

    let graphs = [
        {
            author: "SOS2223-11",
            title: "Gráfica grupal",
            technology: "Highcharts",
            widget: "Stacked Column",
            href: "/analytics",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Asociaciones de Andalucía por año de creación",
            technology: "Highcharts",
            widget: "Spline",
            href: "/association-stats/integrations/highcharts",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Asociaciones de Andalucía por año de registro",
            technology: "D3",
            widget: "Area/Scatter",
            href: "/association-stats/integrations/d3",
        },

        {
            author: "Ignacio García Rodríguez",
            title: "Asociaciones de Andalucía por año de registro (opcional)",
            technology: "D3",
            widget: "Bar",
            href: "/association-stats/integrations/optional",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Jugadores de cricket por ranking (API externa)",
            technology: "Highcharts",
            widget: "Areaspline",
            href: "/association-stats/integrations/external/cricket",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Estudiantes con discapacidad por año y nivel escolar en Australia (API externa)",
            technology: "Highcharts",
            widget: "Column",
            href: "/association-stats/integrations/external/students",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Vuelos de aerolíneas domésticas por mes y año en Australia (API externa)",
            technology: "ECharts (Proxy)",
            widget: "Pie",
            href: "/association-stats/integrations/external/airlines",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Límite de velocidad medio en accidentes por mes y año en Australia (API externa)",
            technology: "Highcharts",
            widget: "Scatter",
            href: "/association-stats/integrations/external/crashes",
        },
        {
            author: "Ignacio García Rodríguez",
            title: "Desempeño de respuesta de consultas del Metro Adelaide en Australia (API externa)",
            technology: "D3",
            widget: "Area/Scatter",
            href: "/association-stats/integrations/external/metro",
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Lineas telefonicas de Andalucia por tipo por provincia y año (visualizacion datos)",
            technology: "Echarts",
            widget: "Barra",
            href: "/phone-line-stats/integrations/echarts"
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Lineas telefonicas en Almeria a lo largo de los años (visualizacion datos)",
            technology: "Highcharts",
            widget: "Area",
            href: "/phone-line-stats/integrations/highcharts"
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Emisiones per cápita de CO2e por estado y territorio en Australia (externa)",
            technology: "Echarts",
            widget: "Line",
            href: "/phone-line-stats/integrations/external/co2-emissions"
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Cambios netos en el número de especies listadas en el EPBC desde 2000 en el Informe de Estado del Medio Ambiente (SoE) de 2016(Externa Australia)",
            technology: "Echarts",
            widget: "Tipo barra (cascada)",
            href: "/phone-line-stats/integrations/external/flora"
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Estadisticas de futbolistas (RapidApi api-football-beta)", 
            technology: "Echarts",
            widget: "Radar",
            href: "/phone-line-stats/integrations/external/football"
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Estadísticas de la Perrera de Animales 2013-2014 en Australi (Externa)",
            technology: "Highcharts",
            widget: "Pie",
            href: "/phone-line-stats/integrations/external/pounded-animals"
        },
        {
            author: "Víctor Ruiz Jimenez",
            title: "Informe Anual de la South Australian Housing Trust Nuevas Asignaciones (externa)",
            technology: "Highcharts",
            widget: "Line",
            href: "/phone-line-stats/integrations/external/south-australian-housing"
        },
    ];
    

    let groupedGraphs = [];
    let currentAuthor = null;

    for (let graph of graphs) {
        if (graph.author !== currentAuthor) {
            currentAuthor = graph.author;
            groupedGraphs.push({ author: currentAuthor, graphs: [graph] });
        } else {
            groupedGraphs[groupedGraphs.length - 1].graphs.push(graph);
        }
    }
</script>

<svelte:head>
    <title>Integraciones</title>
</svelte:head>

<Container class="bg-light border my-5 mx-auto">
    <div class="py-3 px-3">
        <h2 class="p-1 mb-3">Gráficas</h2>
        {#each groupedGraphs as group}
            <h3 class="px-3 pt-2">{group.author}</h3>
            {#each group.graphs as graph}
                <Row
                    class="justify-content-center align-items-center mx-5 py-3 my-3 border"
                >
                    <Col>
                        <h4>{graph.title}</h4>
                    </Col>

                    <Col class="mx-5">
                        <i>Tecnología: {graph.technology}</i> <br />
                        <i>Widget: {graph.widget}</i>
                    </Col>

                    <Col class="text-center">
                        <Button color="primary" href={graph.href}>
                            Ir a la gráfica
                        </Button>
                    </Col>
                </Row>
            {/each}
        {/each}
    </div>
</Container>
