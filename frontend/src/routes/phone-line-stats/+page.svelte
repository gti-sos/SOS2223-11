<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import {
        Button,
        Table,
        ButtonDropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Alert,
    } from "sveltestrap";
 

    let mensaje = "";
    let color = "";
    let visible = true;
    onMount(async () => {
        getPhones();
    });

    

    let API = "/api/v2/phone-line-stats";
    if (dev) {
        API = "http://localhost:12345" + API;
    }

    let phones = [];
    let newPhoneProvince = "";
    let newPhoneYear = "";
    let newPhoneLandline = "";
    let newPhonePostPaymentPhoneLine = "";
    let newPhoneWideLandline = "";
    let offset = 0
    let result = "";
    let resultStatus = "";
    let searchProvince = "";
    let searchYear = "";
    let searchLandline = "";
    let searchPostPaymentPhoneLine = "";
    let searchWideLandline = "";
    let p = "";
    let y = ""
    let land = "";
    let post = "";
    let wide = "";
    async function getPhones() {
        resultStatus = result = "";
        const res = await fetch(API+"?limit="+10+"&offset="+offset, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            phones = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function createPhone() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                province: newPhoneProvince.trim(),
                year: parseInt(newPhoneYear),
                landline: parseInt(newPhoneLandline),
                post_payment_phone_line: parseInt(newPhonePostPaymentPhoneLine),
                wide_landline: parseInt(newPhoneWideLandline),
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getPhones();
            mensaje = "Se ha creado el dato correctamente";
            color = "success";
        } else if (status == 400) {
            mensaje =
                "Todos los campos deben estar completos y con los datos correctos";
            color = "danger";
        } else if (status == 409) {
            mensaje = `El dato ${newPhoneProvince} ${newPhoneYear} ya existe`;
            color = "danger";
        }
    }

    async function deleteAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            offset = 0;
            getPhones();
            mensaje = "Se han borrado todos los recursos";
            color = "success";
        }
    }

    async function deletePhone(province, year) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + province + "/" + parseInt(year), {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getPhones();
            mensaje = "El recurso ha sido borrado";
            color = "success";
        }
    }
    async function loadPhones() {
        if (phones.length > 0) {
            mensaje = "Ya existen telefonos creados";
            color = "danger";
        } else {
            const res = await fetch(API + "/loadInitialData", {
                method: "GET",
            });
            const status = await res.status;
            if (status == 200) {
                getPhones();
                mensaje = "telefonos cargadas con éxito";
                color = "success";
            } else {
                mensaje = "No se han podido cargar las telefonos";
            }
        }
    }

    async function searchPhones(province,year,landline,post_payment_phone_line,wide_landline){
      
        const res = await fetch(API+"?year="+year+"&province="+province+"&landline_over="+landline+"&post_payment_phone_line_over="+post_payment_phone_line+"&wide_landline_over="+wide_landline+"&limit="+10+"&offset="+offset,{
            method: "GET"
        });
        const status = await res.status;
        const data = await res.json(); 
        //console.log("Tamaño de datos "+phones.length)
        console.log("El parametro provincia es :  "+newPhoneProvince)
        if (status == 200){
            if(data.length!==0 && offset>=0){
            phones = data; 
            result = JSON.stringify(data, null, 2);   
            mensaje = "Operacion realizada con exito";
            color = "success";
            }else if (data.length===0 && offset!==0){
                offset -= 10
                console.log(`Ya no hay mas datos, llegaste a la ultima pagina`);
                mensaje = `Ya no hay mas datos, llegaste a la ultima pagina`;    
                color = "danger"; 
            }
            else if(data.length == 0){
            mensaje = `No se encontro ninguna dato con estas caracteristicas`;
            color = "danger";    
            }else
            {

            mensaje = `Numero de datos encontrados ${phones.length}`;
            color = "success";
        }
        }

    }
    /*
    async function getPaginacion(offset){
        const res = await fetch (API+"?limit="+10+"&offset="+offset,{
            method: "GET"
        });
        const status = await res.status;
        result = JSON.stringify(data, null, 2);
        phones = data;
    }
    */
    async function siguiente(){
      //comentario
        offset +=10;
        console.log("tamaño de los telefonos: "+phones.length);
        console.log("tamaño offset: "+offset);
        
        searchPhones(p,y,land,post,wide);
       
        /*
        if(phones.length === 10){
            console.log(phones.length);
            offset = offset + 10;
            searchPhones();
            console.log(offset)
    }
     */
    }
    async function anterior(){
        if (offset >= 10){
            offset = offset-10;
            console.log("Tamaño del offset: "+ offset);
            searchPhones(p,y,land,post,wide);  
            }

    }
    async function actualiza_valores (province,year,landline,post_payment_phone_line,wide_landline){
    p = province;
    y = year;
    land = landline;
    post = post_payment_phone_line;
    wide = wide_landline;
    searchPhones(p,y,land,post,wide);  
    }

