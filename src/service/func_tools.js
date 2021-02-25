function check_email(rule, val, callback) {
	if (/^\w+@(\w+\.)+(com|cn|net)$/.test(val)) {
		callback()
	}
	else {
		callback(new Error("邮箱格式不正确"))
	}
}

function sort_and_connect(data) {
	let key_list = Object.keys(data)
	key_list.sort()
	let str_item_list = []
	for (let key of key_list) {
		str_item_list.push(`${key}=${data[key]}`)
	}
	return str_item_list.join("&")
}
export {check_email, sort_and_connect}