import React from "react";

const InnerIntroducerShowTransaction = ({ Transaction }) => {
  console.log("TTT===>>>>>", Transaction);
  return (
    <div>
      <div
        class="modal fade bd-example-modal-lg InnerIntroducerShowTransaction"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                All Transactions
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
              <div
                className="card  rounded-2 mb-2"
                style={{
                  boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                  backgroundImage:
                    "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <h4 className="col fs-6">Date</h4>
                    <h4 className="col fs-6">Amount</h4>
                    <h4 className="col fs-6">Transaction Id</h4>
                    <h4 className="col fs-6">Gateway</h4>
                    <h4 className="col fs-6">CreatedBy</h4>
                    <h4 className="col fs-6">User Id</h4>
                    <h4 className="col fs-6">Bank</h4>
                    <h4 className="col fs-6">Website</h4>
                  </div>
                </div>
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
              {/* <button type="button" class="btn btn-primary">Send message</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerIntroducerShowTransaction;
