import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";

const ShowPercentage = ({ ID }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const auth = useAuth();
  const handelsubmit = () => {
    // console.log(ID);
    const data = {
      startDate: startDate,
      endDate: endDate,
    };
    AccountService.Introducercut(ID, auth.user, data)
      .then((res) => alert(res.data.message))
      .catch((err) => alert("Something Went Wrong , Contact Administrator"));
  };

  //   console.log("End Date ===>>>", endDate);
  return (
    <div>
      <div
        class="modal fade"
        id="showpercentage"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Please select a Date
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="d-flex gap-2 justify-content-center ms-5 ">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control datepicker-with-icon input-group input-group-sm"
                  placeholderText="Start Date"
                  dateFormat="dd/MM/yyyy"
                />

                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-control datepicker-with-icon input-group input-group-sm "
                  placeholderText="End Date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handelsubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPercentage;
