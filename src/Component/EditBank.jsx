import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./DashBoard/EditTransaction.css";
import EditIcon from "../Assets/edit-iconii.png"
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";

const EditBank = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    console.log("This is Auth", auth);
    const { id } = useParams();
    const [bname, setBname] = useState("");
    const [accno, setAccno] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [hname, setHname] = useState("");
    const [upi, setUpi] = useState("");
    const [upiName, setUpiName] = useState("");
    const [upiPhoneNumber, setUpiPhoneNumber] = useState("");

    useEffect(() => {
        AccountService.singlebank(id, auth.user).then((res) => {
            console.log(res.data);
            setBname(res.data.bankName)
            setAccno(res.data.accountNumber)
            setIfsc(res.data.ifscCode)
            setHname(res.data.accountHolderName)
            setUpi(res.data.upiId)
            setUpiName(res.data.upiAppName)
            setUpiPhoneNumber(res.data.upiNumber)
        });
    }, []);

    console.log(bname)
    const bnamechnage = (e) => {
        setBname(e.target.value);
    };
    const accnochnage = (e) => {
        setAccno(e.target.value);
    };
    const ifscchnage = (e) => {
        setIfsc(e.target.value);
    };
    const hnamechnage = (e) => {
        setHname(e.target.value);
    };
    const hUpichnage = (e) => {
        setUpi(e.target.value);
    };
    const hupiNamechnage = (e) => {
        setUpiName(e.target.value);
    };
    const hUpiNumberchnage = (e) => {
        setUpiPhoneNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            accountHolderName: hname,
            bankName: bname,
            accountNumber: accno,
            ifscCode: ifsc,
            upiId: upi,
            upiAppName: upiName,
            upiNumber: upiPhoneNumber
        };
        console.log(id, data);
        AccountService.editBank(data, id, auth.user)
            .then((response) => {
                console.log(response.data);
                toast.success("Edit Request Send Successfully!");
                navigate("/bank");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed! Invalid Data");
            });
    };

    return (
        <div className="EditTransaction">
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

            <div
                className="wrapper"
                style={{
                    transition: "transform 0.3s",
                    transform: "scale(1)",
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                }}
            >
                <div className="logo">
                    <img src={EditIcon} alt="" />
                </div>
                <div className="text-center mt-4 name">Edit Bank</div>
                <form className="p-3 mt-3">
                    <div className="d-flex flex-column modal-body gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name of Bank *"
                            aria-describedby="addon-wrapping"
                            onChange={bnamechnage}
                            value={bname}

                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Acc No. *"
                            aria-describedby="addon-wrapping"
                            onChange={accnochnage}
                            value={accno}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="IFSC CODE *"
                            aria-describedby="addon-wrapping"
                            onChange={ifscchnage}
                            value={ifsc}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name of the Acc. Holder *"
                            aria-describedby="addon-wrapping"
                            onChange={hnamechnage}
                            value={hname}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="UPI ID *"
                            aria-describedby="addon-wrapping"
                            onChange={hUpichnage}
                            value={upi}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="UPI App Name *"
                            aria-describedby="addon-wrapping"
                            onChange={hupiNamechnage}
                            value={upiName}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="UPI Phone Number *"
                            aria-describedby="addon-wrapping"
                            onChange={hUpiNumberchnage}
                            value={upiPhoneNumber}
                        />
                    </div>
                    <button className="btn mt-3" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBank;
