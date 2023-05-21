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
        Container,
        Label,
        Input,
        Form,
        FormGroup,
        Card,
        CardTitle,
        Alert,
    } from "sveltestrap";
    import ReactIcon from "../ReactIcon.svelte";

    let open = false;
    let openOne = false;
    const toggle = () => (open = !open);
    const toggleOne = () => (openOne = !openOne);

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

    let provinceDelete = "";
    let registrationDateDelete = "";

    let messageAlert = false;
    let message = "";

    let showForm = false;

    function dismissAlert() {
        messageAlert = false;
    }

    function toggleForm() {
        showForm = !showForm;
        messageAlert = false;
    }

    async function getAssociations() {
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            associations = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }

    async function loadData() {
        messageAlert = false;
        if (associations.length > 0) {
            messageAlert = true;
            message = "Ya existen asociaciones creadas";
        } else {
            const res = await fetch(API + "/loadInitialData", {
                method: "GET",
            });
            const status = await res.status;
            if (status == 200) {
                getAssociations();
                messageAlert = true;
                message = "Asociaciones cargadas con éxito";
            } else {
                messageAlert = true;
                message = "No se han podido cargar las asociaciones";
            }
        }
    }
    async function reload() {
        messageAlert = false;
        try {
            getAssociations();
            messageAlert = true;
            message = "Lista de asociaciones recargada con éxito";
        } catch (error) {
            messageAlert = true;
            message = "No se ha podido recargar la lista de asociaciones";
        }
    }

    async function createAssociation() {
        messageAlert = false;
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
        const status = await res.status;
        if (status == 201) {
            getAssociations();
            toggleForm();
            messageAlert = true;
            message = `La asociación de ${newProvince} del año ${newRegistrationDate} ha sido creada con exito`;
        } else if (status == 409) {
            messageAlert = true;
            message = `La asociación de ${newProvince} del año ${newRegistrationDate} ya existe`;
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
            messageAlert = true;
            message = "Faltan campos para crear la asociación";

            //getAssociation();
        } else {
            messageAlert = true;
            message = "No se ha podido crear la asociación";
            getAssociations();
        }
    }
    async function deleteAssociations() {
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        if (status == 200) {
            getAssociations();
            messageAlert = true;
            message = "Se han eliminado todas las asociaciones";
        } else if (status == 404) {
            messageAlert = true;
            message = `No existen asociaciones que eliminar`;
        } else {
            getAssociations();
            messageAlert = true;
            message = "Error eliminando las asociaciones";
        }
    }
    async function deleteAssociation(province, registration_date) {
        const res = await fetch(
            API + "/" + province + "/" + registration_date,
            {
                method: "DELETE",
            }
        );
        const status = await res.status;
        if (status == 200) {
            getAssociations();
            messageAlert = true;
            message = `La asociación de ${province} del año ${registration_date} ha sido eliminada`;
        } else if (status == 404) {
            messageAlert = true;
            message = `La asociación de ${province} del año ${registration_date} no ha podido ser eliminada`;
        } else {
        }
    }
</script>

<svelte:head>
    <title>Asociaciones</title>
</svelte:head>

<div
    class="d-flex justify-content-between align-items-center"
    style="padding-right: 20px;"
>
    <h2 class="my-4">Asociaciones de Andalucía</h2>
    <div class="mr-0">
        <Button
            color="warning"
            href="association-stats/integrations"
            class="p-3"><div>Integraciones y Usos</div></Button
        >
        <Button color="dark" href="/react-igr" class="p-3"
            ><div>Versión en React &nbsp<ReactIcon /></div></Button
        >
    </div>
</div>

<div class="my-2 px-5 justify-content-center align-items-center">
    &nbsp
    <Button id="createAssociation" color="success" on:click={toggleForm}>
        Crear asociación
    </Button>
    &nbsp
    <Button color="primary" on:click={loadData}>Cargar asociaciones</Button>
    &nbsp
    <Button color="primary" on:click={reload}>Recargar asociaciones</Button>
    &nbsp
    <Button color="primary" href="/association-stats/search">
        Filtrar asociaciones
    </Button>
    &nbsp
    <Button color="danger" on:click={toggle}>Borrar asociaciones</Button>
