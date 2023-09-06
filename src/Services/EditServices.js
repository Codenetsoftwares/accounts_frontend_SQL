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
}

export default new EditServices();
