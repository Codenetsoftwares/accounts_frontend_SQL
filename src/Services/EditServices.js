import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class EditServices {

    ViewAlert(user) {
        return axios({
          method: 'get',
          url: API_HOST + '/api/superadmin/view-edit-requests',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
 

   

    
}

export default new EditServices();