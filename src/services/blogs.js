import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog) => {
    const response = await axios.post(baseUrl, newBlog, { // 2nd arg = data of new obj, 3rd arg = config
        headers: { Authorization: token }
    })
    return response.data
}

const update = async (blogId, newBlog) => {
    const response = await axios.put(`${baseUrl}/${blogId}`, newBlog)
    return response.data
}

export default { setToken, getAll, create, update }