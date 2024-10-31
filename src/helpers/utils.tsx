import { Response } from '@/interface/interface';
import axios, { AxiosResponse } from 'axios'

const utils = {
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || '',
  async apiHandler<T>(
    request: Promise<AxiosResponse<Response<T>>>
  ): Promise<Response<T>> {
    try {
      return (await request).data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.response?.data)
      }
      throw new Error(error)
    }
  },
  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}

export default utils
