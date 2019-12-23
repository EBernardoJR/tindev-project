import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/' //para evitar de por na url
})

export default api