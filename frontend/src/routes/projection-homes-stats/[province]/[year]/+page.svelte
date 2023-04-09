<script>

    import { onMount } from "svelte";

    import { dev } from "$app/environment";

    import { 
        Button,
        Container,
        Label,
        Input,
        Form,
        FormGroup,
        Card,
        CardTitle,
        Alert,
    } from "sveltestrap";

    import { page } from "$app/stores";

    onMount(async () => {
        getProjection();
    });

    let province = $page.params.province;
    let year = $page.params.year;

    let API = "/api/v2/projection-homes-stats" + "/" + province + "/" + year;

    if (dev) 
    
        API = "https://sos2223-11.ew.r.appspot.com" + API;

    let provinceUpdate = "";
    let yearUpdate = "";
    let coupleChildrenUpdate = "";
    let coupleNoChildrenUpdate = "";
    let singleParentUpdate = "";

    let messageAlert = false;
    let message = "";

    let result = "";
    let resultStatus = "";

    function dismissAlert() {

        messageAlert = false;

    }

    async function getProjection() {

        resultStatus = result = "";

        const res = await fetch(API, {

            method: "GET",

        });

        try {

            const data = await res.json();

            result = JSON.stringify(data, null, 2);

            provinceUpdate = data.province;
            yearUpdate = data.year;
            coupleChildrenUpdate = data.couple_children;
            coupleNoChildrenUpdate = data.couple_nochildren;
            singleParentUpdate = data.single_parent;
            
        } 
        
        catch (error) {

            console.log(`Error parsing result: ${error}`);

        }

        const status = await res.status;
        resultStatus = status;

    }

    async function updateProjection() {

        resultStatus = result = "";

        messageAlert = false;

        const res = await fetch(API, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                province: provinceUpdate,
                year: yearUpdate,
                couple_children: coupleChildrenUpdate,
                couple_nochildren: coupleNoChildrenUpdate,
                single_parent: singleParentUpdate,
            }),
        });

        const status = await res.status;
        resultStatus = status;

        if (status == 201) {

            getProjection();

            messageAlert = true;

            message = "Proyección actualizada";

        } 
        
        else {
            getProjection();

            messageAlert = true;

            message = `Datos introducidos incorrectos para la proyección de ${province} en el año ${year}`;

        }
    }
</script>

<Container>

    {#if messageAlert}
        <Alert dismissible on:dismiss={dismissAlert}>{message}</Alert>

    {/if}
        <Card class="w-50 p-3 mb-3 mx-auto">
            <CardTitle><center>Descripción de la proyección</center></CardTitle>
            <Form on:submit={updateProjection}>
                <FormGroup>
                    <Label for="province">Provincia</Label>
                    <Input required
                        id="province"
                        bind:value={provinceUpdate}
                        placeholder="Province"
                    />

                    <Label for="year">Año</Label>
                    <Input required
                        id="year"
                        bind:value={yearUpdate}
                        placeholder="Año"
                    />

                    <Label for="couple_children">Parejas con hijos</Label>
                    <Input required
                        id="couple_children"
                        bind:value={coupleChildrenUpdate}
                        placeholder="Número de parejas con hijos"
                    />

                    <Label for="couple_nochildren">Parejas sin hijos</Label>
                    <Input required
                        id="couple_nochildren"
                        bind:value={coupleNoChildrenUpdate}
                        placeholder="Número de parejas sin hijos"
                    />

                    <Label for="single_parent">Personas solteras</Label>
                    <Input required
                        id="single_parent"
                        bind:value={singleParentUpdate}
                        placeholder="Número de personas solteras"
                    />

                    <center>
                    <p>
                    <Button color="success" on:click={updateProjection}>Actualizar</Button>
                    </p>
                    </center>

                </FormGroup>
            </Form>
        </Card>
</Container>

