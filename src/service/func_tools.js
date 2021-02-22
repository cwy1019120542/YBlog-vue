import { Message } from 'element-ui';
function check_email(rule, val, callback) {
	if (/^\w+@(\w+\.)+(com|cn|net)$/.test(val)) {
		callback()
	}
	else {
		callback(new Error("邮箱格式不正确"))
	}

}
function el_message(message, type='error') {
	return Message({
		message: message,
		type: type,
		showClose: true, 
		duration: 5000, 
	})
}
export {check_email, el_message}