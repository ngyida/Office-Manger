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
export const findByTitle = (title, pageNum) => api.get(`/tutorials/title/${title}/${pageNum}`)
export const getPage = pageNum => api.get(`/tutorials/page/${pageNum}`)

const TutorialService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    getPage
}

export default TutorialService