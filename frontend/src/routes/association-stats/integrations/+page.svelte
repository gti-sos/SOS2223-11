<script>
    // import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Container, Row, Col } from "sveltestrap";

    // import highchartsMore from 'highcharts/highcharts-more';
    // highchartsMore(Highcharts); // enable highcharts-more module

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
            widget: "Bar(cambiar)",
            href: "/association-stats/integrations/d3"
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
            widget: "",
            href: "/association-stats/integrations/external/cricket"
        },
        {
            title: "Students with a disability by school year level (Australia)",
            technology: "Highcharts",
            widget: "",
            href: "/association-stats/integrations/external/students"
        },
        {
            title: "Domestic Australian Airlines Flights by Month and Year",
            technology: "Highcharts",
            widget: "Scatter",
            href: "/association-stats/integrations"
        },
        {
            title: "Average Speed Limit in crashes by Month and Year (Australia)",
            technology: "Highcharts",
            widget: "",
            href: "/association-stats/integrations/crashes"
        },
        {
            title: "Por implementar",
            technology: "???",
            widget: "",
            href: "/association-stats/integrations"
        }
    ];
</script>

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