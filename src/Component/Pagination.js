import React from 'react'

const Pagination = ({ handlePage, page, totalPage }) => {
    return (
        <div className="text-center">
            <h4>Showing { } to { } of {totalPage} entries</h4>
            <div className='d-flex justify-content-center'>
                <span className={`m-1 `}>
                    <button
                        className={`btn btn-sm ${page === 1 ? "disabled" : ""
                            }`}
                        onClick={() => {
                            handlePage(1);
                        }}
                    >
                        First
                    </button>
                </span>
                <span className={`m-1 `}>
                    <button
                        className={`btn btn-sm ${page === 1 ? "disabled" : ""
                            }`}
                        onClick={() => {
                            page > 1 && handlePage(page - 1);
                        }}
                    >
                        Previous
                    </button>
                </span>
                <div className=''>
                    <span className={`fs-4 m-1`} ><button onClick={() => {
                        handlePage(1)
                    }} className={`btn btn-sm `}>1</button></span>
                    <span className={`fs-4 m-1 `}><button className={`btn btn-sm `} onClick={() => {
                        handlePage(2)
                    }}>2</button></span>
                    <span className={`fs-4 m-1 `}><button className={`btn btn-sm `} onClick={() => {
                        handlePage(3)
                    }}>3</button></span>
                    <span className={`fs-4 m-1 `} ><button className={`btn btn-sm `} onClick={() => {
                        handlePage(4)
                    }}>4</button></span>
                    <span className={`fs-4 m-1 `}><button className={`btn btn-sm `} onClick={() => {
                        handlePage(5)
                    }}>5</button></span>
                </div>
                <span className={`m-1 `}>
                    <button
                        className={`btn btn-sm ${page === totalPage ? "disabled" : ""
                            }`}
                        onClick={() => {
                            handlePage(page + 1);
                        }}
                    >
                        Next
                    </button>
                </span>
                <span className={`m-1 `}>
                    <button
                        className={`btn btn-sm ${page === totalPage ? "disabled" : ""
                            }`}
                        onClick={() => {
                            handlePage(totalPage);
                        }}
                    >
                        Last
                    </button>
                </span>
            </div>
        </div>
    )
}

export default Pagination