<script>

    // Importaciones 

    import { onMount } from "svelte";

    import { dev } from "$app/environment";

    import {} from "./style.css";

    import {
        Button,
        Container,
        Label,
        Input,
        Form,
        FormGroup,
        Card,
        CardTitle,
        Alert,
    } from "sveltestrap";

    import { page } from "$app/stores";

    onMount(async () => {

        getProjection();

    });

    let API = "/api/v2/projection-homes-stats";

    if (dev) 
    
        API = "https://sos2223-11.ew.r.appspot.com" + API;

    // Alertas de mensajes

    let messageAlert = false;
    let message = "";
    let color = "";

    // Resultados

    let dato = [];
    let result = "";
    let resultStatus = "";
    let showForm = false;

    // Quitar alerta

    function dismissAlert() {

        messageAlert = false;

    }

    // Formulario

    function toggleForm() {

        showForm = !showForm;

        messageAlert = false;

    }

    // Recoger datos de la base de datos

    let province = $page.params.province;
    let year = $page.params.year;
    let provinceUpdate = province;
    let yearUpdate = year;
    let coupleChildrenUpdate = "";
    let coupleNoChildrenUpdate = "";
    let singleParentUpdate = "";

    // Obtener una proyección dada la provincia y el año

    async function getProjection() {

        resultStatus = result = "";

        const res = await fetch(API + "/" + province + "/" + year, {

            method: "GET"

        });

        try {

            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            dato = data;
            provinceUpdate = dato.province;
            yearUpdate = dato.year;
            coupleChildrenUpdate = dato.couple_children;
            coupleNoChildrenUpdate = dato.couple_nochildren;
            singleParentUpdate = dato.single_parent;
            
        } 
        
        catch (error) {

            console.log(`Error parsing result: ${error}`);

        }

        const status = await res.status;

        resultStatus = status;

        if(status == 404) {

            message = `La provincia ${province} del año ${year} no ha sido encontrada`;

        }

        if(status == 500) {

            message = "Error interno";

        }

    }

    // Actualizar la proyección seleccionada

    async function updateProjection() {

        resultStatus = result = "";

        messageAlert = false;

        const res = await fetch(API + "/" + province + "/" + year, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({

                province: provinceUpdate,
                year: yearUpdate,
                couple_children: coupleChildrenUpdate,
                couple_nochildren: coupleNoChildrenUpdate,
                single_parent: singleParentUpdate,

            }),

        });

        const status = await res.status;

        resultStatus = status;

        if (status == 200) {

            messageAlert = true;

            message = "Proyección actualizada";

            color = "success";

            getProjection();

        }

        else if (status == 400) {

            messageAlert = true;

            message = "Se ha intentado cambiar provincia y año o faltan campos por rellenar";

            color = "warning";

            getProjection();

        } 

        }

    // Volver a la API principal

    async function view() {

        window.location.href = "https://sos2223-11.appspot.com/projection-homes-stats";

    }

</script>

<Container>
    
    {#if messageAlert}

        <Alert dismissible on:dismiss={dismissAlert} color={color}>{message}</Alert>

    {/if}

    <Card class="w-50 p-3 mb-3 mx-auto">

        <CardTitle><center>Descripción de la proyección</center></CardTitle>

        <Form on:submit={getProjection}>

        <FormGroup>

        <Label for="province">Provincia</Label>
        <Input id="province" bind:value={provinceUpdate} placeholder="Provincia"/>

        <Label for="year">Año</Label>
        <Input id="year" bind:value={yearUpdate} placeholder="Año"/>

        <Label for="couple_children">Parejas con hijos</Label>
        <Input id="couple_children" bind:value={coupleChildrenUpdate} placeholder="Número de parejas con hijos"/>

        <Label for="couple_nochildren">Parejas sin hijos</Label>
        <Input id="couple_nochildren" bind:value={coupleNoChildrenUpdate} placeholder="Número de parejas sin hijos"/>

        <Label for="single_parent">Personas solteras</Label>
        <Input id="single_parent" bind:value={singleParentUpdate} placeholder="Número de personas solteras"/>

        <center>

        <div class="buttons" style = "text-align: center">        
                    
        <Button color="success" on:click={updateProjection}>Actualizar</Button>

        <Button color="info" on:click={view}>Atrás</Button>
    
        </div> 
        </center> 
        </FormGroup>
        </Form>
        </Card>
</Container>
