import axios from 'axios';

export default (apiPath, apiParams) => {
  return axios.get(apiPath, {params: apiParams}).then((resp) => {
    return resp.data;
  });
};

