import React from 'react'
import CreateRequestNew from '../Component/CreateRequestNew'
import AccountService from '../Services/AccountService'
import EditServices from '../Services/EditServices'

const NewWebsite = () => {
  return (
    <div>
      <CreateRequestNew Api={AccountService.getrequestedwebsite} EditApi={EditServices.NewWebsiteRqApprove} purpose={"website"} ApiReject={EditServices.NewWebsiteRqReject} />
    </div>
  )
}

export default NewWebsite