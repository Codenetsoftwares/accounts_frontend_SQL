import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardFd } from './CardFd';
import { CardFdT } from './CardFdT';
import { useAuth } from '../../Utils/Auth';
import TransactionSercvice from '../../Services/TransactionSercvice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminDash = () => {
  const auth = useAuth();
  const nav=useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [documentView, setDocumentView] = useState([]);
  const [withdrawView, setWithdrawView] = useState([])


  useEffect(() => {
    TransactionSercvice.depositView(auth.user).then(res =>
      setDocumentView(res.data));
    TransactionSercvice.withdrawView(auth.user).then(res =>
      setWithdrawView(res.data));
  }, [auth]);

  console.log("This is Deposit====> ", documentView)
  console.log("This is withdraw====> ", withdrawView)
  console.log("This is Auth=====> ", auth);

  const handleLogout = () => {
    const response = window.confirm(
    'You are about to be logged out of this site'
  );
  if (response) {
    toast.success('Logout successfully');
    auth.logout();
    nav('/');
  }

console.log('Logged out');
};

  return (
    
    <div className='main'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ height: '4rem' }}>
        <div>
          <span className="navbar-brand" style={{ marginLeft: '1rem', fontWeight: 'bold' }}>Welcome Admin</span>
        </div>

        <div className="dropdown">
          <DropdownButton id="dropdownMenuButton" title="Filter Data">
            <Dropdown.Item href="#">ToDay</Dropdown.Item>
            <Dropdown.Item href="#">Last Day</Dropdown.Item>
            <Dropdown.Item href="#">Last Week</Dropdown.Item>
            <Dropdown.Item href="#">Last Month</Dropdown.Item>
            <Dropdown.Item href="#">Last Six Month</Dropdown.Item>
          </DropdownButton>
        </div>
        <span style={{ marginLeft: '2rem' }}>Select by Date</span>
        <div className="input-group input-group-sm" style={{ width: 'fit-content', marginLeft: '0.5rem' }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control datepicker-with-icon"
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
          />
          <div style={{ marginLeft: '1rem' }}> {/* Gap between the two date pickers */}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="form-control datepicker-with-icon"
              placeholderText="End Date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03" style={{marginLeft:'60rem'}}>

<button className="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button>

</div>
      </nav>
      <div className='FddivCard' style={{ display: 'flex', flexDirection: 'row' }}>
        <CardFd documentView={documentView} />
        <CardFdT withdrawView={withdrawView}/>
      </div>
    </div>
  );
}

export default AdminDash;