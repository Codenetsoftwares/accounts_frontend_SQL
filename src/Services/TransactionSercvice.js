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

  subAdminList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/",
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
}

export default new TransactionService();
