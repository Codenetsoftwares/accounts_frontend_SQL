import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class TransactionService {
  getAccountSummary(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/account-summary",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  subAdminList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/sub-admin-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  bankSubAdminList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/sub-admin-name/bank-view",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  websiteSubAdminList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/sub-admin-name/website-view",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  websiteList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/website-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  bankList(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/bank-name",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editBnkTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-bank-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  editWebTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-website-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  delBankTransactionData(id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/save-bank-transaction-request/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  delWebTransactionData(id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/save-website-transaction-request/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  filterTransaction(data, page, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/filter-data?page=${page}&itemsPerPage=${10}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntroducerTransaction(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/create/introducer/transaction`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntroducerDepositTransaction(data, user) {
    console.log(data);
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/create/introducer/deposit-transaction`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntroducerWithdrawTransaction(data, user) {
    console.log(data);
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/create/introducer/withdraw-transaction`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntroducerStatement(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/introducer-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  subadminWiseTxn(username, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/view-subadmin-transaction/${username}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editIntroducerTransactionData(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-introducer-transaction-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntroducerAlertTransaction(user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/superadmin/view-edit-introducer-transaction-requests`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  MoveTrashTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-transaction/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  MoveTrashBankTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-bank-transaction/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  MoveTrashWebsiteTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-website-transaction/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  RestoreBankTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/restore/bank/data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  RestoreWebsiteTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/restore/website/data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  RestoreTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/restore/transaction/data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsTransactionDelete(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/reject/trash/transactions/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ViewTrash(user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/view-trash`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  MoveTrashIntroducerTransaction(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/move-introducer-transaction-to-trash`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  RestoreIntroducerTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/restore/Introducer/data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new TransactionService();
