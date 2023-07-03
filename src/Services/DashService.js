import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_HOST;

class DashServices {
    depositTransaction(data,user) {
      return axios({
        method: 'post',
        url: API_HOST + '/deposit/transaction',
        data: data,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
    withdrawTransaction(data,user) {
        return axios({
          method: 'post',
          url: API_HOST + '/withdraw/transaction',
          data: data,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
}
export default new DashServices;