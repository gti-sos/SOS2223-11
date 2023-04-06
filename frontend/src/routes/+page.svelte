<script>
    import { Container, Row, Col } from 'sveltestrap';
  
    const teamMembers = [
      {
        name: 'Víctor Ruiz Jiménez',
        github: 'https://github.com/vicruijim'
      },
      {
        name: 'Ignacio García Rodríguez',
        github: 'https://github.com/ign13101'
      },
      {
        name: 'Christian Asuero Carrellán',
        github: 'https://github.com/chrasucar342'
      }
    ];
  </script>
  
  <Container>
    <h2 id="sos2223-11">SOS2223-11</h2>
    <hr>
  
    <Row>
      <Col>
        <strong>Team</strong>
        <ul>
          {#each teamMembers as member}
            <li><a href={member.github}>{member.name}</a></li>
          {/each}
        </ul>
      </Col>
    </Row>
  
    <Row>
      <Col>
        <p><strong>Project description</strong>: Our project aims to analyze the correlations between associations, telephone lines and household structures.</p>
      </Col>
    </Row>
  
    <Row>
      <Col>
        <p><strong>Repository</strong>: <a href="https://github.com/gti-sos/SOS2223-11">gti-sos/SOS2223-11</a></p>
      </Col>
    </Row>
  
    <Row>
      <Col>
        <p><strong>URL</strong>: <a href="https://sos2223-11.ew.r.appspot.com/">https://sos2223-11.ew.r.appspot.com/</a></p>
      </Col>
    </Row>
  
    <Row>
      <Col>
        <p><strong>APIs</strong></p>
        <ul>
          <li><a href="https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats/docs">https://sos2223-11.ew.r.appspot.com/api/v1/phone-line-stats/docs</a> (developed by Víctor Ruiz Jiménez)</li>
          <li><a href="https://sos2223-11.ew.r.appspot.com/api/v1/association-stats/docs">https://sos2223-11.ew.r.appspot.com/api/v1/association-stats/docs</a> (developed by Ignacio García Rodríguez)</li>
          <li><a href="https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats/docs">https://sos2223-11.ew.r.appspot.com/api/v1/projection-homes-stats/docs</a> (developed by Christian Asuero Carrellán)</li>
        </ul>
      </Col>
    </Row>
  </Container>
  