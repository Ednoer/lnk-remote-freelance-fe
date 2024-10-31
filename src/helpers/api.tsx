
import axios from 'axios'
import utils from './utils';
import http from './http';

const apiVersion = utils.apiVersion
const api = {
    async upload({ file, signUrl }: any): Promise<string> {
        try {
          const response = await utils.apiHandler<any>(http.post(`${apiVersion}/cloud-storages/sign`, signUrl ))
          const url = response.data;
          await axios.put(url, file, { headers: { 'Content-Type': file.type } });
          const { origin, pathname } = new URL(url);
          return origin + pathname 
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
          }
          throw new Error(error);
        }
      },
}

export default api
