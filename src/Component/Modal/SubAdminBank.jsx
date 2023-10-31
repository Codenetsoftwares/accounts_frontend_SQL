import React, { useState, useEffect } from "react";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useAuth } from "../../Utils/Auth";

const SubAdminBank = ({ ID, EditApi }) => {
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]); // State for checkbox data
  const [checkboxIsDeposit, setCheckboxIsDeposit] = useState([]); // State for checkbox data
  const [checkboxIsWithdraw, setCheckboxIsWithdraw] = useState([]); // State for checkbox data

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdmin(res.data)
        setSubAdminlist(res.data.map((data) => data.userName));
        setCheckboxStates(res.data.map(() => false)); // Initialize checkbox states
        setCheckboxIsDeposit(res.data.map(() => false));
        setCheckboxIsWithdraw(res.data.map(() => false));
      });
    }
  }, [auth]);

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handleCheckboxIsDepositChange = (index) => {
    const newCheckboxIsDeposit = [...checkboxIsDeposit];
    newCheckboxIsDeposit[index] = !newCheckboxIsDeposit[index];
    setCheckboxIsDeposit(newCheckboxIsDeposit);
  };
  const handleCheckboxIsWithdrawChange = (index) => {
    const newCheckboxIsWithdraw = [...checkboxIsWithdraw];
    newCheckboxIsWithdraw[index] = !newCheckboxIsWithdraw[index];
    setCheckboxIsWithdraw(newCheckboxIsWithdraw);
  };
  console.log("subadmin", checkboxStates, "isdeposit", checkboxIsDeposit, "iswithdraw", checkboxIsWithdraw)
  const handelsave = () => {
    // const selectedNames = subAdminlist
    //   .filter((_, index) => checkboxStates[index])
    //   .map((subAdmin) => subAdmin.userName);
    // console.log("Selected Names =>", selectedNames);
    // console.log(ID);
    // console.log(subAdminlist);
    let arr = [];
    const handledata = () => {
      let data = {};
      for (let i = 0; i <= 10; i++) {
        if (checkboxStates[i] === true) {
          data = {
            subAdminId: subAdminlist[i],
            isDeposit: checkboxIsDeposit[i],
            isWithdraw: checkboxIsWithdraw[i]
          }
          arr.push(data)
        }
      }
      return arr;
    }
    handledata();
    console.log(arr)
    const data = {
      isApproved: true,
      subAdmins: arr,
    };

    EditApi(ID, data, auth.user)
      .then((response) => {
        console.log("res", response.data);
        alert(response.data.message);
        // window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };
  console.log(subAdminlist)
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Give the Permission SubAdmin Wise
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                {subAdmin.length > 0 ? (
                  subAdmin.map((subAdmin, index) => (
                    <div
                      key={index}
                      className="form-check"
                      style={{ margin: "5px" }}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            style={{ marginRight: "5px" }}
                            checked={checkboxStates[index]}
                            onChange={() => handleCheckboxChange(index)}
                            value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                            style={{ fontWeight: "bold" }}
                          >
                            {subAdmin.userName}
                          </label>
                        </div>

                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            style={{ marginRight: "5px" }}
                            checked={checkboxIsDeposit[index]}
                            onChange={() => handleCheckboxIsDepositChange(index)}
                          // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                            style={{ fontWeight: "bold" }}
                          >
                            isDeposit
                          </label>
                        </div>

                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            style={{ marginRight: "5px" }}
                            checked={checkboxIsWithdraw[index]}
                            onChange={() => handleCheckboxIsWithdrawChange(index)}
                          // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                            style={{ fontWeight: "bold" }}
                          >
                            isWithdraw
                          </label>
                        </div>

                      </div>

                      {
                        index < subAdminlist.length - 1 && (
                          <hr style={{ margin: "5px 0", borderColor: "black" }} />
                        )
                      }
                    </div>
                  ))
                ) : (
                  <p>No sub-admins found.</p>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelsave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default SubAdminBank;
