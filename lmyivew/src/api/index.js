import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.response.use((response) => {
  return response.data
});

export let $axiox = () => {
  return axios
};

export let getShowUserInfo = () => {
  return axios.get('/user/queryAllUserShowInfo')
};

export let getSchoolSta = () => {
  return axios.get('/user/schoolSta')
};
