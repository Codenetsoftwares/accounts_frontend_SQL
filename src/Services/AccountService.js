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
      method: "get",
      url: API_HOST + "/api/get-bank-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  website(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/get-website-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  userId(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/user-id",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deletebank(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/delete-bank-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deletewebsite(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/delete-wesite-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  addBank(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/add-bank-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  inneruserprofile(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/user-profile-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  userprofile(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/user-profile",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  Introducerprofile(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/intoducer-profile",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  singlebank(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-single-bank-name/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editBank(data, id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/bank-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ManualBankEntryDeposit(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/add-bank-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  ManualBankEntryWithdraw(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/withdraw-bank-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetBankStMent(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/bank-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  GetBankuserStMent(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/user-bank-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ManualWebsiteEntryDeposit(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/add-website-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ManualWebsiteEntryWithdraw(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/withdraw-website-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetWebsiteStateMent(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/website-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetWebsiteSmmry(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/user-website-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  createIntroducer(data, user) {
    console.log("user", user);
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/accounts/introducer/register",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  // Stress(data, user) {
  //   console.log("user", user);
  //   return axios({
  //     method: "post",
  //     url: `${API_HOST}/`,
  //     data: data,
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  // }

  createActualuser(data) {
    return axios({
      method: "post",
      url: API_HOST + "/api/accounts/user/register",
      data: data,
    });
  }

  IntroducerClient(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/intoducer/client-data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  Introducercut(id, user , data) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/introducer/introducerCut/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new AccountService();
