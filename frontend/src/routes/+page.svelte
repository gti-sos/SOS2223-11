<script>
    import { Container, Row, Col } from "sveltestrap";

    const teamMembers = [
        {
            name: "Víctor Ruiz Jiménez",
            github: "https://github.com/vicruijim",
            dataname: "phone-line-stats",
        },
        {
            name: "Ignacio García Rodríguez",
            github: "https://github.com/ign13101",
            dataname: "association-stats",
        },
        {
            name: "Christian Asuero Carrellán",
            github: "https://github.com/chrasucar342",
            dataname: "projection-homes-stats",
        },
    ];
</script>

<Container>
    <div class="pageContainer">
        <br />

        <h2 id="sos2223-11">SOS2223-11</h2>
        <hr />

        <Row>
            <Col>
                <strong>Team</strong>
                <ul>
                    {#each teamMembers as member}
                        <li>
                            <a href={member.github}>{member.name}:</a> Fuente de
                            datos: <i>{member.dataname}</i>
                        </li>
                    {/each}
                </ul>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Descripción del proyecto</strong>: Nuestro proyecto
                    tiene como objetivo analizar las correlaciones entre
                    asociaciones, líneas de teléfono y estructuras de hogares.
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Repositorio</strong>:
                    <a href="https://github.com/gti-sos/SOS2223-11"
                        >gti-sos/SOS2223-11</a
                    >
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>URL del proyecto</strong>:
                    <a href="https://sos2223-11.ew.r.appspot.com/"
                        >https://sos2223-11.ew.r.appspot.com/</a
                    >
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p><strong>Interfaces</strong></p>
                <ul>
                    <li>
                        <a
                            href="https://sos2223-11.ew.r.appspot.com/phone-line-stats"
                            >https://sos2223-11.ew.r.appspot.com/phone-line-stats</a
                        > (desarrollada por Víctor Ruiz Jiménez)
                    </li>
                    <li>
                        <a
                            href="https://sos2223-11.ew.r.appspot.com/association-stats"
                            >https://sos2223-11.ew.r.appspot.com/association-stats</a
                        > (desarrollada por Ignacio García Rodríguez)
                    </li>
                    <li>
                        <a
                            href="https://sos2223-11.ew.r.appspot.com/projection-homes-stats"
                            >https://sos2223-11.ew.r.appspot.com/projection-homes-stats</a
                        > (desarrollada por Christian Asuero Carrellán)
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p><strong>APIs</strong></p>
                <ul>
                    <li>
                        v1
                        <ul>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats"
                                    >https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats</a
                                > (desarrollada por Víctor Ruiz Jiménez)
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v1/association-stats"
                                    >https://sos2223-11.ew.r.appspot.com/api/v1/association-stats</a
                                > (desarrollada por Ignacio García Rodríguez)
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats"
                                    >https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats</a
                                > (desarrollada por Christian Asuero Carrellán)
                            </li>
                        </ul>
                    </li>
                    <li>
                        v2
                        <ul>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v2/phone-line-stats"
                                    >https://sos2223-11.ew.r.appspot.com/api/v2/phone-line-stats</a
                                > (desarrollada por Víctor Ruiz Jiménez)
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v2/association-stats"
                                    >https://sos2223-11.ew.r.appspot.com/api/v2/association-stats</a
                                > (desarrollada por Ignacio García Rodríguez)
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats"
                                    >https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats</a
                                > (desarrollada por Christian Asuero Carrellán)
                            </li>
                        </ul>
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p><strong>Documentación de Postman</strong></p>
                <ul>
                    <li>
                        v1
                        <ul>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats/docs"
                                    >https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats/docs</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v1/association-stats/docs"
                                    >https://sos2223-11.ew.r.appspot.com/api/v1/association-stats/docs</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats/docs"
                                    >https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats/docs</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li>
                        v2
                        <ul>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v2/phone-line-stats/docs"
                                    >https://sos2223-11.ew.r.appspot.com/api/v2/phone-line-stats/docs</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v2/association-stats/docs"
                                    >https://sos2223-11.ew.r.appspot.com/api/v2/association-stats/docs</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats/docs"
                                    >https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats/docs</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </Col>
        </Row>

        <br />
    </div>
</Container>

<style>
    .pageContainer {
        margin-bottom: 8em;
    }
</style>
