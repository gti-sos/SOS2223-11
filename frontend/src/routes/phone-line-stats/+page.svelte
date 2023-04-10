<script>
import { onMount } from 'svelte';
import { dev } from '$app/environment';
import { Button, Table,ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle,Alert} from 'sveltestrap';

let mensaje = "";
let color = ""
let visible = true
    onMount(async () => {
            getPhones();
        });

    let API = '/api/v2/phone-line-stats'
    if(dev){
            API = 'http://localhost:12345'+API
    }
    
    let phones = []
    let newPhoneProvince = '';
    let newPhoneYear = '';
    let newPhoneLandline = '';
    let newPhonePostPaymentPhoneLine = '';
    let newPhoneWideLandline = "";
    let result = "";
    let resultStatus = "";
 
    async function getPhones () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                phones = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
            // if(status == 200){
            //     mensaje = "Datos listados correctamente";
            //     color = "success";
            // }
        }

        async function createPhone () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    province: newPhoneProvince,
                    year: parseInt(newPhoneYear),
                    landline: parseInt(newPhoneLandline),
                    post_payment_phone_line: parseInt(newPhonePostPaymentPhoneLine),
                    wide_landline: parseInt(newPhoneWideLandline)

                })
            });
            const status = await res.status;
            resultStatus = status;	           
            if(status==201){
                getPhones();
                mensaje = "Se ha creado el dato correctamente";
                color = "success"
            }else if (status == 400){
                mensaje = "Todos los campos deben estar completos y con los datos correctos";
                color = "danger"
            }else if (status == 409){
                mensaje = `El dato ${newPhoneProvince} ${newPhoneYear} ya existe`;
                color = "danger"
            }
        }


        async function deleteAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;	
            if (status == 200) {
            getPhones();
            mensaje = "Se han borrado todos los recursos"
            color = "success"
        }
        }

        async function deletePhone(province, year) {
        resultStatus = result = "";
        const res = await fetch(
            API + "/" + province + "/" + parseInt(year),
            {
                method: "DELETE",
            }
        );
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getPhones();
            mensaje = "El recurso ha sido borrado"
            color = "success" 
        }
    }
    async function loadPhones () {
        if (phones.length > 0 ) {
            mensaje = "Ya existen telefonos creados";
            color = "danger"
        }
        else {
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        if (status == 200) {
            getPhones();
            mensaje = "Asociaciones cargadas con éxito";
            color = "success"
        }
        else {
            mensaje = "No se han podido cargar las asociaciones";
        }
    }
        }


</script>

<h1>Lineas de teléfono</h1>
{#if mensaje != ""}
       <Alert {color} 
       isOpen={visible}
       toggle={() => (visible = false)}
       >{mensaje}</Alert>
{/if}

    <Table>
        <thead>
          <tr>
            <th>Province</th>
            <th>Year</th>
            <th>Landline</th>
            <th>Post_Payment</th>
            <th>Wide_Landline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           <tr>
                <td><input bind:value={newPhoneProvince}></td>
                <td><input bind:value={newPhoneYear}></td>
                <td><input bind:value={newPhoneLandline}></td>
                <td><input bind:value={newPhonePostPaymentPhoneLine}></td>
                <td><input bind:value={newPhoneWideLandline}></td>
                <td><ButtonDropdown>
                    <DropdownToggle color="primary" caret>Acciones</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Header</DropdownItem>
                      <DropdownItem on:click={createPhone} on:click={() => (visible = true)}>Crear recurso</DropdownItem>
                      <DropdownItem on:click={loadPhones}>Cargar telefonos</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem header>Eliminar</DropdownItem>
                      <DropdownItem on:click={deleteAll} on:click={()=>(visible=true)}>Borrar datos</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown></td>
                <!-- <td><Button on:click={createPhone}>Create</Button></td> -->
            </tr>
        <!-- {#if resultStatus === 200} -->
        {#each phones as phone}
          <tr>
            <td><a href="/phone-line-stats/{phone.province}/{phone.year}">{phone.province}</a></td>
            <td>{phone.year}</td>
            <td>{phone.landline}</td>
            <td>{phone.post_payment_phone_line}</td>
            <td>{phone.wide_landline}</td>
            <!-- <td>&nbsp</td> -->
            <td><Button
                color="danger"
                on:click={deletePhone(
                    phone.province,
                    phone.year
                )} on:click={()=>(visible=true)}>Eliminar</Button
            ></td>
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
