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
  IsTransactionDeleteApprove(_id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-transaction/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsTransactionDeleteReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  IsManualBankTransactionDeleteApprove(_id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-bank-transaction/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsManualBankTransactionDeleteReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  IsManualWebsiteTransactionDeleteApprove(_id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-website-transaction/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsManualWebsiteTransactionDeleteReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject/${_id}`,
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

  NewBankRqApprove(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/approve-bank/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  NewWebsiteRqApprove(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/approve-website/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  NewBankRqReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/bank/reject/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  NewWebsiteRqReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject/${_id}`,
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

  IsWebsiteEditApprove(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/approve-website-detail-edit-request/${id}`,
      data: data,
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
      url: `${API_HOST}/api/reject/bank-detail/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ViewWebsiteDelete(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-website-edit-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsWebsiteDeleteApprove(_id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-website/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsWebsiteDeleteReject(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject-website-edit/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  ViewwebsiteEditRq(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-website-edit-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ViewBankEditRq(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-bank-edit-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  IsEditIntroducerApprove(_id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/approve-introducer-edit-request/${_id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  IsDeleteIntroducerApprove(_id, user) {
    console.log(user);
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-introducer-transaction/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  BankActiveInactive(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/bank/isactive/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new EditServices();
