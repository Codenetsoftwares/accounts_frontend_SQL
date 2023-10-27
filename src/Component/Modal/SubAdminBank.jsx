import React, { useState, useEffect } from "react";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const SubAdminBank = ({ ID }) => {
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]); // State for checkbox data
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
        setCheckboxStates(res.data.map(() => false)); // Initialize checkbox states
      });
    }
  }, [auth]);

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handelsave = () => {
    const selectedNames = subAdminlist
      .filter((_, index) => checkboxStates[index])
      .map((subAdmin) => subAdmin.userName);
    console.log("Selected Names =>", selectedNames);
    console.log(ID);
    console.log(subAdminlist);
    const data = {
      subAdminIds: selectedNames,
    };

    AccountService.subadminbankpermission(ID, data, auth.user)
      .then((response) => {
        console.log("res", response.data);
        alert(response.data.message);
        // alert("Bank Added Sucessfully");
        // window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

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
                {subAdminlist.length > 0 ? (
                  subAdminlist.map((subAdmin, index) => (
                    <div
                      key={index}
                      className="form-check"
                      style={{ margin: "5px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                      {index < subAdminlist.length - 1 && (
                        <hr style={{ margin: "5px 0", borderColor: "black" }} />
                      )}
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
      </div>
    </div>
  );
};

export default SubAdminBank;
