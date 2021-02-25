let axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:8099/',
    timeout: 3000
});

export default function getInstance(){
    return instance
}