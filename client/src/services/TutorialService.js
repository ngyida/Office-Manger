import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

export const create = payload => api.post(`/tutorials`, payload)
export const getAll = () => api.get(`/tutorials`)
export const update = (id, payload) => api.put(`/tutorials/${id}`, payload)
export const remove = id => api.delete(`/tutorials/${id}`)
export const get = id => api.get(`/tutorials/${id}`)
export const removeAll = () => api.delete(`/tutorials`)

const TutorialService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
}

export default TutorialService