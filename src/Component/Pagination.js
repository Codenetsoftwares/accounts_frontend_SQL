import React from "react";

const Pagination = ({ handlePage, page, totalPage }) => {
  console.log(handlePage, page, totalPage);
  return (
    <div className="text-center">
      <h4>
        Showing {} to {} of {totalPage} entries
      </h4>
      <div className="d-flex justify-content-center">
        <span className={`m-1 `}>
          <button
            className={`btn btn-sm ${page === 1 ? "disabled" : ""}`}
            onClick={() => {
              handlePage(1);
            }}
          >
            First
          </button>
        </span>
        <span className={`m-1 `}>
          <button
            className={`btn btn-sm ${page === 1 ? "disabled" : ""}`}
            onClick={() => {
              page > 1 && handlePage(page - 1);
            }}
          >
            Previous
          </button>
        </span>
        <div className="">
          <span className={`fs-4 m-1`}>
            <button
              onClick={() => {
                handlePage(1);
              }}
              className={`btn btn-sm `}
            >
              {page === 1 ? (
                <button className="btn-primary" style={{ width: "25px" }}>
                  1
                </button>
              ) : (
                <button style={{ border: "none" }}>1</button>
              )}
            </button>
          </span>
          <span className={`fs-4 m-1 `}>
            <button
              className={`btn btn-sm ${totalPage < 2 ? "disabled" : ""}`}
              onClick={() => {
                handlePage(2);
              }}
            >
              {page === 2 ? (
                <button className="btn-primary" style={{ width: "25px" }}>
                  2
                </button>
              ) : (
                <button style={{ border: "none" }}>2</button>
              )}
            </button>
          </span>
          <span className={`fs-4 m-1 `}>
            <button
              className={`btn btn-sm ${totalPage < 3 ? "disabled" : ""}`}
              onClick={() => {
                handlePage(3);
              }}
            >
              {page === 3 ? (
                <button className="btn-primary" style={{ width: "25px" }}>
                  3
                </button>
              ) : (
                <button style={{ border: "none" }}>3</button>
              )}
            </button>
          </span>
          <span className={`fs-4 m-1 `}>
            <button
              className={`btn btn-sm ${totalPage < 4 ? "disabled" : ""}`}
              onClick={() => {
                handlePage(4);
              }}
            >
              {page === 4 ? (
                <button className="btn-primary" style={{ width: "25px" }}>
                  4
                </button>
              ) : (
                <button style={{ border: "none" }}>4</button>
              )}
            </button>
          </span>
          <span className={`fs-4 m-1 `}>
            <button
              className={`btn btn-sm ${totalPage < 5 ? "disabled" : ""}`}
              onClick={() => {
                handlePage(5);
              }}
            >
              {page === 5 ? (
                <button className="btn-primary" style={{ width: "25px" }}>
                  5
                </button>
              ) : (
                <button style={{ border: "none" }}>5</button>
              )}
            </button>
          </span>
        </div>
        <span className={`m-1 `}>
          <button
            className={`btn btn-sm ${page === totalPage ? "disabled" : ""}`}
            onClick={() => {
              handlePage(page + 1);
            }}
          >
            Next
          </button>
        </span>
        <span className={`m-1 `}>
          <button
            className={`btn btn-sm ${page === totalPage ? "disabled" : ""}`}
            onClick={() => {
              handlePage(totalPage);
            }}
          >
            Last
          </button>
        </span>
      </div>
    </div>
  );
};

export default Pagination;
