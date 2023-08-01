import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {

  // Add fade class and set animation delay for each element
  return (
    <div >
      <div className='content-wrapper'>        
           
              <Outlet />
            
      </div>
    </div>
  );
}

export default Layout;
