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

    onMount(async () => {
        getAssociationsNumber();
        getAssociations();
    });

    let API = "/api/v2/association-stats";

    if (dev) API = "http://localhost:12345" + API;

    let associations = [];

    let messageAlert = false;
    let message = "";

    let result = "";
    let resultStatus = "";

    let limit = 10;
    let offset = 0;

    let updatedLimit = limit;
    let updatedOffset = offset;
    let searchName;

    let searchGoal;
    let searchRegistrationDate;
    let searchCreationDate;
    let searchZipCode;
    let searchProvince;
    let searchTownshipCode;

    function dismissAlert() {
        messageAlert = false;
    }

    let totalPages = 1;
    let currentPage = 1;

    let totalLength;

    async function getAssociationsNumber() {
        resultStatus = result = "";

        const queryParams = {};

        if (searchName !== null && searchName !== undefined) {
            queryParams.name_contains = searchName;
        }
        if (searchGoal !== null && searchGoal !== undefined) {
            queryParams.goal_contains = searchGoal;
        }
        if (
            searchRegistrationDate !== null &&
            searchRegistrationDate !== undefined
        ) {
            queryParams.registration_date = searchRegistrationDate;
        }
        if (searchCreationDate !== null && searchCreationDate !== undefined) {
            queryParams.creation_date_over = searchCreationDate;
        }
        if (searchZipCode !== null && searchZipCode !== undefined) {
            queryParams.zip_code_over = searchZipCode;
        }
        if (searchProvince !== null && searchProvince !== undefined) {
            queryParams.province = searchProvince;
        }
        if (searchTownshipCode !== null && searchTownshipCode !== undefined) {
            queryParams.township_code_over = searchTownshipCode;
        }
        const queryString = new URLSearchParams(queryParams).toString();
        const res = await fetch(`${API}?${queryString}`, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            totalLength = data.length;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }

        const status = await res.status;
        resultStatus = status;
    }

    async function getAssociations() {
        resultStatus = result = "";
        if (isNaN(totalPages)) {
            totalPages = 1;
        }
        const queryParams = {};
        if (limit !== null && limit !== undefined) {
            queryParams.limit = limit;
        }
        if (offset !== null && offset !== undefined) {
            queryParams.offset = offset;
        }
        if (searchName !== null && searchName !== undefined) {
            queryParams.name_contains = searchName;
        }
        if (searchGoal !== null && searchGoal !== undefined) {
            queryParams.goal_contains = searchGoal;
        }
        if (
            searchRegistrationDate !== null &&
            searchRegistrationDate !== undefined
        ) {
            queryParams.registration_date = searchRegistrationDate;
        }
        if (searchCreationDate !== null && searchCreationDate !== undefined) {
            queryParams.creation_date_over = searchCreationDate;
        }
        if (searchZipCode !== null && searchZipCode !== undefined) {
            queryParams.zip_code_over = searchZipCode;
        }
        if (searchProvince !== null && searchProvince !== undefined) {
            queryParams.province = searchProvince;
        }
        if (searchTownshipCode !== null && searchTownshipCode !== undefined) {
            queryParams.township_code_over = searchTownshipCode;
        }
        const queryString = new URLSearchParams(queryParams).toString();
        const res = await fetch(`${API}?${queryString}`, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            associations = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        if (totalLength === 0) {
            totalPages = 1;
        } else {
            totalPages = Math.ceil(totalLength / limit);
        }
        if (isNaN(totalPages)) {
            totalPages = 1;
        }
        const status = await res.status;
        resultStatus = status;
    }

    function updateSearch() {
        limit = updatedLimit;
        offset = updatedOffset;
        if (offset == 0) {
            currentPage = 1;
        } else {
            currentPage = totalPages / offset;
        }
        getAssociationsNumber();
        getAssociations();
    }

    async function reload() {
        messageAlert = false;
        try {
            getAssociationsNumber();
            getAssociations();
            messageAlert = true;
            message = "Lista de asociaciones recargada con éxito";
        } catch (error) {
            messageAlert = true;
            message = "No se ha podido recargar la lista de asociaciones";
        }
    }

    // let provinceDelete = "";
    // let registrationDateDelete = "";

    // let openOne = false;
    // const toggleOne = () => (openOne = !openOne);

    // async function deleteAssociation(province, registration_date) {
    //     resultStatus = result = "";
    //     const res = await fetch(
    //         API + "/" + province + "/" + registration_date,
    //         {
    //             method: "DELETE",
    //         }
    //     );
    //     const status = await res.status;
    //     resultStatus = status;
    //     if (status == 200) {
    //         getAssociations();
    //         messageAlert = true;
    //         message = `La asociación de ${province} del año ${registration_date} ha sido eliminada`;
    //     } else if (status == 404) {
    //         messageAlert = true;
    //         message = `La asociación de ${province} del año ${registration_date} no ha podido ser eliminada`;
    //     } else {
    //     }
    // }
</script>

<h2>
    Asociaciones de andalucía

    <Button color="primary" href="/association-stats"
        >Volver a asociaciones</Button
    >
    <Button color="primary" on:click={reload}>Recargar asociaciones</Button>

    <!-- <Modal isOpen={openOne} {toggleOne}>
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
    </Modal> -->
</h2>
<Container>
    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert}>{message}</Alert>
    {/if}

    <div class="d-flex justify-content-between align-items-center mt-3">
        <Form on:submit={updateSearch}>
            <div class="d-flex align-items-center">
                <Label class="mr-2" for="name">Nombre:</Label>
                <Input type="text" id="name" bind:value={searchName} />
                <Label class="mr-2" for="goal">Objetivo:</Label>
                <Input type="text" id="goal" bind:value={searchGoal} />
                <Label class="mr-2" for="registration_date"
                    >Año de registro:</Label
                >
                <Input
                    type="number"
                    id="registration_date"
                    bind:value={searchRegistrationDate}
                />
                <Label class="mr-2" for="creation_date">Año de creación:</Label>
                <Input
                    type="number"
                    id="creation_date"
                    bind:value={searchCreationDate}
                />
            </div>
            <div class="d-flex align-items-center">
                <Label class="mr-2" for="zip_code">Código postal:</Label>
                <Input type="number" id="zip_code" bind:value={searchZipCode} />
                <Label class="mr-2" for="province">Provincia:</Label>
                <Input type="text" id="province" bind:value={searchProvince} />
                <Label class="mr-2" for="township_code">Código municipal:</Label
                >
                <Input
                    type="number"
                    id="township_code"
                    bind:value={searchTownshipCode}
                />
                <Label class="mr-2" for="limit">Límite:</Label>
                <Input
                    type="number"
                    id="limit"
                    bind:value={updatedLimit}
                    min="1"
                    max="100"
                    step="1"
                />

                <!-- <Label class="mr-2" for="offset">Saltar:</Label>
                <Input
                    type="number"
                    id="limit"
                    bind:value={updatedOffset}
                    min="0"
                    max={limit}
                    step="1"
                /> -->
            </div>
            <div>
                <Button color="primary" type="submit">Filtrar</Button>
            </div>

            <br />
            <!-- <div class="d-flex align-items-center"> -->
                <div>

                
            <Button
                color="primary"
                disabled={currentPage === 1}
                on:click={() => {
                    currentPage -= 1;
                    offset -= limit;
                    getAssociations();
                    getAssociationsNumber();
                }}
            >
                Anterior
            </Button>
            <Label class="mx-3">
                {currentPage} de {totalPages}
            </Label>
            <Button
                color="primary"
                disabled={currentPage === totalPages}
                on:click={() => {
                    currentPage += 1;
                    offset += limit;
                    getAssociations();
                    getAssociationsNumber();
                }}
            >
                Siguiente
            </Button>
        </div>
            <!-- </div> -->
        </Form>
    </div>
    

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
                <!-- <th>Acciones</th> -->
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
                    <!-- <td>
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
                                    console.log("hola");
                                    toggleOne();
                                }}>Borrar</Button
                            >
                        </div>
                    </td> -->
                </tr>
            {/each}
        </tbody>
    </Table>
</Container>

<style>
    h2 {
        margin-left: 2%;
        margin-top: 0.5%;
    }

    /* .linkStyleless {
        text-decoration: none;
        color: white;
    } */
</style>
