import axios from 'axios';
import { Message } from 'element-ui';

const requests = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
    },
    baseURL: 'http://localhost:5000',
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
    if (res.status == 200) {
        if (data.error_code == 0) {
            return data;
        } else {
            Message({
                message: data.message,
                type: 'error',
            })
        }
    }
};

let response_err = function (err) {
    if (err.response) {
        const data = err.response.data;
        Message({
            message: data.message,
            type: 'error',
        })
    }
    return Promise.reject(err);
};

requests.interceptors.request.use(request, request_err);
requests.interceptors.response.use(response, response_err);

window.requests = requests;
