import React, { createElement, useState } from 'react'
import './Qrcode.css'

function Qrcode() {  
    const [img,setImg] =useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("")
    const [size, setSize]= useState("")
     async function generateQR(){
        setLoading(true);
        try {
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }catch (error) {
            console.error("error in generating QRcode",error);
        }finally{
            setLoading(false);
        }
    }

    function downloadQR(){
        fetch(img)
        .then((response)=> response.blob())
        .then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrCode1.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } );
    }
  return (
    <div className='app-Container'>
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className='qr-image' />}
    {/*link */}
    <div>
    <label htmlFor='datainput' className='label-input'>Enter the link:</label>
    <input type='text' id='datainput' placeholder='Enter the link' onChange={(e) => {
        setQrData(e.target.value)
    }}/>

    {/*Size */}
    <label htmlFor='Size-input' className='label-input'>Enter the Size (eg: 150):</label>
    <input type='text' id='Size-input' placeholder='Enter the Size' onChange={(i) => {
        setSize(i.target.value)
    }}/>

    <button className='primary' onClick={generateQR}>Generate QR Code</button>
    <button className='secondary' onClick={downloadQR}>Download QR code</button>
    </div>
    </div>
  )
}

export default Qrcode
