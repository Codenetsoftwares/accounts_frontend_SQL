import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
const GetBank = () => {
  const [getbankName, setGetBankName] = useState([{}]);
  const [bankName, setBankName] = useState("");
  const auth = useAuth();
  useEffect(() => {
    refreshBankNames();
    // AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  }, );

  const refreshBankNames = () => {
    AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  };

  const handleAddBank = () => {
    if (bankName.trim() !== "") {
      const newBank = { name: bankName };
      AccountService.addBank(auth.user, newBank).then(() => {
        setBankName("");
        refreshBankNames();
      });
    }
  };


  const handleDeleteBank = (bankId) => {
    AccountService.deleteBank(auth.user, bankId).then(() => {
      refreshBankNames();
    });
  };



  console.log("Bank Names", getbankName);
  return (
    <div>
      <div>
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Enter bank name"
        />
        <button onClick={handleAddBank}>Add Bank</button>
      </div>
      <div>
        {getbankName.length > 0 &&
          getbankName.map((data) => (
            <div key={data.id} className="bank-card">
              <p className="col">{data.name}</p>
              <button onClick={() => handleDeleteBank(data.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetBank;
