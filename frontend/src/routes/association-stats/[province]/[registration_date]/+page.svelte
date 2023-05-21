<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import {
        Button,
        Table,
        Container,
        Alert,
        Card,
        CardTitle,
        Form,
        FormGroup,
        Input,
        Label,
    } from "sveltestrap";
    import { page } from "$app/stores";

    onMount(async () => {
        getAssociation();
    });

    let province = $page.params.province;
    let registration_date = $page.params.registration_date;

    let API =
        "/api/v2/association-stats" + "/" + province + "/" + registration_date;

    if (dev) API = "http://localhost:12345" + API;

    let updated_name = "";
    let updated_goal = "";
    let updated_registration_date = registration_date;
    let updated_creation_date = "";
    let updated_zip_code = "";
    let updated_province = province;
    let updated_township_code = "";

    let messageAlert = false;
    let message = "";

    function dismissAlert() {
        messageAlert = false;
    }

    let right = true;

    async function getAssociation() {
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            updated_name = data.name;
            updated_goal = data.goal;
            updated_registration_date = data.registration_date;
            updated_creation_date = data.creation_date;
            updated_zip_code = data.zip_code;
            updated_province = data.province;
            updated_township_code = data.township_code;
            right = true;
        } catch (error) {
            right = false;
            messageAlert = true;
            message = "La asociación no existe";
            console.log(`Error parsing result: ${error}`);
        }
    }

    async function updateAssociation() {
        messageAlert = false;
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updated_name,
                goal: updated_goal,
                registration_date: updated_registration_date,
                creation_date: updated_creation_date,
                zip_code: updated_zip_code,
                province: updated_province,
                township_code: updated_township_code,
            }),
        });
        const status = await res.status;
        if (status == 201) {
            getAssociation();
            messageAlert = true;
            message = "Asociación actualizada con éxito";
        } else {
            getAssociation();
            messageAlert = true;
            message = `Los datos introducidos no son correctos para la asociación de ${province} en el año ${registration_date}`;
        }
    }
</script>

<svelte:head>
    <title>Asociación</title>
</svelte:head>

<h2>
    Detalles de la asociación <Button color="primary" href="/association-stats"
        >Volver a asociaciones</Button
    >
</h2>

<Container>
    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert}>{message}</Alert>
    {/if}
    {#if right}
        <Card class="w-50 p-3 mb-3 mx-auto">
            <CardTitle
                >Actualiza la asociación de {province} en el año {registration_date}
            </CardTitle>
            <Form on:submit={updateAssociation}>
                <FormGroup>
                    <Label for="name">Nombre de la asociación</Label>
                    <Input
                        required
                        id="name"
                        bind:value={updated_name}
                        placeholder="Nombre"
                    />

                    <Label for="goal">Objetivo de la asociación</Label>
                    <Input
                        required
                        id="goal"
                        bind:value={updated_goal}
                        placeholder="Objetivo"
                    />

                    <Label for="province">Provincia</Label>
                    <Input
                        required
                        id="province"
                        bind:value={updated_province}
                        placeholder="Provincia"
                    />

                    <Label for="registration-date">Año de registro</Label>
                    <Input
                        type="number"
                        required
                        id="registration-date"
                        bind:value={updated_registration_date}
                        placeholder="0000"
                    />

                    <Label for="creation-date">Año de creación</Label>
                    <Input
                        type="number"
                        required
                        id="creation-date"
                        bind:value={updated_creation_date}
                        placeholder="0000"
                    />

                    <Label for="zip-code">Código postal</Label>
                    <Input
                        type="number"
                        required
                        id="zip-code"
                        bind:value={updated_zip_code}
                        placeholder="00000"
                    />

                    <Label for="township-code">Código municipal</Label>
                    <Input
                        type="number"
                        required
                        id="township-code"
                        bind:value={updated_township_code}
                        placeholder="000"
                        class="mb-3"
                    />

                    <Button color="primary" type="submit">Actualizar</Button>
                </FormGroup>
            </Form>
        </Card>
    {/if}
</Container>

<style>
    h2 {
        margin-left: 1%;
        margin-top: 0.5%;
    }
</style>
