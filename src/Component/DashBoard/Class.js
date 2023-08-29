import React from 'react';

function Withdraw() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to left, green, white)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      color: 'white',
    }}>
      <div className="form-box" style={{
        width: '380px',
        height: '450px',
        backgroundColor: 'black',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        opacity: 0.5,
        borderRadius: '2%',
      }}>
        <div className="header-form" style={{
          marginBottom: '15px',
        }}>
          <h4 className="text-primary text-center">
            <i
              className="fa fa-user-circle"
              style={{ fontSize: "110px" }}
            ></i>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button type="button" className="btn btn-secondary btn-block" style={{
              marginTop: '40px',
              marginBottom: '10px',
            }}>
              LOGIN
            </button>
            <div className="message" style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <div>
                <input type="checkbox" /> Remember ME
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Withdraw;
