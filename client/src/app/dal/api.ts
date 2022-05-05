const axios = require('axios').default;

axios.defaults.baseURL = 'http://localhost:5001';

export function getSomething({}): any {
  return axios.get('')
  .then(function (response: any) {
    return response['data'];
  });
}