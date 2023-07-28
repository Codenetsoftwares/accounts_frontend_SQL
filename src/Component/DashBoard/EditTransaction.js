import React, { useState } from 'react';
import { useAuth } from '../../Utils/Auth';
import TransactionSercvice from '../../Services/TransactionSercvice';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import "./EditTransaction.css";
import EditIcon from "../../Assets/edit-iconii.png";
const EditTransaction = () => {
    const auth = useAuth();
    console.log("This is Auth",auth);
    const { id } = useParams();
    const [transactionId, setTransactionId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const navigate = useNavigate();

    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: transactionId,
            amount: amount,
            paymentMethod: paymentMethod, 
            email: auth.user.email
        };
        console.log(id, data)
        TransactionSercvice.editTransactionData(id, data, auth.user)
            .then((response) => {
                console.log(response.data);
                if(transactionId.length && amount.length && paymentMethod.length>0){                 
                    toast.success("Edit Request Send Successfully!");
                    navigate("/admindash");
                }
                else{
                    toast.error("Please Fill In All The Required Fields");
                }
               
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed! Invalid Data");
            });
            
    };




    return (
        <div className='EditTransaction'>
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
       
        <div className="wrapper" style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                         
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}>
        <div className="logo">
            <img src={EditIcon} alt=""/>
        </div>
        <div className="text-center mt-4 name">
            Edit Transction
        </div>
        <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
               
               <input placeholder="Eamil" disabled value={auth.user.email}/>
           </div>
            <div className="form-field d-flex align-items-center">
                
                <input type="text"  placeholder="Amount" onChange={handleAmountChange}/>
            </div>
            <div className="form-field d-flex align-items-center">
               
                <input  placeholder="Transaction ID" onChange={ handleTransactionIdChange}/>
            </div>
            <div className="form-field d-flex align-items-center">
                
                <select
                        className="form-select"
                        onChange={handlePaymentMethodChange}   
                    >
                        <option selected>PaymentMethod</option>
                        <option value="GPAy">GPAy</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Bank">Bank</option>
                        <option value="others">others</option>
                    </select>
            </div>
            <button className="btn mt-3" onClick={handleSubmit}>Submit</button>
        </form>
        
    </div>
    </div>
   
    )
}

export default EditTransaction;