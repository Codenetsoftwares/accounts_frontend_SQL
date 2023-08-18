import React from 'react'
import TopNavbar from './TopNavbar'
import NavSide from './NavSide'
import Layout from './Layout'

const AdminLayout = () => {
  return (
    <div data-widget="pushmenu">
      <TopNavbar/>
      <NavSide/>
      <Layout/>
    </div>
  )
}

export default AdminLayout 
