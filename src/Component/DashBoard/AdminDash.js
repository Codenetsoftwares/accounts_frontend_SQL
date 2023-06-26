import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardFd } from './CardFd';
import { CardFdT } from './CardFdT';





const AdminDash = () => {
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

  return (
    <div className='main'>
<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{height:'4rem'}}>
  <div>
  <span className="navbar-brand" style={{marginLeft:'1rem',fontWeight:'bold'}}>Welcome Admin</span>
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
<span style={{marginLeft:'2rem'}}>Select by Date</span>
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
</nav>
<div className='FddivCard' style={{display:'flex', flexDirection:'row'}}>
<CardFd/>
<CardFdT/>
</div>
</div>
  );
}

export default AdminDash;
