// Importaciones

import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';

// Variables

const Projections = () => {
    const [open, setOpen] = useState(false);
    const [openOne, setOpenOne] = useState(false);
    const [projections, setProjections] = useState([]);
    const [newProvince, setNewProvince] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newCoupleChildren, setNewCoupleChildren] = useState('');
    const [newCoupleNoChildren, setNewCoupleNoChildren] = useState('');
    const [newSingleParent, setNewSingleParent] = useState('');

    const [showForm, setShowForm] = useState(false);

    function dismissAlert() {

        setMessageAlert(false);

    }

    function toggleForm() {

        setShowForm(!showForm);
        setMessageAlert(false);

    }

    // Enlace web

    const API = '/api/v2/projection-homes-stats';

    const dev = false;

    useEffect(() => {
        getProjection();
    }, []);

    const toggle = () => setOpen(!open);
    const toggleOne = () => setOpenOne(!openOne);

    // Obtener los datos

    const getProjection = async () => {

        setResultStatus('');

        setResult('');

        const res = await fetch(API, {
            method: 'GET',
        });

        try {

            const data = await res.json();

            setResult(JSON.stringify(data, null, 2));

            setProjections(data);

        } 
        
        catch (error) {

            console.log(`Error parseando el resultado: ${error}`);

        }

        const status = await res.status;

        setResultStatus(status);

    };

    // Cargar los datos

    const loadData = async () => {

        setMessageAlert(false);

        if (projections.length > 0) {

            setMessageAlert(true);

            setMessage('Hay proyecciones de hogares ya cargadas.');

        } 
        
        else {

            const res = await fetch(API + '/loadInitialData', {
                method: 'GET',
            });

            const status = await res.status;

            if (status == 200) { // Ok

                getProjection();

                setMessageAlert(true);

                setMessage('Proyecciones de hogares cargadas correctamente');

            } 
            
            else {

                setMessageAlert(true);

                setMessage('No se han podido cargar las proyecciones de hogares');

            }
        }
    };

    // Crear una proyección

    let dataInserted = [];

    async function createProjection() {

        setResult('');

        setResultStatus('');

        setMessageAlert(false);

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
        data.single_parent === newSingleParent);

        if (existingData) {

            setMessageAlert(true)

            setMessage("Ya existe el dato");
        
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

            setMessageAlert(true);

            setMessage("Proyección creada con éxito");

            color = "success";

        } 
        
        else if (status == 409) {

            setMessageAlert(true);

            setMessage(`Los campos Provincia: ${newProvince} y Año: ${newYear} ya existen`);

            color = "warning";

        } 
        
        else if (status == 400) {

            setMessageAlert(true);

            setMessage("Faltan campos para crear la proyección");

            color = "warning";

        } 
        
        else {

            setMessageAlert(true);

            setMessage("No se ha podido crear la proyección");

            getProjection();

            color = "danger";

        }
    }

    // Borrar proyecciones

    async function deleteProjections() {

        setResult('');

        setResultStatus('');

        setMessageAlert(false);

        const res = await fetch(API, {

            method: "DELETE",

        });

        const status = await res.status;

        resultStatus = status;

        if (status == 200) {

            getProjection();

            setMessageAlert(true);

            setMessage("Se eliminaron todas las proyecciones");

            color = "success";

        } 

        else {

            setMessageAlert(true);

            setMessage("No existen proyecciones");

            color = "danger";

    }

}

    // Borrar una proyección

    async function deleteProjection(province, year) {

        setResult('');

        setResultStatus('');

        setMessageAlert(false);

        const res = await fetch(API + "/" + province + "/" + year, {

        method: "DELETE",

    });

        const status = await res.status;

        resultStatus = status;

        if (status == 200) {

            setMessageAlert(true);

            setMessage(`La proyección de ${province} del año ${year} ha sido eliminada`);

            color = "success";
        
            getProjection();

        }

        else if (status == 500) {

            setMessageAlert(true);

            setMessage("Error interno del servidor");

            color = "danger";

        }

        else if(status == 404) {

            setMessageAlert(true);

            setMessage(`La proyección de ${province} del año ${year} no ha podido ser eliminada`);

            color = "danger";
            
        }
    }

    // Volver a la API principal

    async function view() {

        window.location.href = "https://sos2223-11.appspot.com/projection-homes-stats";

    }

