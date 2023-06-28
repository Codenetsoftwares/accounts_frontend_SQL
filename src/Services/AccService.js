import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class AccountService {
    login(data) {
      return axios({
        method: 'post',
        url: API_HOST + '/deposit/login',
        data: data,
      });
    }
}

export default new AccountService();
