<script>
    // Importamos todo lo que nos hace falta y todos los objetos para los estilos

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

    let open = false;
    let openOne = false;
    const toggle = () => (open = !open);
    const toggleOne = () => (openOne = !openOne);

    // Obtener proyección de hogares

    onMount(async () => {
        getProjection();
    });

    let API = "/api/v2/projection-homes-stats";

    if (dev) API = "https://sos2223-11.ew.r.appspot.com" + API;

    // Variable global

    let projection = [];

    // Para POST

    let newProvince = "";
    let newYear = "";
    let newCoupleChildren = "";
    let newCoupleNoChildren = "";
    let newSingleParent = "";

    // Alerta de mensajes

    let messageAlert = false;
    let message = "";

    // Mostrar resultados

    let result = "";
    let resultStatus = "";

    let showForm = false;

    function dismissAlert() {
        messageAlert = false;
    }

    function toggleForm() {
        showForm = !showForm;
        messageAlert = false;
    }

    // Obtener proyecciones

    async function getProjection() {
        resultStatus = result = "";

        const res = await fetch(API, {
            method: "GET",
        });

        try {
            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            projection = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }

        const status = await res.status;

        resultStatus = status;
    }

    // Cargar los datos

    async function loadData() {
        messageAlert = false;

        if (projection.length > 0) {
            messageAlert = true;

            message = "Las proyecciones ya existen";
        } else {
            const res = await fetch(API + "/loadInitialData", {
                method: "GET",
            });

            const status = await res.status;

            if (status == 200) {
                getProjection();

                messageAlert = true;

                message = "Proyecciones cargadas";
            } else {
                messageAlert = true;

                message = "No se han podido cargar las proyecciones";
            }
        }
    }

    // Crear una proyección

    async function createProjection() {
        resultStatus = result = "";

        messageAlert = false;

        const res = await fetch(API, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                province: newProvince,
                year: parseInt(newYear),
                couple_children: parseInt(newCoupleChildren),
                couple_nochildren: parseInt(newCoupleNoChildren),
                single_parent: parseInt(newSingleParent),
            }),
        });

        const status = await res.status;

        resultStatus = status;

        if (status == 201) {
            getProjection();

            toggleForm();

            messageAlert = true;

            message = "Proyección creada con éxito";
        } else if (status == 409) {
            messageAlert = true;

            message = "La proyección ya existe";

            getProjection();
        } else if (status == 400) {
            newProvince == "" ||
                newYear == "" ||
                newCoupleChildren == "" ||
                newCoupleNoChildren == "" ||
                newSingleParent == "";

            messageAlert = true;
            message = "Faltan campos para crear la proyección";
        } else {
            messageAlert = true;

            message = "No se ha podido crear la proyección";

            getProjection();
        }
    }

    // Borrar proyecciones

    async function deleteProjections() {
        resultStatus = result = "";

        const res = await fetch(API, {
            method: "DELETE",
        });

        const status = await res.status;

        resultStatus = status;

        if (status == 200) {
            getProjection();

            messageAlert = true;

            message = "Se eliminaron todas las proyecciones";
        } else {
            getProjection();

            messageAlert = true;

            message = "No se han eliminado las proyecciones";
        }
    }

    // Borrar una proyección

    async function deleteProjection(province, year) {
        resultStatus = result = "";

        const res = await fetch(
            API + "/" + province + "/" + parseInt(year),

            {
                method: "DELETE",
            }
        );

        const status = await res.status;

        resultStatus = status;

        if (status == 200) {
            getProjection();

            messageAlert = true;

            message = `La proyección de ${province} del año ${year} se ha eliminado`;
        }
    }
</script>

