import React from 'react'
export const CardFd = ({ documentView }) => {
console.log(documentView)
  if (!documentView || !documentView.deposits || !Array.isArray(documentView.deposits)) {
    return null;
  }

  return (
    <div className='main'>
      <div className="d-flex justify-content-start">
        <div className="card mt-2" style={{ width: '90vh', height: '10vh', background: 'linear-gradient(90deg, rgba(64,212,37,0.8631827731092436) 6%, rgba(255,255,255,1) 100%)', marginLeft: '2rem', boxShadow: '13px 25px 32px -4px rgba(148,145,142,1)', border: '1px solid black' }}>
          <div className="card-body">
            <h5 className="card-title">Deposit</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">₹  {documentView.totalDeposits}</h6>
          </div>
          <table className="table" style={{ border: '2px solid' }}>
            <thead>
              <tr style={{ border: '2px solid black' }}>
                <th scope="col ">Date</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Deposit Amount</th>
              </tr>
            </thead>
            <tbody>
              {documentView.deposits.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.transactionID}</td>
                  <td>{item.depositAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