</div>
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
            }}>Proceder</Button
        >
        <Button color="secondary" on:click={toggle}>Cancelar</Button>
    </ModalFooter>
</Modal>
<Modal isOpen={openOne} {toggleOne}>
    <ModalHeader {toggleOne}
        >Vas a borrar el recurso seleccionado de la base de datos</ModalHeader
    >
    <ModalBody>¿Estás seguro?</ModalBody>
    <ModalFooter>
        <Button
            color="primary"
            on:click={() => {
                deleteAssociation(provinceDelete, registrationDateDelete);
                toggleOne();
            }}>Proceder</Button
        >
        <Button color="secondary" on:click={toggleOne}>Cancelar</Button>
    </ModalFooter>
</Modal>

<Container>
    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert}>{message}</Alert>
    {/if}
    {#if showForm}
        <Card class="w-50 p-3 mb-3 mx-auto">
            <CardTitle>Crea una asociación</CardTitle>
            <Form on:submit={createAssociation}>
                <!-- <FormGroup> -->
                <Label for="name">Nombre de la asociación</Label>
                <Input
                    required
                    id="name"
                    bind:value={newName}
                    placeholder="Nombre"
                />

                <Label for="goal">Objetivo de la asociación</Label>
                <Input
                    required
                    id="goal"
                    bind:value={newGoal}
                    placeholder="Objetivo"
                />

                <Label for="province">Provincia</Label>
                <Input
                    required
                    id="province"
                    bind:value={newProvince}
                    placeholder="Provincia"
                />

                <Label for="registration-date">Año de registro</Label>
                <Input
                    type="number"
                    required
                    id="registration-date"
                    bind:value={newRegistrationDate}
                    placeholder="0000"
                />

                <Label for="creation-date">Año de creación</Label>
                <Input
                    type="number"
                    required
                    id="creation-date"
                    bind:value={newCreationDate}
                    placeholder="0000"
                />

                <Label for="zip-code">Código postal</Label>
                <Input
                    type="number"
                    required
                    id="zip-code"
                    bind:value={newZipCode}
                    placeholder="00000"
                />

                <Label for="township-code">Código municipal</Label>
                <Input
                    type="number"
                    required
                    id="township-code"
                    bind:value={newTownshipCode}
                    placeholder="000"
                    class="mb-3"
                />

                <Button color="success" type="submit">Crear</Button>
                <!-- </FormGroup> -->
            </Form>
        </Card>
    {/if}
    {#if !showForm}
        <Table striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Objetivo</th>
                    <th>Año de registro</th>
                    <th>Año de creacion</th>
                    <th>Código postal</th>
                    <th>Provincia</th>
                    <th>Código municipal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#each associations as association}
                    <tr>
                        <td>{association.name}</td>
                        <td>{association.goal}</td>
                        <td>{association.registration_date}</td>
                        <td>{association.creation_date}</td>
                        <td>{association.zip_code}</td>
                        <td>{association.province}</td>
                        <td>{association.township_code}</td>
                        <td>
                            <div>
                                <Button
                                    ><a
                                        class="linkStyleless"
                                        href="/association-stats/{association.province}/{association.registration_date}"
                                    >
                                        Editar</a
                                    ></Button
                                >
                                <br />
                                <br />

                                <Button
                                    color="danger"
                                    on:click={() => {
                                        provinceDelete = association.province;
                                        registrationDateDelete =
                                            association.registration_date;

                                        toggleOne();
                                    }}>Borrar</Button
                                >
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/if}
</Container>

<style>
    h2 {
        margin-left: 2%;
        margin-top: 0.5%;
    }

    .linkStyleless {
        text-decoration: none;
        color: white;
    }
</style>
