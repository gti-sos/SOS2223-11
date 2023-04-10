<script>
    import { Container, Row, Col } from "sveltestrap";

    const teamMembers = [
        {
            name: "Víctor Ruiz Jiménez",
            github: "https://github.com/vicruijim",
            dataname: "phone-line-stats"
        },
        {
            name: "Ignacio García Rodríguez",
            github: "https://github.com/ign13101",
            dataname: "association-stats"
        },
        {
            name: "Christian Asuero Carrellán",
            github: "https://github.com/chrasucar342",
            dataname: "projection-home-stats"
        },
    ];
</script>

<Container>
    <div class="pageContainer">
        <br>

        <h2 id="sos2223-11">SOS2223-11</h2>
        <hr />
        
    <Row>
        <Col>
            <strong>Team</strong>
            <ul>
                {#each teamMembers as member}
                <li><a href={member.github}>{member.name}:</a> <i>{member.dataname}</i></li>
                {/each}
            </ul>
        </Col>
    </Row>

    <Row>
        <Col>
            <p>
                <strong>Project description</strong>: Our project aims to
                analyze the correlations between associations, telephone lines
                and household structures.
            </p>
        </Col>
    </Row>

    <Row>
        <Col>
            <p>
                <strong>Repository</strong>:
                <a href="https://github.com/gti-sos/SOS2223-11"
                    >gti-sos/SOS2223-11</a
                >
            </p>
        </Col>
    </Row>

    <Row>
        <Col>
            <p>
                <strong>URL</strong>:
                <a href="https://sos2223-11.ew.r.appspot.com/"
                    >https://sos2223-11.ew.r.appspot.com/</a
                >
            </p>
        </Col>
    </Row>

    <Row>
        <Col>
            <p><strong>Postman Documentation</strong></p>
            <ul>
                <li>
                    v1
                    <ul>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats/docs"
                                >https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats/docs</a
                            > (developed by Víctor Ruiz Jiménez)
                        </li>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v1/association-stats/docs"
                                >https://sos2223-11.ew.r.appspot.com/api/v1/association-stats/docs</a
                            > (developed by Ignacio García Rodríguez)
                        </li>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats/docs"
                                >https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats/docs</a
                            > (developed by Christian Asuero Carrellán)
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
                            > (developed by Víctor Ruiz Jiménez)
                        </li>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v2/association-stats/docs"
                                >https://sos2223-11.ew.r.appspot.com/api/v2/association-stats/docs</a
                            > (developed by Ignacio García Rodríguez)
                        </li>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats/docs"
                                >https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats/docs</a
                            > (developed by Christian Asuero Carrellán)
                        </li>
                    </ul>
                </li>
            </ul>
        </Col>
    </Row>
    <Row>
        <Col>
            <p><strong>APIs</strong></p>
                    <ul>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v2/phone-line-stats"
                                >https://sos2223-11.ew.r.appspot.com/api/v2/phone-line-stats</a
                            > (developed by Víctor Ruiz Jiménez)
                        </li>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v2/association-stats"
                                >https://sos2223-11.ew.r.appspot.com/api/v2/association-stats</a
                            > (developed by Ignacio García Rodríguez)
                        </li>
                        <li>
                            <a
                                href="https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats"
                                >https://sos2223-11.ew.r.appspot.com/api/v2/projection-homes-stats</a
                            > (developed by Christian Asuero Carrellán)
                        </li>
                    </ul>
               
        </Col>
    </Row>
    <br>
</div>
</Container>

<style>
    .pageContainer {
        margin-bottom: 8em;
    }
</style>
