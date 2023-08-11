import React, { useEffect, useState } from "react";
import EditServices from "../../Services/EditServices";
import { useAuth } from "../../Utils/Auth";
// import Accordion from "react-bootstrap/Accordion";
const Alert = () => {
  const auth = useAuth();

  const [alert, setAlert] = useState([]);

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewAlert(auth.user).then((res) =>
        setAlert(res.data)
      );
    }
  }, [auth]);
console.log(alert)
  // console.log("alert", alert);
  // console.log("This is Auth=====> ", auth);

  return (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <br /> 
      <div className="d-inline-flex p-2">
        <h1>Old value</h1>

        {alert.length > 0
          ? alert.map((data,i) => {
              return (
                <div key={i}>
                <h2>{data.transaction}</h2>
                <ul>
                  {data.changes.map((item, itemIndex) => (
                    <li key={itemIndex}>{item.field}</li>
                  ))}
                </ul>
              </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Alert;
