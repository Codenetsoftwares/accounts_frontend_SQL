import React, { useEffect, useState } from 'react'
import EditServices from '../../../../Services/EditServices';
import { useAuth } from '../../../../Utils/Auth';

const WebsiteDelete = () => {
  const auth = useAuth();

    const [viewWebsiteDelete, setViewWebsiteDelete] = useState([]);
    // const [isApproved, setIsApproved] = useState();
    var EditData = [];

    useEffect(() => {
        if (auth.user) {
            EditServices.ViewWebsiteDelete(auth.user).then((res) => setViewWebsiteDelete(res.data));
        }
    }, [auth]);

    for (let i = 0; i < alert.length; i++) {
        EditData[i] = alert[i].changedFields;
    }
    console.log(viewWebsiteDelete)

    const handleApprove = (e, id) => {
        e.preventDefault();
        console.log(id);
        const flag = true;

        const data = {
            isApproved: flag,
        };
        EditServices.IsWebsiteDeleteApprove(id, auth.user)
            .then((response) => {
                window.location.reload();
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleReject = (e, id) => {
        e.preventDefault();
        EditServices.IsWebsiteDeleteReject(id, auth.user)
            .then((response) => {
                window.location.reload();
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="container d-flex justify-content-center  ">
                <br />
                <div
                    className="card  rounded-2 mb-2"
                    style={{
                        boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                        backgroundImage:
                            "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
                    }}
                ></div>
                <div className=" p-2">
                    {viewWebsiteDelete.length > 0 ? (
                        viewWebsiteDelete.map((data, i) => {
                            return (
                                <div className="card">
                                    <h5 class="card-title text-center text-danger">
                                        {data.message}
                                    </h5>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="row">
                                                <div className="row">
                                                    <p className="col fs-6 ">
                                                        Bank:
                                                        <br />
                                                        <p className={data.changedFields?.bankName ? "text-danger" : "text-success"}>
                                                            {data.changedFields?.bankName || data.bankName}
                                                        </p>
                                                    </p>
                                                    <p className="col fs-6">
                                                        AccountHolder Name:
                                                        <br />
                                                        <p className="text-success">{data.accountHolderName}</p>
                                                    </p>
                                                    <p className="col fs-6 ">
                                                        Account Number:
                                                        <br />
                                                        <p className="text-success">{data.accountNumber}</p>
                                                    </p>
                                                    <p className="col fs-6 ">
                                                        Ifsc Code:
                                                        <br />
                                                        <p className="text-success">{data.ifscCode}</p>
                                                    </p>
                                                    <p className="col fs-6 ">
                                                        UPI App Name:
                                                        <br />
                                                        <p className="text-success">{data.upiAppName}</p>
                                                    </p>
                                                    <p className="col fs-6 ">
                                                        UPI Id:
                                                        <br />
                                                        <p className="text-success">{data.upiId}</p>
                                                    </p>
                                                    <p className="col fs-6 ">
                                                        UPI App Name:
                                                        <br />
                                                        <p className="text-success">{data.upiAppName}</p>
                                                    </p>

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-center gap-2 mb-2">
                                        <button
                                            class="btn btn-primary"
                                            onClick={(e) =>
                                                handleApprove(e, data._id)
                                            }
                                        >
                                            Approve
                                        </button>
                                        <button class="btn btn-danger" onClick={(e) =>
                                            handleReject(e, data._id)
                                        }>Reject</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h1>No Alert Found</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default WebsiteDelete