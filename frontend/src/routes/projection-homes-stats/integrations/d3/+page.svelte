<script>

import * as d3 from 'd3';

// Procesamiento de los datos de la api

d3.json('https://www.juntadeandalucia.es/institutodeestadisticaycartografia/badea/operaciones/consulta/anual/3564?CodOper=b3_853&codConsulta=3564', function(data) {

  // Obtener la lista de proyecciones

  var projection = data.projection;

  // Obtener la lista de personas separadas y años
  var single_parent = projection.map(function(d) { return d.single_parent; });
  var year = projection.map(function(d) { return d.year; });

  // Calcular el total de proyecciones
  var totalProjection = d3.sum(single_parent);

  // Calcular el promedio de ventas
  var promedioProjection = d3.mean(single_parent);

  // Calcular el año con la proyección más alta

  var projectionMaxima = d3.max(projection, function(d) { return d.single_parent; });
  var yearProjectionMaxima = projection.find(function(d) { return d.single_parent === projectionMaxima; }).year;

  // Mostrar los resultados en la consola
  console.log('Personas solteras:', single_parent);
  console.log('Años:', year);
  console.log('Total de Proyecciones:', totalProjection);
  console.log('Promedio de proyecciones:', promedioProjection);
  console.log('Proyección máxima:', projectionMaxima);
  console.log('Año de proyección máxima:', yearProjectionMaxima);

  // Proyección geográfica 

  var projectionGeographic = d3.geoMercator();

  // Definir ancho y alto 

  projectionGeographic.fitSize([width, height], data);

  // Dibujar caminos del mapa

  var path = d3.geoPath().projection(projectionGeographic);

  var map = d3.select('#map')
  .append('g')
  .attr('class', 'map');

  map.selectAll('path')
  .data(data.features)
  .enter()
  .append('path')
  .attr('d', path)
  .style('fill', function(d) {
    // Retorna un color basado en los datos de cada feature
  })
  .on('mouseover', function(d) {
    // Muestra información detallada del dato cuando el cursor pasa por encima de la ruta
  })
  .on('mouseout', function(d) {
    // Oculta la información detallada del dato cuando el cursor sale de la ruta
  });
});

</script>

<svg id="map"></svg>
