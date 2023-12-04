import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionSercvice from "../Services/TransactionSercvice";
import { toast } from "react-toastify";



const TrashAllTransaction = () => {
    const auth = useAuth();

    const [alert, setAlert] = useState([]);
    const [isApproved, setIsApproved] = useState();
    var EditData = [];

    useEffect(() => {
        if (auth.user) {
            TransactionSercvice.ViewTrash(auth.user).then((res) => setAlert(res.data));
        }
    }, [auth]);

    for (let i = 0; i < alert.length; i++) {
        EditData[i] = alert[i].changedFields;
    }


    const handleDeleteApprove = (e, id, transactionType) => {
        e.preventDefault();

        TransactionSercvice.IsTransactionDelete(id, auth.user)
            .then((response) => {
                window.location.reload();
                console.log(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };
    const handleRestore = (e, id, transactionType) => {
        e.preventDefault();

        switch (transactionType) {
            case "Transaction":
                TransactionSercvice.RestoreTransaction(id, auth.user)
                    .then((response) => {
                        window.location.reload();
                        console.log(response.data);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                    });
                break;
            case "Introducer":
                TransactionSercvice.RestoreIntroducerTransaction(id, auth.user)
                    .then((response) => {
                        window.location.reload();
                        console.log(response.data);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);

                    });
                break;

            case "Bank":
                TransactionSercvice.RestoreBankTransaction(id, auth.user)
                    .then((response) => {
                        window.location.reload();
                        console.log(response.data);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);


                    });
                break;


            case "Website":
                TransactionSercvice.RestoreWebsiteTransaction(id, auth.user)
                    .then((response) => {
                        window.location.reload();
                        console.log(response.data);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);

                    });
                break;


            default:
            // code block
        }
    };

    console.log("=>>>", alert);
    return (
        <>
            <div className="container d-flex justify-content-center  ">
                <br />
                <div
                    className="card  rounded-2 "
                    style={{
                        boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                        backgroundImage:
                            "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
                    }}
                ></div>
                <div className=" p-2">
                    {alert.length > 0 ? (
                        alert.map((data, i) => {
                            return (
                                <>
                                    {/* {data.type === "Edit" && (
                                        <div className="card">
                                            <div className="card-body">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Old Value</th>
                                                            <th scope="col">New Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Txn Id </th>
                                                            <td>
                                                                {data.originalData?.transactionID?.oldValue}
                                                            </td>
                                                            <td>
                                                                {data.originalData?.transactionID?.newValue}
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <th scope="row">Amount</th>
                                                            <td>{data.originalData?.amount?.oldValue}</td>

                                                            <td>{data.originalData?.amount?.newValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Bank</th>
                                                            <td>{data.originalData?.bankName?.oldValue}</td>
                                                            <td>{data.originalData?.bankName?.newValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Website</th>
                                                            <td>
                                                                {data.originalData?.websiteName?.oldValue}
                                                            </td>
                                                            <td>
                                                                {data.originalData?.websiteName?.newValue}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Gateway</th>
                                                            <td>
                                                                {data.originalData?.paymentMethod?.oldValue}
                                                            </td>
                                                            <td>
                                                                {data.originalData?.paymentMethod?.newValue}
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                    onClick={(e) =>
                                                                        handleEditApprove(
                                                                            e,
                                                                            data._id,
                                                                            data.transactionType,
                                                                            data.message
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={(e) =>
                                                                        handleEditReject(
                                                                            e,
                                                                            data._id,
                                                                            data.transactionType
                                                                        )
                                                                    }
                                                                >
                                                                    Reject
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )} */}


                                    <div className="card">
                                        <h5 class="card-title text-center text-danger">
                                            {data.message}
                                        </h5>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="row">
                                                    <div className="row">
                                                        <p className="col fs-6">
                                                            Transaction Type:
                                                            <br />
                                                            <p className="text-success">
                                                                {data.transactionType}
                                                            </p>
                                                        </p>
                                                        <p className="col fs-6 ">
                                                            Transaction Id:
                                                            <br />
                                                            <p
                                                                className={
                                                                    data.changedFields?.transactionID
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }
                                                            >
                                                                {data.changedFields?.transactionID ||
                                                                    data.transactionID}
                                                            </p>
                                                        </p>
                                                        <p className="col fs-6 ">
                                                            Gateway:
                                                            <br />
                                                            <p
                                                                className={
                                                                    data.changedFields?.paymentMethod
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }
                                                            >
                                                                {data.changedFields?.paymentMethod ||
                                                                    data.paymentMethod}
                                                            </p>
                                                        </p>
                                                        <p className="col fs-6 ">
                                                            UserName:
                                                            <br />
                                                            <p
                                                                className={
                                                                    data.changedFields?.userName
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }
                                                            >
                                                                {data.changedFields?.userName ||
                                                                    data.userName}
                                                            </p>
                                                        </p>
                                                        <p className="col fs-6 ">
                                                            Website:
                                                            <br />
                                                            <p
                                                                className={
                                                                    data.changedFields?.websiteName
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }
                                                            >
                                                                {data.changedFields?.websiteName ||
                                                                    data.websiteName}
                                                            </p>
                                                        </p>
                                                        <p className="col fs-6 ">
                                                            Amount:
                                                            <br />
                                                            <p
                                                                className={
                                                                    data.changedFields?.withdrawAmount ||
                                                                        data.changedFields?.amount ||
                                                                        data.changedFields?.depositAmount
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }
                                                            >
                                                                {data.changedFields?.withdrawAmount ||
                                                                    data.changedFields?.amount ||
                                                                    data.changedFields?.depositAmount ||
                                                                    data.withdrawAmount ||
                                                                    data.amount ||
                                                                    data.depositAmount}
                                                            </p>
                                                        </p>
                                                        <p className="col fs-6 ">
                                                            Bank:
                                                            <br />
                                                            <p
                                                                className={
                                                                    data.changedFields?.bankName
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }
                                                            >
                                                                {data.changedFields?.bankName ||
                                                                    data.bankName}
                                                            </p>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center gap-2 mb-2">
                                            <button
                                                class="btn btn-primary"
                                                onClick={(e) =>
                                                    handleDeleteApprove(
                                                        e,
                                                        data._id,
                                                        data.transactionType
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                            {(data.Nametype === "Introducer") && <button
                                                className="btn btn-danger rounded"
                                                onClick={(e) => handleRestore(e, data._id, data.Nametype)}
                                            >
                                                Restore
                                            </button>}
                                            {(data.Nametype === "Transaction") && <button
                                                className="btn btn-danger rounded"
                                                onClick={(e) => handleRestore(e, data.transactionID, data.Nametype)}
                                            >
                                                Restore
                                            </button>}
                                            {(data.Nametype === "Bank") && <button
                                                className="btn btn-danger rounded"
                                                onClick={(e) => handleRestore(e, data.bankName, data.Nametype)}
                                            >
                                                Restore
                                            </button>}
                                            {(data.Nametype === "Website") && <button
                                                className="btn btn-danger rounded"
                                                onClick={(e) => handleRestore(e, data.websiteName, data.Nametype)}
                                            >
                                                Restore
                                            </button>}


                                        </div>
                                    </div>

                                </>
                            );
                        })
                    ) : (
                        <h1>No Alert Found</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default TrashAllTransaction;
