import React, { useState } from 'react';
import FilterTransaction from '../Component/FilterTransaction';
import TableTransaction from '../Component/TableTransaction';

const MainTransactionPage = () => {
    const [documentFilter, setDocumentFilter] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalData, setTotalData] = useState(0)
    console.log(totalData)
    const handleData = (data, totalPage) => {
        // if (data !== undefined) {
        setDocumentFilter(data);
        // }
        setTotalPage(totalPage);
    }

    const handlePage = (page) => {
        setPage(page);
    }

    const handleTotalData = (data) => {
        setTotalData(data);
    }
    console.log(documentFilter)
    return (
        <div className="container-fluid" style={{ backgroundColor: '#fff4ec' }}>
            <FilterTransaction purpose={"mainStatement"} handleData={handleData} page={page} handlePage={handlePage} handleTotalData={handleTotalData} />
            <TableTransaction FilterData={documentFilter} purpose={"mainStatement"} handlePage={handlePage} page={page} totalPage={totalPage} totalData={totalData} />
        </div>
    )
};

export default MainTransactionPage;