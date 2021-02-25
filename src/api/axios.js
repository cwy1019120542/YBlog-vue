import axios from 'axios';
import { el_message } from 'service/messages.js'
import { sort_and_connect } from 'service/func_tools.js'
import { uuid } from 'vue-uuid'
import crypto from "crypto"

const public_url = ['/captcha', '/secret']

const requests = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'http://localhost:5000/yblog/api',
});
//http request 拦截器
let request = function (config) {
    let url = config.url
    if (!public_url.includes(url)) {
        let extra_params = {
            'timestamp': Math.round(new Date().getTime() / 1000), 
            'uid': uuid.v4()
        }
        if (config.hasOwnProperty("params")) {
            Object.assign(config.params, extra_params)
        }
        else {
            config.params = extra_params
        }
        let str_data_list = []
        for (let request_data of [{'url': config.baseURL + config.url, 'secret': localStorage.getItem("secret"), 'method': config.method}, config.params, config.data]) {
            let str_data = sort_and_connect(request_data)
            str_data_list.push(str_data)
        }
        let all_str_data = str_data_list.join(".")
        console.log(all_str_data)
        let md5 = crypto.createHash("md5")
        md5.update(all_str_data)
        let signature = md5.digest("hex")
        console.log(signature)
        config.params.signature = signature
    }
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
        el_message(err.response.data.error_code)
    }
    else
    {
        el_message(1100)
    }
    return Promise.reject(err);
};

requests.interceptors.request.use(request, request_err);
requests.interceptors.response.use(response, response_err);

window.requests = requests;
