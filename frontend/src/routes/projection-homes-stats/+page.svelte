<script>

    import { onMount } from "svelte";

    import { dev } from "$app/environment";

    import {} from "./projection-homes-stats.css";

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

    if (dev) 
    
        API = "http://localhost:12345" + API;

    // Variable global

    let projection = [];

    // Para POST

    let newProvince = "";
    let newYear = "";
    let newCoupleChildren = "";
    let newCoupleNoChildren = "";
    let newSingleParent = "";

    // Para DELETE

    let provinceDelete = "";
    let yearDelete = "";

    // Para páginación y búsqueda de recursos

    let offset = 0;
    let limit = 10;
    let province = "";
    let year = "";
    let couple_children = "";
    let couple_nochildren = "";
    let single_parent = "";

    // Alerta de mensajes

    let messageAlert = false;
    let message = "";
    let color = "";

    // Mostrar resultados

    let result = "";

    let resultStatus = "";

    let showForm = false;

    // Paginación

    function nextPage() {
        offset += limit;

        getProjection();
    }

    function previousPage() {
        offset = Math.max(offset - limit, 0);

        getProjection();
    }

    // Alerta de mensaje desactivado

    function dismissAlert() {
        messageAlert = false;
    }

    // Formulario

    function toggleForm() {
        showForm = !showForm;

        messageAlert = false;
    }

    // Obtener proyecciones

    async function getProjection() {

        resultStatus = result = "";

        const res = await fetch(API + `?offset=${offset}&limit=${limit}`, {
            method: "GET",
        });

        try {
            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            projection = data;

        } 
        
        catch (error) {

            console.log(`Error al parsear el resultado: ${error}`);

        }

        const status = await res.status;

        resultStatus = status;

        if (status == 500) {

            message = "Error interno del servidor";

            color = "danger";
        }
    }

    // Filtros: Buscar por cualquier campo

    async function getProjectionFilters() {
        const consult = {};

        if (province) {
            consult.province = province;
        }

        if (year) {
            consult.year = year;
        }

        if (couple_children) {
            consult.couple_children = couple_children;
        }

        if (couple_nochildren) {
            consult.couple_nochildren = couple_nochildren;
        }

        if (single_parent) {
            consult.single_parent = single_parent;
        }

        const res = await fetch(
            API + `?${new URLSearchParams(consult).toString()}`,
            {
                method: "GET",
            }
        );

        try {
            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            projection = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }

        const status = await res.status;

        resultStatus = status;

        if (projection.length > 0) {
            messageAlert = true;

            message = "Datos mostrados del filtro introducido";

            color = "success";
        } else {
            messageAlert = true;

            message = "No se han podido encontrar los datos";

            color = "danger";
        }
    }

    // Limpiar todos los filtros

    async function getDeleteFilters() {
        resultStatus = result = "";

        if (
            province != "" ||
            year != "" ||
            couple_children != "" ||
            couple_nochildren != "" ||
            single_parent != ""
        ) {
            province = "";
            year = "";
            couple_children = "";
            couple_nochildren = "";
            single_parent = "";
        }

        getProjection();

        return;
    }

    // Cargar los datos

    async function loadData() {

        messageAlert = false;

        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });

        const status = await res.status;

        if (status == 200) {
            getProjection();

            messageAlert = true;

            message = "Proyecciones cargadas";

            color = "success";
        } else {
            messageAlert = true;

            message =
                "No se han podido cargar las proyecciones o ya están cargadas";

            color = "danger";
        }
    }

    // Crear una proyección

    let dataInserted = [];

    async function createProjection() {
        resultStatus = result = "";

        messageAlert = false;

        const newProjection = {
            province: newProvince,
            year: parseInt(newYear),
            couple_children: parseInt(newCoupleChildren),
            couple_nochildren: parseInt(newCoupleNoChildren),
            single_parent: parseInt(newSingleParent),
        };

        const existingData = dataInserted.find(
            (data) =>
                data.province === newProvince &&
                data.year === newYear &&
                data.couple_children === newCoupleChildren &&
                data.couple_nochildren === newCoupleNoChildren &&
                data.single_parent === newSingleParent
        );

        if (existingData) {
            message = "Ya existe el dato";

            return;
        }

        const res = await fetch(API, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(newProjection),
        });

        const status = await res.status;

        resultStatus = status;

        if (status == 201) {
            getProjection();

            toggleForm();

            messageAlert = true;

            message = "Proyección creada con éxito";

            color = "success";
        } else if (status == 409) {
            messageAlert = true;

            message = `Los campos Provincia: ${newProvince} y Año: ${newYear} ya existen`;

            color = "warning";
        } else if (status == 400) {
            messageAlert = true;

            message = "Faltan campos para crear la proyección";

            color = "warning";
        } else {
            messageAlert = true;

            message = "No se ha podido crear la proyección";

            getProjection();

            color = "danger";
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

            color = "success";
        } else {
            messageAlert = true;

            message = "No existen proyecciones";

            color = "danger";
        }
    }

    // Borrar una proyección

    async function deleteProjection(province, year) {
        resultStatus = result = "";

        const res = await fetch(API + "/" + province + "/" + year, {
            method: "DELETE",
        });

        const status = await res.status;

        resultStatus = status;

        if (status == 200) {
            messageAlert = true;

            message = `La proyección de ${province} del año ${year} ha sido eliminada`;

            color = "success";

            getProjection();
        } else if (status == 500) {
            messageAlert = true;

            message = "Error interno del servidor";

            color = "danger";
        } else if (status == 404) {
            messageAlert = true;

            message = `La proyección de ${province} del año ${year} no ha podido ser eliminada`;

            color = "danger";
        }
    }

    // Volver a la API principal

    async function view() {
        window.location.href =
            "https://sos2223-11.appspot.com/projection-homes-stats";
    }
