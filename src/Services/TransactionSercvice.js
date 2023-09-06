import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class TransactionService {
  depositView(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/deposit/view",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  withdrawView(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/withdraw/view",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getAccountSummary(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/account-summary",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  subAdminList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/sub-admin-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  websiteList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/website-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  bankList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/bank-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editBnkTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-bank-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  editWebTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-website-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  delBankTransactionData(id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/save-bank-transaction-request/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  delWebTransactionData(id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/save-website-transaction-request/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new TransactionService();
