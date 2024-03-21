import React, { useState } from "react";
import FilterTransaction from "../../Component/FilterTransaction";
import TableTransaction from "../../Component/TableTransaction";
import TransactionSercvice from "../../Services/TransactionSercvice";

const MainFilterTransaction = () => {
  const [documentFilter, setDocumentFilter] = useState([]);
  const [page, setPage] = useState(1);
  //   const [totalPage, setTotalPage] = useState(1);
  //   const [totalData, setTotalData] = useState(0);

  const handleData = (data) => {
    setDocumentFilter(data);
  };

  const handlePage = (page) => {
    setPage(page);
  };
  console.log("=======>", documentFilter);

  let reminder = documentFilter.length % 10;
  let lastPage = Math.ceil(documentFilter.length / 10);
  let lastPageReminder = documentFilter.length % 10 === !0;

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);

    setPage(selectedPage);
  };
  return (
    <div className="container-fluid" style={{ backgroundColor: "#fff4ec" }}>
      <FilterTransaction
        purpose={"mainStatement"}
        handleData={handleData}
        page={page}
        api={TransactionSercvice.getAccountSummary}
        handlePage={handlePage}
        FilterData={documentFilter}
      />
      <TableTransaction
        FilterData={documentFilter}
        purpose={"mainStatement"}
        page={page}
        reminder={reminder}
        lastPage={lastPage}
        selectPageHandler={selectPageHandler}
        lastPageReminder={lastPageReminder}
      />
    </div>
  );
};

export default MainFilterTransaction;