</script>
<svelte:head>
    <title>Lineas telefonicas</title>
</svelte:head>
<h1>Lineas de teléfono</h1>
{#if mensaje != ""}
    <Alert {color} isOpen={visible} toggle={() => (visible = false)}
        >{mensaje}</Alert
    >
{/if}
<Button on:click={siguiente} on:click={() => (visible = true)}>Siguiente</Button>
<Button on:click={anterior} on:click={() => (visible = true)}>Anterior</Button>
<Button id=carga on:click={loadPhones} color="primary" on:click={() => (visible = true)}>Cargar Telefonos</Button>
<Table>
    <!-- <thead>
        <td><Button></Button></td>
        <td><Button on:click={anterior}>Anterior</Button></td>
    </thead> -->
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
            <td><input bind:value={searchProvince} /></td>
            <td><input bind:value={searchYear} /></td>
            <td><input bind:value={searchLandline} /></td>
            <td><input bind:value={searchPostPaymentPhoneLine} /></td>
            <td><input bind:value={searchWideLandline} /></td>
            <td><Button on:click={actualiza_valores(searchProvince,searchYear,searchLandline,searchPostPaymentPhoneLine,searchWideLandline)} on:click={() => (visible = true)}>Buscar</Button></td>
        </tr>
        <tr>
            <td><input bind:value={newPhoneProvince} /></td>
            <td><input bind:value={newPhoneYear} /></td>
            <td><input bind:value={newPhoneLandline} /></td>
            <td><input bind:value={newPhonePostPaymentPhoneLine} /></td>
            <td><input bind:value={newPhoneWideLandline} /></td>
            <td
                ><ButtonDropdown id=acciones>
                    <DropdownToggle  color="primary" caret
                        >Acciones</DropdownToggle
                    >
                    <DropdownMenu id=menu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem
                            on:click={createPhone}
                            on:click={() => (visible = true)}
                            >Crear recurso</DropdownItem
                        >
                        <DropdownItem divider/>
                        <DropdownItem header>Eliminar</DropdownItem>
                        <DropdownItem id=Borrar
                            on:click={deleteAll}
                            on:click={() => (visible = true)}
                            >Borrar datos</DropdownItem
                        >
                    </DropdownMenu>
                </ButtonDropdown></td
            >
        </tr>
        <!-- {#if resultStatus === 200} -->
        {#each phones as phone}
            <tr class="phoneRow">
                <td
                    ><a href="/phone-line-stats/{phone.province}/{phone.year}"
                        >{phone.province}</a
                    ></td
                >
                <td>{phone.year}</td>
                <td>{phone.landline}</td>
                <td>{phone.post_payment_phone_line}</td>
                <td>{phone.wide_landline}</td>
                <!-- <td>&nbsp</td> -->
                <td
                    ><Button
                        color="danger"
                        on:click={deletePhone(phone.province, phone.year)}
                        on:click={() => (visible = true)}>Eliminar</Button
                    ></td
                >
            </tr>
        {/each}
    </tbody>
</Table>
<!-- {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if} -->
