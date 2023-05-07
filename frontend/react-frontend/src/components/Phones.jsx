import React, { useState, useEffect } from 'react';
import {
    Button,
    Table,
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Alert,
  } from "reactstrap";
  //import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
  
  let Phones = () =>{
      console.log("laputa")
    const [dropdownOpen, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [Color, setColor] = useState("");
    const [visible, setVisible] = useState(true);
    const [phones, setPhones] = useState([]);
    const [newPhoneProvince, setNewPhoneProvince] = useState("");
    const [newPhoneYear, setNewPhoneYear] = useState("");
    const [newPhoneLandline, setNewPhoneLandline] = useState("");
    const [newPhonePostPaymentPhoneLine, setNewPhonePostPaymentPhoneLine] =useState("");
    const [newPhoneWideLandline, setNewPhoneWideLandline] = useState("");
    const [offset, setOffset] = useState(0);
    const [result, setResult] = useState("");
    const [resultStatus, setResultStatus] = useState("");
    const [searchProvince, setSearchProvince] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchLandline, setSearchLandline] = useState("");
    const [searchPostPaymentPhoneLine, setSearchPostPaymentPhoneLine] = useState("");
    const [searchWideLandline, setSearchWideLandline] = useState("");

    const toggle = () => setOpen((prevState) => !prevState);


    let API = "/api/v2/phone-line-stats";

    useEffect(() => {
      getPhones();
    }, []);


    
    async function getPhones() {
        setResultStatus("");
        setResult("");
        const res = await fetch(API+"?limit="+10+"&offset="+offset, {
            method: "GET",
        });
        try {
            const data = await res.json();
            setResult(JSON.stringify(data, null, 2));
            setPhones(data);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        setResultStatus(status);
    }
  
    async function loadPhones() {
        if (phones.length > 0) {
           setMensaje("Ya existen telefonos creados");
            setColor("danger");
        } else {
            const res = await fetch(API + "/loadInitialData", {
                method: "GET",
            });
            const status = await res.status;
            if (status == 200) {
                getPhones();
                setMensaje ("telefonos cargados con éxito");
                setColor("success");
            } else {
               setMensaje("No se han podido cargar los telefonos");
            }
        }
    }

    async function createPhone() {
        setResultStatus(""); 
        setResult("");
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
        setResultStatus(status);
        if (status == 201) {
            getPhones();
            setMensaje("Se ha creado el dato correctamente");
            setColor("success");
        } else if (status == 400) {
            setMensaje ("Todos los campos deben estar completos y con los datos correctos");
            setColor("danger");
        } else if (status == 409) {
            setMensaje(`El dato ${newPhoneProvince} ${newPhoneYear} ya existe`);
            setColor("danger");
        }
    }

    async function deleteAll() {
        setResultStatus(""); 
        setResult("");
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        setResultStatus(status);
        if (status == 200) {
            setOffset (0);
            getPhones();
            setMensaje("Se han borrado todos los recursos");
            setColor("success");
        }
    }

    async function deletePhone(province, year) {
        setResultStatus(""); 
        setResult("");
        const res = await fetch(API + "/" + province + "/" + parseInt(year), {
            method: "DELETE",
        });
        const status = await res.status;
        setResultStatus(status);
        if (status == 200) {
            getPhones();
            setMensaje( "El recurso ha sido borrado");
            setColor("success");
        }
    }
return (
    <div>
        <h1>Lineas de teléfono</h1>
        {mensaje != "" &&(
        <Alert color={Color} isOpen={visible} toggle={() => (setVisible(false))}
        >{mensaje}</Alert>)
    }

   { /*faltan los botones para paginacion*/}
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
        <tr >
            <td><input value={newPhoneProvince} onChange={(p)=> setNewPhoneProvince(p.target.value)}/></td>
            <td><input value={newPhoneYear} onChange={(p)=> setNewPhoneYear(p.target.value)}/></td>
            <td><input value={newPhoneLandline} onChange={(p)=> setNewPhoneLandline(p.target.value)}/></td>
            <td><input value={newPhonePostPaymentPhoneLine} onChange={(p)=> setNewPhonePostPaymentPhoneLine(p.target.value)}/></td>
            <td><input value={newPhoneWideLandline} onChange={(p)=> setNewPhoneWideLandline(p.target.value)}/></td>
            <td
                ><ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle color="primary" caret>
                        Acciones
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem
                            onClick={() => {setVisible(true);
                                createPhone();}}>
                                Crear recurso
                        </DropdownItem>
                        <DropdownItem  onClick={loadPhones}>Cargar telefonos
                        </DropdownItem >
                        {/*
                        <DropdownItem onClick={() => {setVisible(true); 
                        searchPhones(newPhoneProvince,newPhoneYear,newPhoneLandline,newPhonePostPaymentPhoneLine,newPhoneWideLandline);}}
                            >Buscar telefonos</DropdownItem
                        >
                        */}
                        <DropdownItem divider/>
                        <DropdownItem header>Eliminar</DropdownItem>
                        <DropdownItem
                            onClick={() => {setVisible(true);
                                deleteAll()}}
                            >Borrar datos</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown></td>
        </tr>
        {phones.map((phone)=>(
            <tr key={`${phone.province}-${phone.year}`}>
                <td>
                    <a href={`/react/phone-line-stats/${phone.province}/${phone.year}`}>
                        {phone.province}</a>
                </td>
                <td>{phone.year}</td>
                <td>{phone.landline}</td>
                <td>{phone.post_payment_phone_line}</td>
                <td>{phone.wide_landline}</td>
                <td
                    ><Button color="danger" onClick={() => {
                        setVisible(true);
                        deletePhone(phone.province, phone.year);
                    }}>Eliminar</Button>
                    </td>
            </tr>
        ))} 
    </tbody>
</Table>  
    </div>
);

}

export default Phones