import axios from 'axios';

const api = axios.create({
    baseURL:'https://limitless-plateau-12012.herokuapp.com'
})

export default api;