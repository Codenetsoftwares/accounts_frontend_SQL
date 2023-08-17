import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;

class DashServices {
  CreateTransaction(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/create/transaction",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}
export default new DashServices();
