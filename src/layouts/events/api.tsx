import utils from '@/helpers/utils'
import http from '@/helpers/http'
import { UpsertEvent } from './interface'

const api = {
    deleteEvent(id: any) {
        return utils.apiHandler<any>(
            http.delete(`${utils.apiVersion}/loop-email/${id}`)
        )
    },
    addEvent(data: UpsertEvent) {
        return utils.apiHandler<any>(
            http.post(`${utils.apiVersion}/loop-email`, data)
        )
    },
    updateEvent(id: any, data: UpsertEvent) {
        return utils.apiHandler<any>(
            http.patch(`${utils.apiVersion}/loop-email/${id}`, data)
        )
    },
    getEvent(id: any) {
        return utils.apiHandler<any>(
            http.get(`${utils.apiVersion}/loop-email/${id}`)
        )
    },
}

export default api