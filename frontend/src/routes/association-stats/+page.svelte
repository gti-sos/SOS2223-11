<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import {
        Button,
        Table,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
    } from "sveltestrap";

    let open = false;
    const toggle = () => (open = !open);

    onMount(async () => {
        getAssociations();
    });

    let API = "/api/v2/association-stats";

    if (dev) API = "http://localhost:12345" + API;

    let associations = [];

    let newName = "";
    let newGoal = "";
    let newRegistrationDate = "";
    let newCreationDate = "";
    let newZipCode = "";
    let newProvince = "";
    let newTownshipCode = "";

    let result = "";
    let resultStatus = "";

    async function getAssociations() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            associations = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function loadData() {
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        if (status == 200) {
            getAssociations();
        }
    }

    async function createAssociation() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                goal: newGoal,
                registration_date: newRegistrationDate,
                creation_date: newCreationDate,
                zip_code: newZipCode,
                province: newProvince,
                township_code: newTownshipCode,
            }),
        });
        let mensajeUsuario = "";
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getAssociations();
            mensajeUsuario = "Se ha creado el nuevo dato introducido";
        } else if (status == 409) {
            mensajeUsuario = "El dato introducido ya existe";
            getAssociations();
            // Poner aqui el 400
        } else if (
            newName == "" ||
            newGoal == "" ||
            newRegistrationDate == "" ||
            newCreationDate == "" ||
            newZipCode == "" ||
            newProvince == "" ||
            newTownshipCode == ""
        ) {
            mensajeUsuario = "Faltan propiedades por poner al nuevo dato";
            //getAssociation();
        } else {
            mensajeUsuario = "No se ha podido crear el dato introducido";
            getAssociations();
        }
    }
    async function deleteAssociations() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getAssociations();
        }
    }
    async function deleteAssociation(province, registration_date) {
        resultStatus = result = "";
        const res = await fetch(
            API + "/" + province + "/" + registration_date,
            {
                method: "DELETE",
            }
        );
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getAssociations();
        }
    }
</script>

<h2>
    Asociaciones de andalucía
    <Button color="danger" on:click={toggle}
        >Borrar asociaciones</Button
    >
    <Modal isOpen={open} {toggle}>
        <ModalHeader {toggle}
            >Vas a borrar todos los recursos de la base de datos</ModalHeader
        >
        <ModalBody>¿Estás seguro?</ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                on:click={() => {
                    deleteAssociations();
                    toggle();
                }}
            >
                Proceder</Button
            >
            <Button color="secondary" on:click={toggle}>Cancelar</Button>
        </ModalFooter>
    </Modal>
    <Button color="primary" on:click={loadData}
        >Cargar asociaciones</Button
    >
</h2>

<Table borderless>
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
            <td><input bind:value={newName} /></td>
            <td><input bind:value={newGoal} /></td>
            <td><input bind:value={newProvince} /></td>
            <td><input bind:value={newRegistrationDate} /></td>
            <td><input bind:value={newCreationDate} /></td>
            <td><input bind:value={newZipCode} /></td>
            <td><input bind:value={newTownshipCode} /></td>
            <td
                ><Button
                    id="createAssociation"
                    color="success"
                    on:click={createAssociation}>Crear</Button
                ></td
            >
        </tr>

        {#each associations as association}
            <tr>
                <td>{association.name}</td>
                <td>{association.goal}</td>
                <td>{association.registration_date}</td>
                <td>{association.creation_date}</td>
                <td>{association.zip_code}</td>
                <td>
                    <!-- <a 
                        href="/association/{association.province}/{association.registration_date}"
                    >-->
                    {association.province}
                    <!-- </a> -->
                </td>
                <td>{association.township_code}</td>
                <td
                    ><Button
                        color="danger"
                        on:click={deleteAssociation(
                            association.province,
                            association.registration_date
                        )}>Borrar</Button
                    ></td
                >
            </tr>
        {/each}
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
    /* a { 
        text-decoration: none;
        color: white;
    }*/
    h2 {
        margin-left: 2%;
        margin-top: 0.5%;
    }
    h6 {
        margin-left: 2%;
    }
</style>
