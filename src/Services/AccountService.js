import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;

class AccountService {
  depositlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/deposit/login",
      data: data,
    });
  }
  withdrawlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/withdraw/login",
      data: data,
    });
  }
  adminlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/admin/login",
      data: data,
    });
  }
  createuser(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/create/user-admin",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  websitedetails(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/add-website-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  addbank(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/add-bank-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  getbank(user) {
    return axios({
      method: 'get',
      url: API_HOST + '/api/get-bank-name',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  website(user) {
    return axios({
      method: 'get',
      url: API_HOST + '/api/get-website-name',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deletebank(data,id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-bank-name/:id${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deletewebsite(data,id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-wesite-name/:id${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  userprofile(user) {
    return axios({
      method: 'get',
      url: API_HOST + '/api/user-profile',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

}

export default new AccountService();
