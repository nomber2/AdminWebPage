import axios from 'axios'
axios.defaults.baseURL = 'http://120.79.26.171:8080';
axios.interceptors.response.use((response) => {
  return response.data
});

export let $axiox = () => {
  return axios
};

export let getShowUserInfo = () => {
  return axios.get('/lmy/user/queryAllUserShowInfo')
};

export let getSchoolSta = () => {
  return axios.get('/lmy/user/schoolSta')
};

export let getAllUserCount = () => {
  return axios.get('/lmy/user/getCountUser')
};