</script>

<h2>
    <!-- Alertas proyecciones: Borrar todos los recursos -->

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
                }}
                >Eliminar
            </Button>
            <Button color="secondary" on:click={toggle}>Cancelar</Button>
        </ModalFooter>
    </Modal>

    <!-- Alertas proyecciones: Borrar un recurso -->

    <Modal isOpen={openOne} {toggleOne}>
        <ModalHeader {toggleOne}
            >Atención: Vas a borrar el recurso seleccionado de la base de datos</ModalHeader
        >
        <ModalBody>¿Estás seguro?</ModalBody>
        <ModalFooter>
            <Button
                color="danger"
                on:click={() => {
                    deleteProjection(provinceDelete, yearDelete);
                    toggleOne();
                }}
                >Eliminar
            </Button>
            <Button color="secondary" on:click={toggleOne}>Cancelar</Button>
        </ModalFooter>
    </Modal>
</h2>

<!-- Formulario para crear una proyección -->

<Container>
    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert} {color}>{message}</Alert>
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
                        <div class="buttons" style="text-align: center">
                            <Button color="success" type="submit">Crear</Button>

                            <Button color="info" on:click={view}>Atrás</Button>
                        </div>
                    </center>
                </FormGroup>
            </Form>
        </Card>
    {/if}

    {#if !showForm}
        <h2>
            <center><p>Proyecciones de hogares: {projection.length}</p></center>
        </h2>

        <!--Crear proyeccion -->

        <center>
            <Button id="createProjection" color="primary" on:click={toggleForm}
                >Crear Proyección</Button
            >

            <!--Cargar proyeccion -->

            <Button color="success" on:click={loadData}
                >Cargar proyecciones</Button
            >

            <!--Borrar proyecciones -->

            <Button color="danger" on:click={toggle}
                >Eliminar proyecciones</Button
            >

            <!--Filtrar campos -->

            <Button color="warning" on:click={getProjectionFilters}
                >Filtrar</Button
            >

            <!--Limpiar filtros -->

            <Button color="dark" on:click={getDeleteFilters}
                >Limpiar Filtros</Button
            >

        </center>

        <!--Filtros -->

        <div class="filtros">
            <label class="columna">
                Provincia:
                <input bind:value={province} type="text" />
            </label>

            <label class="columna">
                Año:
                <input bind:value={year} type="text" />
            </label>

            <label class="columna">
                Parejas con hijos:
                <input bind:value={couple_children} type="text" />
            </label>

            <label class="columna">
                Parejas sin hijos:
                <input bind:value={couple_nochildren} type="text" />
            </label>

            <label class="columna">
                Personas solteras:
                <input bind:value={single_parent} type="text" />
            </label>
        </div>

        <!-- Tabla con los datos de la BD -->

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
                                    color="primary"
                                    href="/projection-homes-stats/{projections.province}/{projections.year}"
                                    >Actualizar
                                </Button>
                                <br />
                                <br />

                                <Button
                                    color="danger"
                                    on:click={() => {
                                        provinceDelete = projections.province;
                                        yearDelete = projections.year;
                                        toggleOne();
                                    }}>Eliminar</Button
                                >
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>

        <!-- Paginación: 10 resultados por página -->

        <center>
            <Button color="danger" on:click={previousPage}>Anterior</Button>
            <Button color="success" on:click={nextPage}>Siguiente</Button>
        </center>
    {/if}
</Container>
