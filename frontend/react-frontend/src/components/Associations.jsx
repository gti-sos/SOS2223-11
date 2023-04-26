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

const Associations = () => {
    const [open, setOpen] = useState(false);
    const [openOne, setOpenOne] = useState(false);
    const [associations, setAssociations] = useState([]);
    const [newName, setNewName] = useState('');
    const [newGoal, setNewGoal] = useState('');
    const [newRegistrationDate, setNewRegistrationDate] = useState('');
    const [newCreationDate, setNewCreationDate] = useState('');
    const [newZipCode, setNewZipCode] = useState('');
    const [newProvince, setNewProvince] = useState('');
    const [newTownshipCode, setNewTownshipCode] = useState('');
    const [provinceDelete, setProvinceDelete] = useState('');
    const [registrationDateDelete, setRegistrationDateDelete] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');
    const [resultStatus, setResultStatus] = useState('');
    const [showForm, setShowForm] = useState(false);

    function dismissAlert() {
        setMessageAlert(false);
    }

    function toggleForm() {
        setShowForm(!showForm);
        setMessageAlert(false);
    }

    const API = '/api/v2/association-stats';
    const dev = false;

    useEffect(() => {
        getAssociations();
    }, []);

    const toggle = () => setOpen(!open);
    const toggleOne = () => setOpenOne(!openOne);

    const getAssociations = async () => {
        setResultStatus('');
        setResult('');
        const res = await fetch(API, {
            method: 'GET',
        });
        try {
            const data = await res.json();
            setResult(JSON.stringify(data, null, 2));
            setAssociations(data);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        setResultStatus(status);
    };

    const loadData = async () => {
        setMessageAlert(false);
        if (associations.length > 0) {
            setMessageAlert(true);
            setMessage('Ya existen asociaciones creadas');
        } else {
            const res = await fetch(API + '/loadInitialData', {
                method: 'GET',
            });
            const status = await res.status;
            if (status == 200) {
                getAssociations();
                setMessageAlert(true);
                setMessage('Asociaciones cargadas con éxito');
            } else {
                setMessageAlert(true);
                setMessage('No se han podido cargar las asociaciones');
            }
        }
    };

    const reload = async () => {
        setMessageAlert(false);
        try {
            getAssociations();
            setMessageAlert(true);
            setMessage('Lista de asociaciones recargada con éxito');
        } catch (error) {
            setMessageAlert(true);
            setMessage('No se ha podido recargar la lista de asociaciones');
        }
    };

    async function createAssociation() {
        setResultStatus('');
        setResult('');
        setMessageAlert(false);
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
        resultStatus = status;
        if (status === 201) {
            getAssociations();
            toggleForm();
            setMessageAlert(true);
            setMessage(`La asociación de ${newProvince} del año ${newRegistrationDate} ha sido creada con éxito`);
        } else if (status === 409) {
            setMessageAlert(true);
            setMessage(`La asociación de ${newProvince} del año ${newRegistrationDate} ya existe`);
            getAssociations();
            // Poner aqui el 400
        } else if (
            newName === "" ||
            newGoal === "" ||
            newRegistrationDate === "" ||
            newCreationDate === "" ||
            newZipCode === "" ||
            newProvince === "" ||
            newTownshipCode === ""
        ) {
            setMessageAlert(true);
            setMessage("Faltan campos para crear la asociación");

            //getAssociation();
        } else {
            setMessageAlert(true);
            setMessage("No se ha podido crear la asociación");
            getAssociations();
        }
    }

    async function deleteAssociations() {
        setResultStatus("");
        setResult("");
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        setResultStatus(status);
        if (status === 200) {
            getAssociations();
            setMessageAlert(true);
            setMessage("Se han eliminado todas las asociaciones");
        } else if (status === 404) {
            setMessageAlert(true);
            setMessage("No existen asociaciones que eliminar");
        } else {
            getAssociations();
            setMessageAlert(true);
            setMessage("Error eliminando las asociaciones");
        }
    }

    async function deleteAssociation(province, registration_date) {
        setResultStatus("");
        setResult("");
        const res = await fetch(
            API + "/" + province + "/" + registration_date,
            {
                method: "DELETE",
            }
        );
        const status = await res.status;
        setResultStatus(status);
        if (status === 200) {
            getAssociations();
            setMessageAlert(true);
            setMessage(`La asociación de ${province} del año ${registration_date} ha sido eliminada`);
        } else if (status === 404) {
            setMessageAlert(true);
            setMessage(`La asociación de ${province} del año ${registration_date} no ha podido ser eliminada`);
        }
    }
    return (
        <div>
            <h2>
                Asociaciones de andalucía
                <Button id="createAssociation" color="success" onClick={toggleForm}>Crear asociación</Button>
                <Button color="primary" onClick={loadData}>Cargar asociaciones</Button>
                <Button color="primary" onClick={reload}>Recargar asociaciones</Button>
                <Button color="primary" href="/react/association-stats/search">Filtrar asociaciones</Button>
                <Button color="danger" onClick={toggle}>Borrar asociaciones</Button>
                <Modal isOpen={open} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Vas a borrar todos los recursos de la base de datos</ModalHeader>
                    <ModalBody>¿Estás seguro?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            deleteAssociations();
                            toggle();
                        }}>Proceder</Button>
                        <Button color="secondary" onClick={toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openOne} toggle={toggleOne}>
                    <ModalHeader toggle={toggleOne}>Vas a borrar el recurso seleccionado de la base de datos</ModalHeader>
                    <ModalBody>¿Estás seguro?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            deleteAssociation(provinceDelete, registrationDateDelete);
                            toggleOne();
                        }}>Proceder</Button>
                        <Button color="secondary" onClick={toggleOne}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </h2>
            <Container>
                {messageAlert && (
                    <Alert toggle={dismissAlert}>{message}</Alert>
                )}
                {showForm && (
                    <Card className="w-50 p-3 mb-3 mx-auto">
                        <CardTitle>Crea una asociación</CardTitle>
                        <Form onSubmit={createAssociation}>
                            <FormGroup>
                                <Label for="name">Nombre de la asociación</Label>
                                <Input
                                    required
                                    id="name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Nombre"
                                />

                                <Label for="goal">Objetivo de la asociación</Label>
                                <Input
                                    required
                                    id="goal"
                                    value={newGoal}
                                    onChange={(e) => setNewGoal(e.target.value)}
                                    placeholder="Objetivo"
                                />

                                <Label for="province">Provincia</Label>
                                <Input
                                    required
                                    id="province"
                                    value={newProvince}
                                    onChange={(e) => setNewProvince(e.target.value)}
                                    placeholder="Provincia"
                                />

                                <Label for="registration-date">Año de registro</Label>
                                <Input
                                    type="number"
                                    required
                                    id="registration-date"
                                    value={newRegistrationDate}
                                    onChange={(e) => setNewRegistrationDate(e.target.value)}
                                    placeholder="0000"
                                />

                                <Label for="creation-date">Año de creación</Label>
                                <Input
                                    type="number"
                                    required
                                    id="creation-date"
                                    value={newCreationDate}
                                    onChange={(e) => setNewCreationDate(e.target.value)}
                                    placeholder="0000"
                                />
                                <Label for="zip-code">Código postal</Label>
                                <Input
                                    type="number"
                                    required
                                    id="zip-code"
                                    value={newZipCode}
                                    onChange={(e) => setNewZipCode(e.target.value)}
                                    placeholder="0000"
                                />
                                <Label for="township-code">Código municipal</Label>
                                <Input
                                    type="number"
                                    required
                                    id="township-code"
                                    value={newTownshipCode}
                                    onChange={(e) => setNewTownshipCode(e.target.value)}
                                    placeholder="0000"
                                />
                                <Button color="success" type="submit">Crear</Button>
                            </FormGroup>
                        </Form>
                    </Card>
                )}
                {!showForm && (
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
                            {associations.map((association) => (
                                <tr key={`${association.province}-${association.registration_date}`}>
                                    <td>{association.name}</td>
                                    <td>{association.goal}</td>
                                    <td>{association.registration_date}</td>
                                    <td>{association.creation_date}</td>
                                    <td>{association.zip_code}</td>
                                    <td>{association.province}</td>
                                    <td>{association.township_code}</td>
                                    <td>
                                        <div>
                                            <Button>
                                                <a
                                                    className="linkStyleless"
                                                    href={`/react/association-stats/${association.province}/${association.registration_date}`}
                                                >
                                                    Editar
                                                </a>
                                            </Button>
                                            <br />
                                            <br />

                                            <Button
                                                color="danger"
                                                onClick={() => {
                                                    setProvinceDelete(association.province);
                                                    setRegistrationDateDelete(association.registration_date);
                                                    toggleOne();
                                                }}
                                            >
                                                Borrar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </div>
    );


}

export default Associations;