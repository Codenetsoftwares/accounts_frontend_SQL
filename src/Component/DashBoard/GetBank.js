import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
const GetBank = () => {
  const [getbankName, setGetBankName] = useState([{}]);
  const auth = useAuth();
  useEffect(() => {
    AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  }, [auth]);
  console.log("Bank Names", getbankName);
  return (
    <div>
      {getbankName.length > 0 &&
        getbankName.map((data, index) => {
          return (
            <div>
              <p className="col">{data.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default GetBank;
