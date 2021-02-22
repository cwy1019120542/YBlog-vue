import axios from 'axios';
import { el_message } from 'service/func_tools.js';
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
    return res.data.data;
};

let response_err = function (err) {
    if (err.response) {
        el_message(MESSAGES[err.response.data.error_code])
    }
    return Promise.reject(err);
};

requests.interceptors.request.use(request, request_err);
requests.interceptors.response.use(response, response_err);

window.requests = requests;
