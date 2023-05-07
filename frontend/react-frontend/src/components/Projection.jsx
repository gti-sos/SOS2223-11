// Importaciones 

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Button, Container, Alert, Card, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";

// Variables

let Projection = () => {
    const {province} = useParams();
    const {year} = useParams();
    const [updatedProvince, setUpdatedProvince] = useState(province);
    const [updatedYear, setUpdatedYear] = useState(year);
    const [updatedCoupleChildren, setUpdatedCoupleChildren] = useState("");
    const [updatedCoupleNoChildren, setUpdatedCoupleNoChildren] = useState("");
    const [updatedSingleParent, setUpdatedSingleParent] = useState("");
    const [messageAlert, setMessageAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [right, setRight] = useState(true);
    const [result, setResult] = useState("");
    const [resultStatus, setResultStatus] = useState("");

    // Desactivar mensaje alerta

    function dismissAlert() {

        setMessageAlert(false);

    }

    // Enlace a la web

    let API = `/api/v2/projection-homes-stats/${province}/${year}`;

    // Obtener una proyección dada la provincia y el año

    async function getProjection() {

        setResult('')

        setResultStatus('')

        setMessageAlert(false)

        const res = await fetch(API, {

            method: "GET"

        });

        try {

            const data = await res.json();

            setResult(JSON.stringify(data, null, 2));

            setUpdatedProvince(data.province);
            setUpdatedYear(data.year);
            setUpdatedCoupleChildren(data.couple_children);
            setUpdatedCoupleNoChildren(data.couple_nochildren);
            setUpdatedSingleParent(data.single_parent);
            setResultStatus(res.status);
            setRight(true);
        } 
        
        catch (error) {

            setRight(false);

            setMessageAlert(true);

            setMessage("La proyección no existe");

            console.log(`Error parsing result: ${error}`);

        }

        const status = await res.status;

        setResultStatus(status);

        if(status == 404) {

            setMessageAlert(true);

            setMessage(`La provincia ${province} del año ${year} no ha sido encontrada`);

        }

        if(status == 500) {

            setMessageAlert(true);

            setMessage("Error interno");

        }

    }

    useEffect(() => {

        getProjection();

    }, [API]);

    // Actualizar la proyección seleccionada

    async function updateProjection() {

        setResultStatus("");

        setResult("");

        setMessageAlert(false);

        const res = await fetch(API, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({

                province: updatedProvince,
                year: updatedYear,
                couple_children: updatedCoupleChildren,
                couple_nochildren: updatedCoupleNoChildren,
                single_parent: updatedSingleParent,

            }),

        });

        const status = await res.status;

        setResultStatus(status)

        if (status == 200) {

            setMessageAlert(true)

            setMessage("Proyección actualizada");

            getProjection();

        }

        else if (status == 400) {

            setMessageAlert(true);

            setMessage("Se ha intentado cambiar provincia y año o faltan campos por rellenar");

            getProjection();

        } 

        }

    // Volver a la API principal

    async function view() {

        window.location.href = "https://sos2223-11.appspot.com/projection-homes-stats";

    }

return (

    <div>

<Container>
    
    {setMessageAlert(true) &&

        (<Alert dismissible onDismiss={dismissAlert}>{message}</Alert>)}

    {right && (

    <Card class="w-50 p-3 mb-3 mx-auto">

        <CardTitle><center>Descripción de la proyección</center></CardTitle>

        <Form onSubmit={getProjection}>

        <FormGroup>

        <Label for="province">Provincia</Label>
        <Input id="province" 
        onChange={(e) => setUpdatedProvince(e.target.value)} 
        value={updatedProvince}
        placeholder="Provincia"/>

        <Label for="year">Año</Label>
        <Input id="year" 
        value={updatedYear}
        onChange={(e) => setUpdatedYear(e.target.value)} 
        placeholder="Año"/>

        <Label for="couple_children">Parejas con hijos</Label>
        <Input id="couple_children" 
        value={updatedCoupleChildren}
        onChange={(e) => setUpdatedCoupleChildren(e.target.value)} 
        placeholder="Número de parejas con hijos"/>

        <Label for="couple_nochildren">Parejas sin hijos</Label>
        <Input id="couple_nochildren" 
        value={updatedCoupleNoChildren}
        onChange={(e) => setUpdatedCoupleNoChildren(e.target.value)} 
        placeholder="Número de parejas sin hijos"/>

        <Label for="single_parent">Personas solteras</Label>
        <Input id="single_parent" 
        value={updatedSingleParent}
        onChange={(e) => setUpdatedSingleParent(e.target.value)} 
        placeholder="Número de personas solteras"/>

        <center>

        <div class="buttons" style = "text-align: center">        
                    
        <Button onClick={updateProjection}>Actualizar</Button>

        <Button onClick={view}>Atrás</Button>
    
        </div> 
        </center> 
        </FormGroup>
        </Form>
        </Card>
    )}
    </Container>
    </div>
    )
    }

export default Projection;
