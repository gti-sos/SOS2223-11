<script>
    // import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Container, Row, Col } from "sveltestrap";

    // import highchartsMore from 'highcharts/highcharts-more';
    // highchartsMore(Highcharts); // enable highcharts-more module

    let API = "/api/v2/association-stats";

    if (dev) API = "http://localhost:12345" + API;
</script>

<Container class="bg-light border my-5 mx-auto ">
    <div class="py-3 px-3">
        <h2 class="p-2 mb-3">Gráficas</h2>
        <Row class="justify-content-center align-items-center mx-4 py-3 my-3 border">
            <Col>
                <h4> Asociaciones de Andalucía por año de creación </h4>
            </Col>
            <Col>
                <i> Tecnología: Highcharts </i>
            </Col>
            <Col class="text-center">
                <Button color="primary" href="/association-stats/integrations/highcharts">
                    Ir a la gráfica
                </Button>
            </Col>
            
        </Row>
        <Row class="justify-content-center align-items-center mx-4 py-3 my-3 border">
            <Col>
                <h4> Asociaciones de Andalucía por año de registro </h4>
            </Col>
            
            <Col>
                <i> Tecnología: D3 </i>
            </Col>
            <Col class="text-center">
                <Button color="primary" href="/association-stats/integrations/d3">
                    Ir a la gráfica
                </Button>
            </Col>
        </Row>
        <Row class="justify-content-center align-items-center mx-4 py-3 my-3 border">
            <Col>
                <h4> Por implementar </h4>
            </Col>
            
            <Col>
                <i> Tecnología: ??? </i>
            </Col>
            <Col class="text-center">
                <Button color="primary" href="/association-stats/integrations">
                    Ir a la gráfica
                </Button>
            </Col>
        </Row>
        <Row class="justify-content-center align-items-center mx-4 py-3 my-3 border">
            <Col>
                <h4> Por implementar </h4>
            </Col>
            
            <Col>
                <i> Tecnología: ??? </i>
            </Col>
            <Col class="text-center">
                <Button color="primary" href="/association-stats/integrations">
                    Ir a la gráfica
                </Button>
            </Col>
        </Row>
        <Row class="justify-content-center align-items-center mx-4 py-3 my-3 border">
            <Col>
                <h4> Por implementar </h4>
            </Col>
            
            <Col>
                <i> Tecnología: ??? </i>
            </Col>
            <Col class="text-center">
                <Button color="primary" href="/association-stats/integrations">
                    Ir a la gráfica
                </Button>
            </Col>
        </Row>
    </div>
</Container>