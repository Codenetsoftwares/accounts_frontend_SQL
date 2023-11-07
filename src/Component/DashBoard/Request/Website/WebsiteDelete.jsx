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
          <div className=" p-2">
            {viewWebsiteDelete.length > 0 ? (
              viewWebsiteDelete.map((data, index) => {
                return (
                  <div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Website Name</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{data.websiteName}</td>
                          <td>
                            {" "}
                            <button
                              class="btn btn-primary"
                              onClick={(e) => handleApprove(e, data._id)}
                            >
                              Approve
                            </button>
                          </td>
                          <td>
                            {" "}
                            <button
                              class="btn btn-danger"
                              onClick={(e) => handleReject(e, data._id)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <div class="alert alert-warning" role="alert">
               No Delete Request Found
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default WebsiteDelete