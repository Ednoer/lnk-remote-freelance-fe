import utils from '@/helpers/utils'
import {
    LoginData, LoginResponse,
} from './interface'
import http from '@/helpers/http'

const api = {
    login(data: LoginData) {
        return utils.apiHandler<LoginResponse>(
            http.post(`${utils.apiVersion}/auth/login`, data)
        )
    },
    logout() {
        return utils.apiHandler<any>(
            http.post(`${utils.apiVersion}/auth/logout`)
        )
    }
}

export default api