<h2>
    <center><p>Proyección de hogares</p></center>

    <!--Crear proyeccion -->

    <center>
        <Button id="createProjection" color="primary" on:click={toggleForm}
            >Crear Proyección</Button
        >

        <!--Cargar proyeccion -->

        <Button color="success" on:click={loadData}>Cargar proyecciones</Button>

        <!--Borrar proyecciones -->

        <Button color="danger" on:click={toggle}>Eliminar proyecciones</Button>

        <!-- Alertas proyecciones -->
    </center>

    <Modal isOpen={open} {toggle}>
        <ModalHeader {toggle}
            >Atención: Vas a borrar todos los recursos de la base de datos</ModalHeader
        >

        <ModalBody>¿Estás seguro?</ModalBody>

        <ModalFooter>
            <Button
                color="danger"
                on:click={() => {
                    deleteProjections();
                    toggle();
                }}>Eliminar</Button
            >
            <Button color="secondary" on:click={toggle}>Cancelar</Button>
        </ModalFooter>

        <!-- Alertas proyeccion -->
    </Modal>
    <Modal isOpen={openOne} {toggleOne}>
        <ModalHeader {toggleOne}
            >Atención: Vas a borrar el recurso seleccionado de la base de datos</ModalHeader
        >

        <ModalBody>¿Estás seguro?</ModalBody>

        <ModalFooter>
            <Button
                color="danger"
                on:click={() => {
                    deleteProjection(projection.province, projection.year);
                    toggleOne();
                }}>Eliminar</Button
            >
            <Button color="secondary" on:click={toggleOne}>Cancelar</Button>
        </ModalFooter>
    </Modal>
</h2>

<!-- Formulario para crear una proyección -->

<Container>
    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert}>{message}</Alert>
    {/if}
    {#if showForm}
        <Card class="w-50 p-3 mb-3 mx-auto">
            <CardTitle><center>Cree una proyección</center></CardTitle>
            <Form on:submit={createProjection}>
                <FormGroup>
                    <Label for="province">Provincia</Label>
                    <Input
                        required
                        id="province"
                        bind:value={newProvince}
                        placeholder="Provincia"
                    />

                    <Label for="year">Año</Label>
                    <Input
                        required
                        id="year"
                        bind:value={newYear}
                        placeholder="Año"
                    />

                    <Label for="couple_children">Parejas con hijos</Label>
                    <Input
                        required
                        id="couple_children"
                        bind:value={newCoupleChildren}
                        placeholder="Número de parejas con hijos"
                    />

                    <Label for="couple_nochildren">Parejas sin hijos</Label>
                    <Input
                        required
                        id="couple_nochildren"
                        bind:value={newCoupleNoChildren}
                        placeholder="Número de parejas sin hijos"
                    />

                    <Label for="single_parent">Personas solteras</Label>
                    <Input
                        required
                        id="single_parent"
                        bind:value={newSingleParent}
                        placeholder="Número de personas solteras"
                    />

                    <center>
                        <p>
                            <Button color="success" type="submit">Crear</Button>
                        </p>
                    </center>
                </FormGroup>
            </Form>
        </Card>
    {/if}
    {#if !showForm}
        <Table bordered>
            <thead>
                <tr>
                    <th>Provincia</th>
                    <th>Año</th>
                    <th>Parejas con hijos</th>
                    <th>Parejas sin hijos</th>
                    <th>Personas solteras</th>
                </tr>
            </thead>

            <tbody>
                {#each projection as projections}
                    <tr>
                        <td>{projections.province}</td>
                        <td>{projections.year}</td>
                        <td>{projections.couple_children}</td>
                        <td>{projections.couple_nochildren}</td>
                        <td>{projections.single_parent}</td>
                        <td>
                            <div>
                                <Button
                                    ><a
                                        class="linkStyleless"
                                        color="primary"
                                        href="/projection-homes-stats/{projection.province}/{projection.year}"
                                    >
                                        Actualizar</a
                                    ></Button
                                >
                                <br />
                                <br />

                                <Button
                                    color="danger"
                                    on:click={() => {
                                        projection.province;
                                        projection.year;
                                        toggleOne();
                                    }}>Eliminar</Button
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
