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
}

    depositlogin(data) {
      return axios({
        method: 'post',
        url: API_HOST + '/deposit/login',
        data: data,
      });
    }
    withdrawlogin(data) {
      return axios({
        method: 'post',
        url: API_HOST + '/withdraw/login',
        data: data,
      });
    }
    adminlogin(data) {
      return axios({
        method: 'post',
        url: API_HOST + '/admin/login',
        data: data,
      });
    }
    createuser(data,user) {
      return axios({
        method: 'post',
        url: API_HOST + '/api/create/user-admin',
        data: data,
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
    }
r
    websitedetails(data,user) {
      return axios({
        method: 'post',
        url: API_HOST + '/api/add-website-name',
        data: data,
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
    }

    addbank(data,user) {
      return axios({
        method: 'post',
        url: API_HOST + '/api/add-bank-name',
        data: data,
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
    }
 }


export default new AccountService();
