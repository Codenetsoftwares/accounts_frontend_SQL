import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";

const AddBank = () => {
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([]);

  const handleBankName = (event) => {
    setBankName(event.target.value);
  };

  const handleAddBank = () => {
    if (bankName.trim() !== "") {
      AccountService.addbank(
        {
          name: bankName,
        },
        auth.user
      )
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            alert("Bank registered successfully!");
            setBankName("");
            refreshBankNames();
          } else {
            alert("Please give a bank name to add");
          }
        })
        .catch((err) => {
          if (!err.response) {
            alert(err.message);
            return;
          }
          alert("An error occurred while adding the bank.");
        });
    }
  };

  const handleDeleteBank = (bankId) => {
    AccountService.deleteBank(auth.user, bankId)
      .then(() => {
        refreshBankNames();
        alert("Bank deleted successfully!");
      })
      .catch((err) => {
        alert("An error occurred while deleting the bank.");
      });
  };

  const refreshBankNames = () => {
    AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  };

  useEffect(() => {
    refreshBankNames();
  }, [auth]);

  return (
    <div style={{ background: "linear-gradient(90deg, #fcff9e 0%, #c67700 100%)" }}>
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1 className="text-center mb-4 btn btn-danger" style={{ fontSize: 50, fontFamily: "cursive" }}>
          Bank Names
        </h1>
        <div className="card">
          <div className="card-body d-flex align-items-center">
            <input
              style={{ fontFamily: "fantasy", fontSize: 25, fontWeight: "bolder", textTransform: "uppercase", padding: 20 }}
              className="card-body"
              type="text"
              value={bankName}
              onChange={handleBankName}
              placeholder="Add names here..."
            />
            <button className="btn btn-primary text-md-start" style={{ padding: 20, marginLeft: 10 }} onClick={handleAddBank}>
              <i className="fas fa-piggy-bank"></i> Add Bank
            </button>
          </div>
        </div>
        <div className="row mt-4">
          {getbankName.map((data) => (
            <div className="col-md-3 mb-4" key={data.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: "fantasy", fontSize: 20, fontWeight: "bolder", textTransform: "uppercase" }}>
                    {data.name}
                  </h5>
                  <div>
                    <button className="btn btn-warning" style={{ padding: 10 }} onClick={() => handleEditBank(data.id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ padding: 10, marginLeft: 10 }} onClick={() => handleDeleteBank(data.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddBank;
