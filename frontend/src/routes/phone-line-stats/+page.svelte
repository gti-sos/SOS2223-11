<script>
import { onMount } from 'svelte';
import { dev } from '$app/environment';
import { Button, Table,ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'sveltestrap';

    onMount(async () => {
            getPhones();
        });

    let API = '/api/v1/phone-line-stats'
    if(dev){
            API = 'http://localhost:12345'+API
    }
    
    let phones = []
    let newPhoneProvince = 'province';
    let newPhoneYear = 'year';
    let newPhoneLandline = 'landline';
    let newPhonePostPaymentPhoneLine = 'post_payment';
    let newPhoneWideLandline = "wide_landline";
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
           /*
            if(status==201){
                getContacts();
            }*/
        }


        async function deleteAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;	
        }


</script>

<h1> Phone Lines</h1>
    
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
                    <DropdownToggle color="primary" caret>Actions</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Header</DropdownItem>
                      <DropdownItem on:click={createPhone}>Crear reecurso</DropdownItem>
                      <DropdownItem on:click={getPhones}>Listar Datos</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem on:click={deleteAll}>Borrar todo</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown></td>
                <!-- <td><Button on:click={createPhone}>Create</Button></td> -->
            </tr>
        {#if resultStatus === 200}
        {#each phones as phone}
          <tr>
            <td>{phone.province}</td>
            <td>{phone.year}</td>
            <td>{phone.landline}</td>
            <td>{phone.post_payment_phone_line}</td>
            <td>{phone.wide_landline}</td>
            <!-- <td>&nbsp</td> -->
          </tr>
          {/each}
          {/if} 
        </tbody>
      </Table>

      
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if}