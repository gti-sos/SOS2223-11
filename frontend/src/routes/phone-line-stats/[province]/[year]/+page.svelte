<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table, Alert } from "sveltestrap";
    import { page } from "$app/stores";

    let mensaje = "";
    let color = "";
    let visible = true;
    onMount(async () => {
        getPhone();
    });
    let province = $page.params.province;
    let year = parseInt($page.params.year);
    let API = "/api/v2/phone-line-stats/" + province + "/" + year;
    let updatedPhoneLandline = "";
    let updatedPhonePostPaymentPhoneLine = "";
    let updatedPhoneWideLandline = "";
    let result = "";
    let resultStatus = "";
    let phone = {};
    if (dev) {
        API = "http://localhost:12345" + API;
    }

    async function getPhone() {
        console.log(updatedPhoneLandline)
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            phone = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 404) {
            mensaje = `El recurso ${province} ${year} no existe`;
            color = "danger";
        }
    }

    async function updatePhone() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                province: province,
                year: year,
                landline: parseInt(updatedPhoneLandline),
                post_payment_phone_line: parseInt(
                    updatedPhonePostPaymentPhoneLine
                ),
                wide_landline: parseInt(updatedPhoneWideLandline),
            }),
        });
        const status = await res.status;
        resultStatus = status;

        if (status == 200) {
            mensaje = "Dato actualizado";
            color = "success";
            getPhone();
        } else if (status == 400) {
            mensaje = "Los datos introducidos son incorrectos ";
            color = "danger";
        }
    }
</script>

<h1>Lineas de teléfono</h1>
<!-- {#if mensaje != ""}
       <Alert {color} 
       isOpen={visible}
       toggle={() => (visible = false)}
       >{mensaje}</Alert>
{/if} -->
{#if mensaje != ""}
    <Alert {color} isOpen={visible} toggle={() => (visible = false)}
        >{mensaje}</Alert
    >
{/if}

{#if resultStatus != 404}
    <Table>
        <thead>
            <tr>
                <th>Provincia</th>
                <th>Año</th>
                <th>Telefonia Fija</th>
                <th>PosPago</th>
                <th>Telefonia Fija Ancha</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{province}</td>
                <td>{year}</td>
                <td><input bind:value={updatedPhoneLandline}/></td>
                <td><input bind:value={updatedPhonePostPaymentPhoneLine} /></td>
                <td><input bind:value={updatedPhoneWideLandline} /></td>
                <td
                    ><Button
                        on:click={updatePhone}
                        on:click={() => (visible = true)}>Actualizar</Button
                    ></td>
            </tr>
            <tr>
                <td>{phone.province}</td>
                <td>{phone.year}</td>
                <td>{phone.landline}</td>
                <td>{phone.post_payment_phone_line}</td>
                <td>{phone.wide_landline}</td>
            </tr>
        </tbody>
    </Table>
{/if}