<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    import { page } from "$app/stores";

    onMount(async () => {
        getAssociation();
    });

    let province = $page.params.province;
    let registration_date = $page.params.registration_date;

    let API = "/api/v2/association-stats" + "/" + province + "/" + registration_date;

    if (dev) API = "http://localhost:12345" + API;

    let updated_name = "";
    let updated_goal = "";
    let updated_registration_date = registration_date;
    let updated_creation_date = "";
    let updated_zip_code = "";
    let updated_province = province;
    let updated_township_code = "";

    let result = "";
    let resultStatus = "";

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
        if (status == 200) {
            getAssociation();
        }
    }
</script>

<h2>Detalles del recurso</h2>

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
            <td>{updated_name}</td>
            <td>{updated_goal}</td>
            <td>{updated_registration_date} </td>
            <td><input bind:value={updated_creation_date} /></td>
            <td><input bind:value={updated_zip_code} /></td>
            <td>{updated_province} </td>
            <td><input bind:value={updated_township_code} /></td>
            <td><Button color="primary" on:click={updateAssociation}>Actualizar</Button></td>
        </tr>
    </tbody>
</Table>

{#if resultStatus != ""}
    <h6>Depuración:</h6>    
    <pre>
    {resultStatus}
{result}
    </pre>
{/if}

<style>
    h6{
        margin-left: 1%;
    }
    h2{
        margin-left: 1%;
        margin-top: 0.5%;
    }
</style>