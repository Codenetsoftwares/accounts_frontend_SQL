import React, { useState } from 'react';
import { useAuth } from '../../Utils/Auth';
import TransactionSercvice from '../../Services/TransactionSercvice';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Backgroundimage from "../../Assets/backgroundImage.jpg";
const EditTransaction = () => {
    const auth = useAuth();
    const { id } = useParams();
    const [transactionId, setTransactionId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

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
        };
        console.log(id, data)
        TransactionSercvice.editTransactionData(id, data, auth.user)
            .then((response) => {
                console.log(response.data);
                toast.success("Transaction Created Successfully!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed! Transaction ID Does Not Exists");
            });
    };

    const inputStyle = {
        width: "100%",
        padding: "0.5rem",
        borderRadius: "2rem",
        border: "1px solid #ccc",
        marginBottom: "1rem",
        // border:'2px solid green'
    };

    const buttonStyle = {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "2rem",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
        // border:'2px solid black'
    };
    const backgroundImageStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.6,
        backgroundImage: `url(${Backgroundimage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: -1,
        // border:
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="transactionId">
                        <h5>Transaction ID</h5>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="transactionId"
                        name="transactionId"
                        onChange={handleTransactionIdChange}
                        placeholder="Transaction ID"
                        style={inputStyle}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">
                        <h5>Amount</h5>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        onChange={handleAmountChange}
                        placeholder="Amount"
                        style={inputStyle}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="PaymentMethod">
                        <h5>paymentMethod</h5>
                    </label>
                    <select
                        class="form-select"
                        style={inputStyle}
                        onChange={handlePaymentMethodChange}
                    >
                        <option selected>Open this select menu</option>
                        <option value="GPAy">GPAy</option>
                        <option value="PhonePay">PhonePay</option>
                        <option value="Paytm">Paytm</option>
                        <option value="bank">bank</option>
                        <option value="others">others</option>
                    </select>
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={buttonStyle}
                    >
                        Submit Transaction
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTransaction;