import React, { useState } from 'react';
import FilterTransaction from '../Component/FilterTransaction';
import TableTransaction from '../Component/TableTransaction';

const MainTransactionPage = () => {
    const [documentFilter, setDocumentFilter] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const handleData = (data, totalPage) => {
        // if (data !== undefined) {
            setDocumentFilter(data);
        // }
        setTotalPage(totalPage);
    }

    const handlePage = (page) => {
        setPage(page);
    }
    console.log(documentFilter)
    return (
        <div className="container-fluid" style={{ backgroundColor: '#fff4ec' }}>
            <FilterTransaction purpose={"mainStatement"} handleData={handleData} page={page} handlePage={handlePage} />
            <TableTransaction FilterData={documentFilter} purpose={"mainStatement"} handlePage={handlePage} page={page} totalPage={totalPage} />
        </div>
    )
};

export default MainTransactionPage;