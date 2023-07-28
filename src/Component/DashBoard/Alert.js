import React, { useEffect, useState } from "react";
import EditServices from "../../Services/EditServices";
import { useAuth } from "../../Utils/Auth";
import Accordion from 'react-bootstrap/Accordion';
const Alert = () => {
  const auth = useAuth();

  const [alert, setAlert] = useState([]);

  useEffect(() => {
    EditServices.ViewAlert(auth.user).then((res) =>setAlert(res.data));
  }, [auth]);

  console.log("alert", alert);
  // console.log("This is Auth=====> ", auth);

  return (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <br/>
      <div className="d-inline-flex p-2">
    <h1>Old value</h1>

                    {alert.length > 0 ? (
                      alert.map((data) => {
                        return(
                          <div> 
                            <p className="col">{} </p>

                          </div>
                        )
                      })
                    ): (null)}

</div>
     
            

            
            
        


      
    </div>
  );
};

export default Alert;