return (

    <div>

    <h2>

    {/* Alertas proyecciones: Borrar todos los recursos */}

    <Modal isOpen={open} toggle={toggle}>
    <ModalHeader toggle={toggle}>Atención: Vas a borrar todos los recursos de la base de datos</ModalHeader>
    <ModalBody>¿Estás seguro?</ModalBody>
    <ModalFooter>
    <Button color="danger" on:click={() => {
        deleteProjections();
        toggle();
        }}>Eliminar
    </Button>
    <Button color="secondary" on:click={toggle}>Cancelar</Button>
    </ModalFooter>
    </Modal>
    
    {/* Alertas proyecciones: Borrar un recurso */}

    <Modal isOpen={openOne} toggle={toggleOne}>
    <ModalHeader toggle={toggleOne}>Atención: Vas a borrar el recurso seleccionado de la base de datos</ModalHeader>
    <ModalBody>¿Estás seguro?</ModalBody>
    <ModalFooter>
    <Button color="danger" on:click={() => {
        deleteProjection(provinceDelete, yearDelete);
        toggleOne();
        }}>Eliminar
    </Button>
    <Button color="secondary" on:click={toggleOne}>Cancelar</Button>
    </ModalFooter>
    </Modal>

</h2>

    {/* Formulario para crear una proyección */}

<Container>

    {setMessageAlert(true) &&

        (<Alert dismissible on:dismiss={dismissAlert} color={color}>{message}</Alert>)}

    {(showForm &&

        <Card class="w-50 p-3 mb-3 mx-auto">

        <CardTitle><center>Cree una proyección</center></CardTitle>

        <Form on:submit={createProjection}>

                <FormGroup>
                    <Label for="province">Provincia</Label>
                    <Input
                        required
                        id="province"
                        value={newProvince}
                        onChange={(e) => setNewProvince(e.target.value)}
                        placeholder="Provincia"/>

                    <Label for="year">Año</Label>
                    <Input
                        required
                        id="year"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        placeholder="Año"/>

                    <Label for="couple_children">Parejas con hijos</Label>
                    <Input
                        required
                        id="couple_children"
                        value={newCoupleChildren}
                        onChange={(e) => setNewCoupleChildren(e.target.value)}
                        placeholder="Número de parejas con hijos"/>

                    <Label for="couple_nochildren">Parejas sin hijos</Label>
                    <Input
                        required
                        id="couple_nochildren"
                        value={newCoupleNoChildren}
                        onChange={(e) => setNewCoupleNoChildren(e.target.value)}
                        placeholder="Número de parejas sin hijos"/>

                    <Label for="single_parent">Personas solteras</Label>
                    <Input
                        required
                        id="single_parent"
                        value={newSingleParent}
                        onChange={(e) => setNewSingleParent(e.target.value)}
                        placeholder="Número de personas solteras"/>

                    <center>

                    <div class="buttons" style = "text-align: center">

                        <Button color="success" type="submit">Crear</Button>

                        <Button color="info" on:click={view}>Atrás</Button>
                    
                     </div>
                       

                    </center>
        </FormGroup>
        </Form>
        </Card>

    )}

    {!showForm && (

    <h2><center><p>Proyecciones de hogares: {projection.length}</p></center></h2>)};

    {/* --Crear proyeccion */}

    <center>

    <Button id="createProjection" color="primary" on:click={toggleForm}>Crear Proyección</Button>

    {/* --Cargar proyeccion-- */}

    <Button color="success" on:click={loadData}>Cargar proyecciones</Button>

    {/* --Borrar proyeccion-- */}

    <Button color="danger" on:click={toggle}>Eliminar proyecciones</Button>

    {/* --Filtrar campos-- */}

    <Button color = "warning" on:click={getProjectionFilters}>Filtrar</Button>

    {/* --Limpiar filtros-- */}

    <Button color = "dark" on:click={getDeleteFilters}>Limpiar Filtros</Button>

    </center>

    {/* --Filtros-- */}

    <div class="filtros">

    <label class="columna">
    Provincia:
    <input bind:value={province} type="text"/>
    </label>

    <label class="columna">
    Año:
    <input bind:value={year} type="text"/>
    </label>
    
    <label class="columna">
    Parejas con hijos:
    <input bind:value={couple_children} type="text"/>
    </label>

    <label class="columna">
    Parejas sin hijos:
    <input bind:value={couple_nochildren} type="text"/>
    </label>

    <label class="columna">
    Personas solteras:
    <input bind:value={single_parent} type="text"/>
    </label>
    </div>
        
    {/* Tabla con los datos de la BD */}

    {!showForm && (

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
                        {projection.map((projections) => (
                            <tr key={`${projection.province}-${projection.year}`}>
                        <td>{projections.province}</td>
                        <td>{projections.year}</td>
                        <td>{projections.couple_children}</td>
                        <td>{projections.couple_nochildren}</td>
                        <td>{projections.single_parent}</td>
                        <td>
                        <div>
                        <Button
                        color="primary" 
                        href="/react/projection-homes-stats/{projections.province}/{projections.year}">Actualizar
                        </Button>
                        <br/>
                        <br/>      
                                
                        <Button color="danger" on:click={() => {
                            setProvinceDelete(projection.province);
                            setYearDelete(projection.province);
                            toggleOne();
                            }}>Eliminar
                        </Button>
                                
                        </div>
                        </td>
                        </tr>
                        ))}
                        </tbody>
                        </Table>
                        )}

    
        {/* Paginación: 10 resultados por página */}

        <center>

        <Button color = "danger" on:click={previousPage}>Anterior</Button>
        <Button color = "success" on:click={nextPage}>Siguiente</Button>

        </center>

</Container>
</div>
);
}

export default Projections