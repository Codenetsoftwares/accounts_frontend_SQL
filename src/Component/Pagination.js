import React, { useState } from 'react'

const Pagination = ({ handlePage, page, totalPage, totalData }) => {

    let startIndex = Math.min((page - 1) * 10 + 1);
    let endIndex = Math.min(page * 10, totalData);
    return (
        <div className="text-center">
            <h4>Showing {startIndex} to {endIndex} of {totalData} entries</h4>
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
                        className={`btn btn-sm ${page === 1 ? "disabled shadow-none" : ""
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
                    }} className={`btn btn-sm ${page < 1 ? "disabled" : ""
                        }`}>1</button></span>
                    <span className={`fs-4 m-1 `}><button className={`btn btn-sm ${totalPage < 2 ? "disabled" : ""
                        }`} onClick={() => {
                            handlePage(2)
                        }}>2</button></span>
                    <span className={`fs-4 m-1 `}><button className={`btn btn-sm ${totalPage < 3 ? "disabled" : ""
                        }`} onClick={() => {
                            handlePage(3)
                        }}>3</button></span>
                    <span className={`fs-4 m-1 `} ><button className={`btn btn-sm ${totalPage < 4 ? "disabled" : ""
                        }`} onClick={() => {
                            handlePage(4)
                        }}>4</button></span>
                    <span className={`fs-4 m-1 `}><button className={`btn btn-sm ${totalPage < 5 ? "disabled" : ""
                        }`} onClick={() => {
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