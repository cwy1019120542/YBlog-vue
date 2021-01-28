import axios from 'axios';
import { Message } from 'element-ui';
import { MESSAGES } from 'service/messages.js'

const requests = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'http://localhost:5000/yblog/api',
});
//http request 拦截器
let request = function (config) {
    return config;
};
let request_err = function (err) {
    return Promise.reject(err);
};


// http response 拦截器
let response = function (res) {
    const data = res.data;
    return data;
};

let response_err = function (err) {
    if (err.response) {
        Message({
            message: MESSAGES[err.response.data.error_code],
            type: 'error',
            showClose: true, 
            duration: 5000, 
        })
    }
    return Promise.reject(err);
};

requests.interceptors.request.use(request, request_err);
requests.interceptors.response.use(response, response_err);

window.requests = requests;
