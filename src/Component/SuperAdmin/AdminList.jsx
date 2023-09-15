import React, { useEffect, useState } from 'react';
import AccountService from '../../Services/AccountService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Utils/Auth';


const AdminList = () => {
    const [adminList, setAdminList] = useState([]);
    const [Erorr, setErorr] = useState(false);
    const [erorrData, setErorrData] = useState("");
    const auth = useAuth();
    const [q, setQ] = useState('');


    useEffect(() => {
        if (auth.user) {
            AccountService.getAdminList(auth.user)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "No sub-admins") {
                        setErorrData(res.data)
                        setErorr(true)

                    }
                    else {
                        setAdminList(res.data);
                    }
                });
        }
    }, [auth]);

    const filteredUsers = adminList.filter(adminList => {
        const fullName = adminList.firstname.toLowerCase();
        return fullName.includes(q.toLowerCase());
    });
    console.log(auth.user)
    return (
        <div className="card container" >
            <div className="card-header border-transparent">
                <h3 className=" d-flex justify-content-center">List of Sub-Admin</h3>
            </div>
            <div className="input-group input-group-sm mb-3 p-3">
                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search User by Name"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                />
            </div>
            <>{Erorr ? (<h3 className='text-center'>{erorrData}</h3>) : (<>{filteredUsers.map(((data, i) => {
                return (
                    < div className="card container" key={data._id}>
                        <div className="card-body ">
                            <div className="d-flex justify-content-between">
                                <div className=" text-left ">
                                    <h5 className="fs-6 ">{i + 1}.</h5>
                                </div>
                                <div className="">
                                    <h5 className="fs-5 text-nowrap">{data.userName} </h5>
                                </div>
                                <div className="">
                                    <button className='' style={{ height: "30px", backgroundColor: "#0275d8", border: "none", borderRadius: "5px" }}><p><Link to={`/subadminedit/${data._id
                                        }`}><span className='text-white'>Details</span ></Link></p></button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }))}</>)}</>

        </div >
    );
};
export default AdminList;