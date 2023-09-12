import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class EditServices {
  ViewAlert(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-edit-transaction-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  IsApprove(_id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/approve-transaction-edit-request/${_id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsBankApprove(_id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/approve-bank-edit-request/${_id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }


  IsBankEditApprove(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/approve-bank-detail-edit-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }


  IsWebsiteApprove(_id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/approve-website-edit-request/${_id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }


  ViewBankDelete(user) {

    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-bank-edit-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }


  IsBankDeleteApprove(_id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-bank/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsBankDeleteReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

}

export default new EditServices();
