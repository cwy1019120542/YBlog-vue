const format_dict = {
		'input': ['输入', 'blur']
	}

class Rules {
	constructor(min, max, field, rule_list=['required', 'len_limit'], kind='input') {
		this.min = min, 
		this.max = max
		this.field = field
		this.kind = kind
		this.rule_list = rule_list
	}
	required() {
		let [operate, trigger] = format_dict[this.kind].slice(0, 2)
		return {required: true, message: `请${operate}${this.field}`, trigger: trigger}
	}
	len_limit() {
		return { min: this.min, max: this.max, message: this.min===this.max?`长度为${this.min}个字符`:`长度为${this.min}到${this.max}个字符`, trigger: format_dict[this.kind][1] }
	}
	get_rule() {
		let result = []
		for (let rule of this.rule_list) {
			result.push(this.[rule]())
		}
		return result
	}
}

const v_email = new Rules(1, 100, "邮箱").get_rule()
const v_password = new Rules(1, 50, "密码").get_rule()
const v_captcha = new Rules(6, 6, "验证码").get_rule()

export {v_email, v_password, v_captcha};