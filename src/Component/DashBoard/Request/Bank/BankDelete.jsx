import React, { useState, useEffect } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";
import { customErrorHandler } from "../../../../Utils/helper";
import { toast } from "react-toastify";
import NewPagination from "../../../NewPagination";

const BankDelete = () => {
  const auth = useAuth();

  const [viewBankDelete, setViewBankDelete] = useState([]);
  const [renderSate, setRenderSate] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewBankDelete(auth.user, page, pageLimit).then((res) => {
        setViewBankDelete(res.data?.data);
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

  const handleApprove = (e, id) => {
    e.preventDefault();
    const flag = true;

    const data = {
      isApproved: flag,
    };
    EditServices.IsBankDeleteApprove(id, auth.user)
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
    EditServices.IsBankDeleteReject(id, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  return (
    <div className="container ">
      {viewBankDelete.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr align="center">
              <th scope="col">Bank Name</th>
              <th scope="col">Account Holder Name</th>
              <th scope="col">Account Number</th>
              <th scope="col">IFSC Code</th>
              <th scope="col">UPI App Name</th>
              <th scope="col">UPI Id</th>
              <th scope="col" colspan="2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {viewBankDelete.reverse().map((data, i) => (
              <>
                {data.type === "Delete" && (
                  <tr key={i} align="center">
                    <td
                      className={
                        data.changedFields?.bankName
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {data.changedFields?.bankName || data.bankName}
                    </td>
                    <td className="text-success">{data.accountHolderName}</td>
                    <td className="text-success">{data.accountNumber}</td>
                    <td className="text-success">{data.ifscCode}</td>
                    <td className="text-success">{data.upiAppName}</td>
                    <td className="text-success">{data.upiId}</td>
                    <td>
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={(e) => handleApprove(e, data.bankId)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => handleReject(e, data.bankId)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <div class="alert alert-warning text-center" role="alert">
          No Alert Found
        </div>
      )}
      {viewBankDelete.length > 0 && (
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
  );
};

export default BankDelete;
