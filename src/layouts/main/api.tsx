import utils from '@/helpers/utils'
import http from '@/helpers/http'

const api = {
    getListEmails(params: any) {
        return utils.apiHandler<any[]>(
            http.get(`${utils.apiVersion}/loop-email`, { params })
        )
    },
}

export default api