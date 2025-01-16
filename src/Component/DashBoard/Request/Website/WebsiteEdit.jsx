import React, { useState, useEffect } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../../../Utils/helper";
import NewPagination from "../../../NewPagination";
const WebsiteEdit = () => {
  const auth = useAuth();
  const [EditRq, SetEditRq] = useState([]);
  const [renderSate, setRenderSate] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewWebsiteEditRq(auth.user, page, pageLimit).then((res) => {
        const changedFieldsArray = res.data.data.map(
          (item) => item.changedFields
        );

        SetEditRq(res.data.data);
        setTotalData(res?.data?.pagination?.totalItems);
        setTotalPage(res?.data?.pagination?.totalPages);
      });
    }
  }, [auth, renderSate, page]);

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

  console.log("ALL Request", EditRq);

  const handleapprove = (ID) => {
    const flag = true;

    const data = {
      isApproved: flag,
    };

    EditServices.IsWebsiteEditApprove(ID, data, auth.user)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  const handleReject = (e, id) => {
    e.preventDefault();
    EditServices.IsWebsiteDeleteReject(id, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  return (
    <>
      {EditRq.length > 0 ? (
        <>
          <div className="d-flex justify-content-center">
            <table
              className="table table-striped table-bordered"
              style={{ width: "80%" }}
            >
              <thead>
                <tr align="center">
                  <th scope="col">Website Name</th>
                  <th scope="col">Message</th>
                  <th scope="col" colSpan="2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {EditRq.reverse().map((item, index) => (
                  <tr key={item.id} align="center">
                    <td>{item.websiteName}</td>
                    <td>{item.message}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-success mr-2"
                        onClick={() => handleapprove(item.websiteId)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => handleReject(e, item.websiteId)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {EditRq.length > 0 && (
            <NewPagination
              currentPage={page}
              totalPages={totalPage}
              handlePageChange={selectPageHandler}
              startIndex={startIndex}
              endIndex={endIndex}
              totalData={totalData}
            />
          )}
        </>
      ) : (
        <div class="alert alert-warning text-center" role="alert">
          No Edit Request Found
        </div>
      )}
    </>
  );
};

export default WebsiteEdit;
