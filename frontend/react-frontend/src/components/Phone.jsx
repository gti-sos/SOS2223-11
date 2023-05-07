import { useState, useEffect } from 'react';
import { Button, Table, Alert } from 'reactstrap';
import { useParams } from "react-router-dom";
console.log("Su puta madre");

let Phone = ()=>{
    console.log("hello mai frend");
  const { province } = useParams(); 
  const {year} = useParams(); 
  const [mensaje, setMensaje] = useState('');
  const [color, setColor] = useState('');
  const [visible, setVisible] = useState(true);
  const [phone, setPhone] = useState({});
  const [updatedPhoneLandline, setUpdatedPhoneLandline] = useState('');
  const [updatedPhonePostPaymentPhoneLine, setUpdatedPhonePostPaymentPhoneLine] = useState('');
  const [updatedPhoneWideLandline, setUpdatedPhoneWideLandline] = useState('');
  const [result, setResult] = useState('');
  const [resultStatus, setResultStatus] = useState('');

  let API = "/api/v2/phone-line-stats/" + province + "/" + year;

  async function getPhone() {
    setResultStatus(""); 
    setResult("");
    const res = await fetch(API, {
        method: "GET",
    });
    try {
        const data = await res.json();
        setResult(JSON.stringify(data, null, 2));
        setPhone(data);
    } catch (error) {
        console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    setResultStatus(status);
    if (status == 404) {
        setMensaje (`El recurso ${province} ${year} no existe`);
        setColor("danger");
    }
}
useEffect(() => {
        
    getPhone();
}, [API]);

async function updatePhone() {
    setResultStatus(""); 
    setResult("");
    const res = await fetch(API, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            province: province,
            year: parseInt(year),
            landline: parseInt(updatedPhoneLandline),
            post_payment_phone_line: parseInt(
                updatedPhonePostPaymentPhoneLine
            ),
            wide_landline: parseInt(updatedPhoneWideLandline),
        }),
    });
    const status = await res.status;
    setResultStatus (status);

    if (status == 200) {
        setMensaje( "Dato actualizado");
        setColor("success");
        getPhone();
    } else if (status == 400) {
        setMensaje( "Los datos introducidos son incorrectos ");
        setColor("danger");
    }
}

return (
<>
{ mensaje != ""&&(
    <Alert color={color} isOpen={visible} toggle={() => (setVisible(false))}>
        {mensaje}</Alert>
)}
    

{resultStatus != 404 &&(
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
            <td>{province}</td>
            <td>{year}</td>
            <td><input value={updatedPhoneLandline} onChange={(p)=> setUpdatedPhoneLandline(p.target.value)}/></td>
            <td><input value={updatedPhonePostPaymentPhoneLine} onChange={(p)=> setUpdatedPhonePostPaymentPhoneLine(p.target.value)}/></td>
            <td><input value={updatedPhoneWideLandline} onChange={(p)=> setUpdatedPhoneWideLandline(p.target.value)}/></td>
            <td
                ><Button
                    
                    onClick={() => {setVisible(true);updatePhone()}}>Actualizar</Button>
                    </td>
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
)
    }
</>
)
}

export default Phone;