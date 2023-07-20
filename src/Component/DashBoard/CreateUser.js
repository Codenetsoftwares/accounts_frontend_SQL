import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourSurname: '',
    yourEmail: '',
    yourSubject: '',
    yourMessage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    // You can access the form data using 'formData'
    console.log(formData);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
         
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="your-name" className="form-label">
                First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="your-name"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="your-surname" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="your-surname"
                  name="yourSurname"
                  value={formData.yourSurname}
                  onChange={handleChange}
                  placeholder=''
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="your-email" className="form-label">
                Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="your-email"
                  name="yourEmail"
                  value={formData.yourEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
               <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-dark w-100 fw-bold">
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
     
    </div>
    
             
              
  );
};

export default ContactForm;
