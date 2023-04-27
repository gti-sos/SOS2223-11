import { Container, Row, Col } from "reactstrap";

function Home() {
    const url = "https://sos2223-11.ew.r.appspot.com/";

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

    return <Container className="bg-light border">
        {/* <div className="pageContainer"> */}
        <br />

        <h2 id="sos2223-11">SOS2223-11</h2>
        <hr />

        <Row>
            <Col>
                <strong>Team</strong>
                <ul>
                    {teamMembers.map((member) => (
                        <li key={member.github}>
                            <a href={member.github}>{member.name}</a>{" "}Fuente de datos:{" "}
                            <i>{member.dataname}</i>
                        </li>
                    ))}
                </ul>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Descripción del proyecto</strong>: Nuestro proyecto tiene
                    como objetivo analizar las correlaciones entre asociaciones, líneas
                    de teléfono y estructuras de hogares.
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Repositorio: </strong>
                    <a href="https://github.com/gti-sos/SOS2223-11">gti-sos/SOS2223-11</a>
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>URL del proyecto: </strong>
                    <a href={url}>{url}</a>
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Interfaces</strong>
                </p>
                <ul>
                    {teamMembers.map((member) => (
                        <li key={member.github}>
                            <a href={`${url}${member.dataname}`}>
                                {`${url}${member.dataname}`}
                            </a>{" "}
                            (desarrollada por {member.name})
                        </li>
                    ))}
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>
                    <strong>APIs</strong>
                </p>
                <ul>
                    <li>
                        v1
                        <ul>
                            {teamMembers.map((member) => (
                                <li key={member.name}>
                                    <a href={`${url}api/v1/${member.dataname}`}>
                                        {`${url}api/v1/${member.dataname}`}
                                    </a>{" "}
                                    (desarrollada por {member.name})
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        v2
                        <ul>
                            {teamMembers.map((member) => (
                                <li key={member.name}>
                                    <a href={`${url}api/v2/${member.dataname}`}>
                                        {`${url}api/v2/${member.dataname}`}
                                    </a>{" "}
                                    (desarrollada por {member.name})
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>
                    <strong>Documentación de Postman</strong>
                </p>
                <ul>
                    <li>
                        v1
                        <ul>
                            {teamMembers.map((member) => (
                                <li key={member.name}>
                                    <a href={`${url}api/v1/${member.dataname}/docs`}>
                                        {`${url}api/v1/${member.dataname}/docs`}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        v2
                        <ul>
                            {teamMembers.map((member) => (
                                <li key={member.name}>
                                    <a href={`${url}api/v2/${member.dataname}/docs`}>
                                        {`${url}api/v2/${member.dataname}/docs`}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </Col>
        </Row>

        <br />
        {/* </div> */}
    </Container>;
}

export default Home;