import React from 'react'

export const CardFdT = ({withdrawView}) => {
  if (!withdrawView || !withdrawView.withdraws || !Array.isArray(withdrawView.withdraws)) {
    return null;
  }
  return (
    <div className='main'>      
   <div className="card mt-2" style={{ width: '90vh', height: '10vh', background: 'linear-gradient(90deg, rgba(212,37,211,0.8631827731092436) 20%, rgba(255,255,255,1) 100%)' , marginLeft:'6rem', boxShadow:'13px 25px 32px -4px rgba(148,145,142,1)', border:'1px solid black'}}>
      <div className="card-body">
        <h5 className="card-title">Widthdraw</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">₹  {withdrawView.totalWithdraws}</h6>
        </div >
        <div>
        <table className="table" style={{ border: '2px solid' }}>
            <thead>
              <tr>
                <th scope="col ">Date</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Withdraw Amount</th>
              </tr>
            </thead>
            <tbody>
              {withdrawView.withdraws.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.transactionID}</td>
                  <td>{item.withdrawAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      </div>
    </div>

    
  )
}
