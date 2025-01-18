import React, { useState } from 'react';
import TransactionSercvice from '../../Services/TransactionSercvice';
import TableMainTransaction from '../../Component/TableMainTransaction';
import FilterMainTransaction from '../../Component/FilterMainTransaction';

const MainTransactionPage = () => {
  const [documentFilter, setDocumentFilter] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const pageLimit = 10;
  console.log(totalData)
  // const handleData = (data, totalPage) => {
  //   // if (data !== undefined) {
  //   setDocumentFilter(data);
  //   // }
  //   setTotalPage(totalPage);
  // }

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);


  const handlePage = (page) => {
    setPage(page);
  }

  const handleTotalData = (data) => {
    setTotalData(data);
  }

  // let reminder = documentFilter.length % 10;
  // let lastPage = Math.ceil(documentFilter.length / 10);
  // let lastPageReminder = documentFilter.length % 10 === !0

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);

    setPage(selectedPage);
  };

  console.log(documentFilter)
  return (
    <div className="container-fluid" style={{ backgroundColor: "#fff4ec" }}>
      <FilterMainTransaction
        purpose={"mainStatement"}
        // handleData={handleData}
        setTotalPage={setTotalPage}
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        handleTotalData={handleTotalData}
        api={TransactionSercvice.filterTransaction}
        setDocumentFilter={setDocumentFilter}
        documentFilter={documentFilter}
        pageLimit={pageLimit}
        setTotalData={setTotalData}
      />
      <div className="d-flex justify-content-center">
        <TableMainTransaction
          FilterData={documentFilter}
          purpose={"mainStatement"}
          handlePage={handlePage}
          page={page}
          totalPage={totalPage}
          totalData={totalData}
          selectPageHandler={selectPageHandler}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
    </div>
  );
};

export default MainTransactionPage;