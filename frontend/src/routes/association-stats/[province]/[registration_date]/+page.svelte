<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table, Container, Alert } from "sveltestrap";
    import { page } from "$app/stores";

    onMount(async () => {
        getAssociation();
    });

    let province = $page.params.province;
    let registration_date = $page.params.registration_date;

    let API =
        "/api/v2/association-stats" + "/" + province + "/" + registration_date;

    if (dev) API = "http://localhost:12345" + API;

    let updated_name = "";
    let updated_goal = "";
    let updated_registration_date = registration_date;
    let updated_creation_date = "";
    let updated_zip_code = "";
    let updated_province = province;
    let updated_township_code = "";

    let messageAlert = false;
    let message = "";

    let result = "";
    let resultStatus = "";

    function dismissAlert() {
        messageAlert = false;
    }

    async function getAssociation() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            updated_name = data.name;
            updated_goal = data.goal;
            updated_registration_date = data.registration_date;
            updated_creation_date = data.creation_date;
            updated_zip_code = data.zip_code;
            updated_province = data.province;
            updated_township_code = data.township_code;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function updateAssociation() {
        resultStatus = result = "";
        messageAlert = false;
        console.log("que buena cortesia");
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updated_name,
                goal: updated_goal,
                registration_date: updated_registration_date,
                creation_date: updated_creation_date,
                zip_code: updated_zip_code,
                province: updated_province,
                township_code: updated_township_code,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        console.log("precheck");
        console.log(status);
        if (status == 201) {
            getAssociation();
            messageAlert = true;
            message = "Asociación actualizada con éxito";
        } else {
            getAssociation();
            messageAlert = true;
            message = `Los datos introducidos no son correctos para la asociación de ${province} en el año ${registration_date}`;
        }
    }
</script>

<h2>Detalles de la asociación</h2>
<Container>
    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert}>{message}</Alert>
    {/if}
    <Table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Objetivo</th>
                <th>Año de registro</th>
                <th>Año de creacion</th>
                <th>Código postal</th>
                <th>Provincia</th>
                <th>Código de municipio</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={updated_name} /></td>
                <td><input bind:value={updated_goal} /></td>
                <td><input bind:value={updated_registration_date} /> </td>
                <td><input bind:value={updated_creation_date} /></td>
                <td><input bind:value={updated_zip_code} /></td>
                <td><input bind:value={updated_province} /> </td>
                <td><input bind:value={updated_township_code} /></td>
            </tr>
        </tbody>
    </Table>
    <Button color="primary" on:click={updateAssociation}>Actualizar</Button>
</Container>

<style>
    h2 {
        margin-left: 1%;
        margin-top: 0.5%;
    }
    td, th {
        /* padding: 0.25rem 0.25rem; */
        font-size: 0.9rem;
    }
</style>
