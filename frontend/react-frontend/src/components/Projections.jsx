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
    const [provinceDelete, setProvinceDelete] = useState('');
    const [yearDelete, setYearDelete] = useState('');
    const [searchProvince, setSearchProvince] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchCoupleChildren, setSearchCoupleChildren] = useState("");
    const [searchCoupleNoChildren, setSearchCoupleNoChildren] = useState("");
    const [searchSingleParent, setSearchSingleParent] = useState("");
    const [limit, setLimit] = useState("");
    const [offset, setOffset] = useState(0);
    const [messageAlert, setMessageAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [Color, setColor] = useState("");
    const [result, setResult] = useState("");
    const [resultStatus, setResultStatus] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Paginación

    function nextPage() {

        offset += limit;

        getProjection();

    }

    function previousPage() {

        offset = Math.max(offset - limit, 0);

        getProjection();

    }

    // Desactivar alerta de mensaje

    function dismissAlert() {

        setMessageAlert(false);

    }

    // Enseñar o no datos

    function toggleForm() {

        setShowForm(!showForm);

        setMessageAlert(false);

    }

    // Enlace web

    let API = '/api/v2/projection-homes-stats';

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

    // Filtros: Buscar por cualquier campo

    async function getProjectionFilters() {

        const consult = {}; 

        if (setSearchProvince) { 

            consult.province = setSearchProvince; 

        }

        if (setSearchYear) { 

            consult.year = setSearchYear; 

        }

        if (setSearchCoupleChildren) { 

            consult.couple_children = setSearchCoupleChildren; 
                
        }

        if (setSearchCoupleNoChildren) { 

            consult.couple_nochildren = setSearchCoupleNoChildren; 

        }

        if (setSearchSingleParent) { 

            consult.single_parent = setSearchSingleParent; 

        }

        const res = await fetch(API + `?${new URLSearchParams(consult).toString()}`, {

        method: "GET",

        });
            
        try {

            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            projections = data;

        }
            
        catch (error) {

            console.log(`Error parseando el resultado: ${error}`);

        }

        const status = await res.status;

        resultStatus = status;

        if(projections.length > 0) {

             setMessageAlert(true);

             setMessage("Datos mostrados del filtro introducido");

             setColor("success");

        }

        else {

            setMessageAlert(true);

            setMessage("No se han podido encontrar los datos");

            setColor("danger");

        }
    }

    // Limpiar todos los filtros

    async function getDeleteFilters() {

        resultStatus = result = "";

        if(setSearchProvince != "" || setSearchYear != "" || setSearchCoupleChildren != "" 
           || setSearchCoupleNoChildren != "" || setSearchSingleParent != "") {

            setSearchProvince = "";
            setSearchYear = "";
            setSearchCoupleChildren = "";
            setSearchCoupleNoChildren = "";
            setSearchSingleParent = "";

        }

        getProjection();

        return;
        
        }

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

            setColor("success");

        } 
        
        else if (status == 409) {

            setMessageAlert(true);

            setMessage(`Los campos Provincia: ${newProvince} y Año: ${newYear} ya existen`);

            setColor("warning");

        } 
        
        else if (status == 400) {

            setMessageAlert(true);

            setMessage("Faltan campos para crear la proyección");

            setColor("warning");

        } 
        
        else {

            setMessageAlert(true);

            setMessage("No se ha podido crear la proyección");

            getProjection();

            setColor("danger");

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

            setColor("success");

        } 

        else {

            setMessageAlert(true);

            setMessage("No existen proyecciones");

            setColor("danger");

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

            setColor("success");
        
            getProjection();

        }

        else if (status == 500) {

            setMessageAlert(true);

            setMessage("Error interno del servidor");

            setColor("danger");

        }

        else if(status == 404) {

            setMessageAlert(true);

            setMessage(`La proyección de ${province} del año ${year} no ha podido ser eliminada`);

            setColor("danger");
            
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
    <Button color = "danger" onClick={() => {
        deleteProjections();
        toggle();
        }}>Eliminar
    </Button>
    <Button color = "secondary" onClick={toggle}>Cancelar</Button>
    </ModalFooter>
    </Modal>
    
    {/* Alertas proyecciones: Borrar un recurso */}

    <Modal isOpen={openOne} toggle={toggleOne}>
    <ModalHeader toggle={toggleOne}>Atención: Vas a borrar el recurso seleccionado de la base de datos</ModalHeader>
    <ModalBody>¿Estás seguro?</ModalBody>
    <ModalFooter>
    <Button color = "danger" onClick={() => {
        deleteProjection(provinceDelete, yearDelete);
        toggleOne();
        }}>Eliminar
    </Button>
    <Button color = "secondary" onClick={toggleOne}>Cancelar</Button>
    </ModalFooter>
    </Modal>

</h2>

    {/* Formulario para crear una proyección */}

<Container>

    {setMessageAlert(true) &&

        (<Alert color = {Color} dismissible onDismiss={dismissAlert}>{message}</Alert>)}

    {(showForm &&

        <Card class="w-50 p-3 mb-3 mx-auto">

        <CardTitle><center>Cree una proyección</center></CardTitle>

        <Form onSubmit={createProjection}>

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

                        <Button color = "success" type="submit">Crear</Button>

                        <Button color = "info" onClick={view}>Atrás</Button>
                    
                     </div>
                       

                    </center>
        </FormGroup>
        </Form>
        </Card>

    )}

    {!showForm && (

    <h2><center><p>Proyecciones de hogares: {projections.length}</p></center></h2>)};

    {/* --Crear proyeccion */}

    <center>

    <Button id="createProjection" color = "primary" onClick={toggleForm}>Crear Proyección</Button>

    {/* --Cargar proyeccion-- */}

    <Button color = "success" onClick={loadData}>Cargar proyecciones</Button>

    {/* --Borrar proyeccion-- */}

    <Button color = "danger" onClick={toggle}>Eliminar proyecciones</Button>

    {/* --Filtrar campos-- */}

    <Button color = "warning" onClick={getProjectionFilters}>Filtrar</Button>

    {/* --Limpiar filtros-- */}

    {<Button color = "dark" onClick={getDeleteFilters}>Limpiar Filtros</Button>}

    </center>

    {/* --Filtros-- */}

    <div class="filtros">

    <label class="columna">
    Provincia:
    <input onChange={(e) => setSearchProvince(e.target.value)} type="text"/>
    </label>

    <label class="columna">
    Año:
    <input onChange={(e) => setSearchYear(e.target.value)} type="text"/>
    </label>
    
    <label class="columna">
    Parejas con hijos:
    <input onChange={(e) => setSearchCoupleChildren(e.target.value)} type="text"/>
    </label>

    <label class="columna">
    Parejas sin hijos:
    <input onChange={(e) => setSearchCoupleNoChildren(e.target.value)} type="text"/>
    </label>

    <label class="columna">
    Personas solteras:
    <input onChange={(e) => setSearchSingleParent(e.target.value)} type="text"/>
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
                        {projections.map((projection) => (
                            <tr key={`${projection.province}-${projection.year}`}>
                        <td>{projection.province}</td>
                        <td>{projection.year}</td>
                        <td>{projection.couple_children}</td>
                        <td>{projection.couple_nochildren}</td>
                        <td>{projection.single_parent}</td>
                        <td>
                        <div>
                        <Button
                        color = "primary"
                        href="/react/projection-homes-stats/{projections.province}/{projections.year}">Actualizar
                        </Button>
                        <br/>
                        <br/>      
                                
                        <Button color = "danger" onClick={() => {
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
        
        <Button color = "danger" onClick={previousPage}>Anterior</Button>
        <Button color = "success" onClick={nextPage}>Siguiente</Button>

        </center>

</Container>
</div>
);
}

export default Projections