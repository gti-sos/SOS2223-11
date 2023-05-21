<script>
    import { dev } from "$app/environment";
    import {
        Button,
        Table,
        ButtonDropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Alert,
    } from "sveltestrap";

let API = "/api/v2/phone-line-stats";
    if (dev) {
        API = "http://localhost:12345" + API;
    }

let integraciones = [
    {
            title: "Lineas telefonicas de Andalucia por tipo por provincia y año (visualizacion datos)",
            technology: "Echarts",
            widget: "Barra",
            href: "/phone-line-stats/integrations/echarts"
        },
        {
            title: "Lineas telefonicas en Almeria a lo largo de los años (visualizacion datos)",
            technology: "Highcharts",
            widget: "Area",
            href: "/phone-line-stats/integrations/highcharts"
        },
        {
            title: "Gráfica grupal",
            technology: "Highcharts",
            widget: "Stacked Column",
            href: "/analytics"
        },
        {
            title: "Emisiones per cápita de CO2e por estado y territorio en Australia (externa)",
            technology: "Echarts",
            widget: "Line",
            href: "/phone-line-stats/integrations/external/co2-emissions"
        },
        {
            title: "Cambios netos en el número de especies listadas en el EPBC desde 2000 en el Informe de Estado del Medio Ambiente (SoE) de 2016(Externa Australia)",
            technology: "Echarts",
            widget: "Tipo barra (cascada)",
            href: "/phone-line-stats/integrations/external/flora"
        },
        {
            title: "Estadisticas de futbolistas (RapidApi api-football-beta)", 
            technology: "Echarts",
            widget: "Radar",
            href: "/phone-line-stats/integrations/external/football"
        },
        {
            title: "Estadísticas de la Perrera de Animales 2013-2014 en Australi (Externa)",
            technology: "Highcharts",
            widget: "Pie",
            href: "/phone-line-stats/integrations/external/pounded-animals"
        },
        {
            title: "Informe Anual de la South Australian Housing Trust-Nuevas Asignaciones (externa)",
            technology: "Highcharts",
            widget: "Line",
            href: "/phone-line-stats/integrations/external/south-australian-housing"
        },
        
    ];

</script>
<Table>
    <tbody>
        {#each integraciones as integracion}
            <tr>
                <td>{integracion.title}</td>
                <td>{integracion.technology}</td>
                <td>{integracion.widget}</td>
                <td></td>

                <td
                    ><Button href={integracion.href}>Ir a grafica</Button
                    ></td
                >
            </tr>
        {/each}
    </tbody>
</Table>