import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

export const create = async payload => api.post(`/tutorials`, payload)
export const getAll = async () => api.get(`/tutorials`)
export const update = async (id, payload) => api.put(`/tutorials/${id}`, payload)
export const remove = async id => api.delete(`/tutorials/${id}`)
export const get = async id => api.get(`/tutorials/${id}`)
export const removeAll = async () => api.delete(`/tutorials`)
export const findByTitle = async (title, pageNum) => await api.get(`/tutorials/title/${title}/${pageNum}`)
export const getPage = async pageNum => api.get(`/tutorials/page/${pageNum}`)

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