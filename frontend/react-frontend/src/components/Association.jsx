import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table, Container, Alert, Card, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";

let Association = () => {
    const { province } = useParams();
    const {registration_date } = useParams();
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGoal, setUpdatedGoal] = useState("");
    const [updatedRegistrationDate, setUpdatedRegistrationDate] = useState(registration_date);
    const [updatedCreationDate, setUpdatedCreationDate] = useState("");
    const [updatedZipCode, setUpdatedZipCode] = useState("");
    const [updatedProvince, setUpdatedProvince] = useState(province);
    const [updatedTownshipCode, setUpdatedTownshipCode] = useState("");
    const [messageAlert, setMessageAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [right, setRight] = useState(true);
    const [result, setResult] = useState("");
    const [resultStatus, setResultStatus] = useState("");
    let API = `/api/v2/association-stats/${province}/${registration_date}`;
    

    async function getAssociation() {
        setResultStatus("");
        setResult("");
        setMessageAlert(false);
        try {
            const res = await fetch(API, {
                method: "GET",
            });
            const data = await res.json();
            setResult(JSON.stringify(data, null, 2));
            setUpdatedName(data.name);
            setUpdatedGoal(data.goal);
            setUpdatedRegistrationDate(data.registration_date);
            setUpdatedCreationDate(data.creation_date);
            setUpdatedZipCode(data.zip_code);
            setUpdatedProvince(data.province);
            setUpdatedTownshipCode(data.township_code);
            setResultStatus(res.status);
            setRight(true);
        } catch (error) {
            setRight(false);
            setMessageAlert(true);
            setMessage("La asociación no existe");
            console.log(`Error parsing result: ${error}`);
        }
    }

    useEffect(() => {
        
        getAssociation();
    }, [API]);

    async function updateAssociation() {
        setResultStatus("");
        setResult("");
        setMessageAlert(false);
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updatedName,
                goal: updatedGoal,
                registration_date: updatedRegistrationDate,
                creation_date: updatedCreationDate,
                zip_code: updatedZipCode,
                province: updatedProvince,
                township_code: updatedTownshipCode,
            }),
        });
        const status = await res.status;
        setResultStatus(status);
        if (status === 201) {
            getAssociation();
            setMessageAlert(true);
            setMessage("Asociación actualizada con éxito");
        } else {
            getAssociation();
            setMessageAlert(true);
            setMessage(`Los datos introducidos no son correctos para la asociación de ${province} en el año ${registration_date}`);
        }
    }

    function dismissAlert() {
        setMessageAlert(false);
    }

    return (<div>
        <h2>
            Detalles de la asociación{" "}
            <Button color="primary" href="/react/association-stats">
                Volver a asociaciones
            </Button>
        </h2>

        <Container>
            {messageAlert && (
                <Alert toggle={dismissAlert}>{message}</Alert>
            )}
            {right && (
                <Card className="w-50 p-3 mb-3 mx-auto">
                    <CardTitle>
                        Actualiza la asociación de {province} en el año {registration_date}
                    </CardTitle>
                    <Form onSubmit={updateAssociation}>
                        <FormGroup>
                            <Label htmlFor="name">Nombre de la asociación</Label>
                            <Input
                                required
                                id="name"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                placeholder="Nombre"
                            />

                            <Label htmlFor="goal">Objetivo de la asociación</Label>
                            <Input
                                required
                                id="goal"
                                value={updatedGoal}
                                onChange={(e) => setUpdatedGoal(e.target.value)}
                                placeholder="Objetivo"
                            />

                            <Label htmlFor="province">Provincia</Label>
                            <Input
                                required
                                id="province"
                                value={updatedProvince}
                                onChange={(e) => setUpdatedProvince(e.target.value)}
                                placeholder="Provincia"
                            />

                            <Label htmlFor="registration-date">Año de registro</Label>
                            <Input
                                type="number"
                                required
                                id="registration-date"
                                value={updatedRegistrationDate}
                                onChange={(e) =>
                                    setUpdatedRegistrationDate(Number(e.target.value))
                                }
                                placeholder="0000"
                            />

                            <Label htmlFor="creation-date">Año de creación</Label>
                            <Input
                                type="number"
                                required
                                id="creation-date"
                                value={updatedCreationDate}
                                onChange={(e) =>
                                    setUpdatedCreationDate(Number(e.target.value))
                                }
                                placeholder="0000"
                            />

                            <Label htmlFor="zip-code">Código postal</Label>
                            <Input
                                type="number"
                                required
                                id="zip-code"
                                value={updatedZipCode}
                                onChange={(e) => setUpdatedZipCode(Number(e.target.value))}
                                placeholder="00000"
                            />

                            <Label htmlFor="township-code">Código municipal</Label>
                            <Input
                                type="number"
                                required
                                id="township-code"
                                value={updatedTownshipCode}
                                onChange={(e) =>
                                    setUpdatedTownshipCode(Number(e.target.value))
                                }
                                placeholder="000"
                                className="mb-3"
                            />

                            <Button color="primary" type="submit">
                                Actualizar
                            </Button>
                        </FormGroup>
                    </Form>
                </Card>
            )}
        </Container>

    </div>
    )
}

export default Association;