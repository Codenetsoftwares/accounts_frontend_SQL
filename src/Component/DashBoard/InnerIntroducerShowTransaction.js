import React from "react";

const InnerIntroducerShowTransaction = ({ Transaction }) => {
  console.log("TTT===>>>>>", Transaction);
  return (
    <div>
      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">... .... ....</div>
        </div>
      </div>
    </div>
  );
};

export default InnerIntroducerShowTransaction;
