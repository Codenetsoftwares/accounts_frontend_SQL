import React, { useState } from 'react';
import FilterTransaction from '../Component/FilterTransaction';
import TableTransaction from '../Component/TableTransaction';

const MainTransactionPage = () => {
    const [documentFilter, setDocumentFilter] = useState([]);
    const handleData = (data) => {
        setDocumentFilter(data);
    }
    console.log(documentFilter)
    return (
        <div className="container-fluid" style={{ backgroundColor: '#fff4ec' }}>
            <FilterTransaction purpose={"mainStatement"} handleData={handleData} />
            <TableTransaction FilterData={documentFilter} purpose={"mainStatement"} />
        </div>
    )
};

export default MainTransactionPage;