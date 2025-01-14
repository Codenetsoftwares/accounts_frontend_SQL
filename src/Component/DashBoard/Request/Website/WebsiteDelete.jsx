import React, { useEffect, useState } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../../../Utils/helper";
import NewPagination from "../../../NewPagination";

const WebsiteDelete = () => {
  const auth = useAuth();

  const [viewWebsiteDelete, setViewWebsiteDelete] = useState([]);
  const [renderSate, setRenderSate] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;
  // const [isApproved, setIsApproved] = useState();
  var EditData = [];

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewWebsiteDelete(auth.user,page,pageLimit).then((res) => {
        setViewWebsiteDelete(
          res.data.data && res.data.data.filter((ele) => ele.type === "Delete")
        );
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

  for (let i = 0; i < alert.length; i++) {
    EditData[i] = alert[i].changedFields;
  }
  console.log(viewWebsiteDelete);

  const handleApprove = (e, id) => {
    e.preventDefault();
    console.log(id);
    const flag = true;

    const data = {
      isApproved: flag,
    };
    EditServices.IsWebsiteDeleteApprove(id, auth.user)
      .then((response) => {
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
      {viewWebsiteDelete.length > 0 ? (
        <div className="container">
          <div className=" p-2">
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
                {viewWebsiteDelete.reverse().map((data, index) => (
                  <tr key={data.websiteTransactionId}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.websiteName}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleApprove(e, data.websiteId)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleReject(e, data.websiteId)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
            {viewWebsiteDelete.length > 0 && (
              <NewPagination
                currentPage={page}
                totalPages={totalPage}
                handlePageChange={selectPageHandler}
                startIndex={startIndex}
                endIndex={endIndex}
                totalData={totalData}
              />
            )}
        </div>
      ) : (
        <div class="container alert alert-warning mt-1" role="alert">
          <p className="d-flex justify-content-center">
            No Delete Request Found
          </p>
        </div>
      )}
    </>
  );
};

export default WebsiteDelete;
