import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_HOST;
class CalenderServices {
    celenderdepositTransaction(data,user) {
      return axios({
        method: 'post',
        url: API_HOST + '/api/deposit/filter-dates',
        data:data ,
        headers: {
            Authorization: `Bearer ${user.token}`,
          },  
       
      });
    }
    celenderwithdrawTransaction(data,user) {
        return axios({
          method: 'post',
          url: API_HOST + '/api/withdraw/filter-dates',
         data:data,   
         headers: {
            Authorization: `Bearer ${user.token}`,
          },  
        });
      }
}
export default new CalenderServices;