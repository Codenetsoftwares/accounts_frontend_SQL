import React from "react";
import AccountService from "../Services/AccountService";
import { useState } from "react";
import TableTransaction from "../Component/TableTransaction";
import FilterTransaction from "../Component/FilterTransaction";
import { useParams } from "react-router";

const BankTransactionPage = () => {
  const { id } = useParams();
  const [documentFilter, setDocumentFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  console.log(totalData);
  const handleData = (data, totalPage) => {
    // if (data !== undefined) {
    setDocumentFilter(data);
    // }
    setTotalPage(totalPage);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleTotalData = (data) => {
    setTotalData(data);
  };

  let reminder = documentFilter.length % 10;
  let lastPage = Math.ceil(documentFilter.length / 10);
  let lastPageReminder = documentFilter.length % 10 === !0

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);

    setPage(selectedPage);
  };

  console.log(documentFilter);
  return (
    <div>
      <FilterTransaction
        purpose={"bankStatement"}
        handleData={handleData}
        page={page}
        handlePage={handlePage}
        handleTotalData={handleTotalData}
        api={AccountService.GetBankStMent}
        id={id}
      />
      <div className="d-flex justify-content-center">
        <TableTransaction
          FilterData={documentFilter}
          purpose={"bankStatement"}
          handlePage={handlePage}
          page={page}
          totalPage={totalPage}
          totalData={totalData}
          reminder={reminder}
          lastPage={lastPage}
          selectPageHandler={selectPageHandler}
          lastPageReminder={lastPageReminder}
        />
      </div>
    </div>
  );
};

export default BankTransactionPage;
