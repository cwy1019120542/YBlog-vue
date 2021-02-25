import { Message } from 'element-ui';

const MESSAGES = {
	1005: "身份认证过期，请您重新登录", 
	1018: "验证码发送失败，请您检查邮箱是否输入正确", 
	1010: "验证码错误，请您确认或重新发送",
	1013: "该邮箱已经注册",
	1014: "操作过于频繁，请您稍等", 
	1016: "该邮箱还未注册",
	1017: "密码错误，请您确认或重新输入",
	1100: "请求失败，请您检查网络或联系管理员", 
	1101: "邮箱格式不正确，请您重新确认", 
	1200: "验证码发送成功", 
	1201: "注册成功，请您登录", 

}

function el_message(message_code) {
	let type = "error"
	if (message_code >= 1300) {
		type = "warning"
	}
	else if (message_code >= 1200) {
		type = "success"
	}
	return Message({
		message: MESSAGES[message_code],
		type: type,
		showClose: true, 
		duration: 5000, 
	})
}

export {el_message}