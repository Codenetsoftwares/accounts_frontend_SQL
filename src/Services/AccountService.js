import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class AccountService {
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
}

export default new AccountService();
