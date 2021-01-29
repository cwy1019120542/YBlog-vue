<template>
	<div>
		<el-dialog title="用户登录" :visible.sync="visible['login']" center width='30%'>
			<el-form :model='login_data' :rules='login_rules' ref='login' label-width='20%' label-position="left" hide-required-asterisk>
				<el-form-item label="邮箱" prop='email'>
					<el-input v-model='login_data.email' prefix-icon='el-icon-user-solid' maxlength='50' show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model='login_data.password' prefix-icon='el-icon-s-cooperation' show-password></el-input>
				</el-form-item>
				<div>
				  <el-link class="forget_password" icon="el-icon-warning-outline" @click="show_dialog('forget_password')">忘记密码</el-link>
				  <el-link class="link_to" type="primary" @click="show_dialog('register')">没有账号？去注册<i class="el-icon-right"></i> </el-link>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" class='submit_button' @click="request_login">登录</el-button>
			</div>
		</el-dialog>

		<el-dialog title="用户注册" :visible.sync="visible['register']" center width='30%'>
			<el-form :model='register_data' :rules='register_rules' ref='register' label-width='20%' label-position="left" hide-required-asterisk>
				<el-form-item label="邮箱" prop='email'>
					<el-input v-model='register_data.email' prefix-icon='el-icon-user-solid' maxlength='50' show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model='register_data.password' prefix-icon='el-icon-s-cooperation' show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="check_password">
					<el-input type="password" v-model='register_data.check_password' prefix-icon='el-icon-s-check' show-password></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input v-model='register_data.captcha' prefix-icon='el-icon-s-opportunity' maxlength='6' show-word-limit class='captcha_input'></el-input>
					<el-button class='captcha_button' round :disabled="is_forbid" @click='get_captcha(register_data.email)'>获取验证码<span v-show='is_forbid'>({{seconds}}秒)</span></el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" class='submit_button'>注册</el-button>
			</div>
			<div>
				<el-link type="primary" class="link_to" @click="show_dialog('login')">已有账号，去登录<i class="el-icon-right"></i></el-link>
			</div>
		</el-dialog>

		<el-dialog title="重置密码" :visible.sync="visible['forget_password']" center width='30%'>
			<el-form :model='forget_password_data' :rules='forget_password_rules' ref='forget_password' label-width='20%' label-position="left" hide-required-asterisk>
				<el-form-item label="邮箱" prop='email'>
					<el-input v-model='forget_password_data.email' prefix-icon='el-icon-user-solid' maxlength='50' show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="new_password">
					<el-input type="password" v-model='forget_password_data.new_password' prefix-icon='el-icon-s-cooperation' show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="check_new_password" class="long_font">
					<el-input type="password" v-model='forget_password_data.check_new_password' prefix-icon='el-icon-s-cooperation' show-password></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input v-model='forget_password_data.captcha' prefix-icon='el-icon-s-opportunity' maxlength='6' show-word-limit class='captcha_input'></el-input>
					<el-button class='captcha_button' round :disabled="is_forbid" @click='get_captcha(forget_password_data.email)'>获取验证码<span v-show='is_forbid'>({{seconds}}秒)</span></el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" class='submit_button'>确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {v_email, v_password, v_captcha} from 'service/rules.js'
	export default {
		props: {
			'dialog_visible': String
		}, 
		watch: {
			dialog_visible(val) {
				this.show_dialog(val)
			}
		}, 
		data() {
			let register_password_equal = (rule, value, callback)=> {
				if (value !== this.register_data.password) {
					callback(new Error("两次输入的密码不一致"))
				} else {
					callback()
				}
			}
			let forget_password_password_equal = (rule, value, callback)=> {
				if (value !== this.forget_password_data.password) {
					callback(new Error("两次输入的密码不一致"))
				} else {
					callback()
				}
			}
			let register_password_rule = v_password.slice()
			let forget_password_password_rule = v_password.slice()
			register_password_rule.push({validator: register_password_equal, trigger: 'blur'})
			forget_password_password_rule.push({validator: forget_password_password_equal, trigger: 'blur'})
			return {
				'visible': {
					'login': false, 
					'register': false, 
					'forget_password': false
				}, 
				'seconds': 0, 
				'timer': null, 
				'is_forbid': false, 
				'login_data': {
					"email": '', 
					"password": '',
				}, 
				'register_data': {
					'email': '', 
					'password': '', 
					'check_password': '', 
					'captcha': ''
				}, 
				'forget_password_data': {
					'email': '', 
					'new_password': '', 
					'check_new_password': '', 
					'captcha': ''
				}, 
				'login_rules': {
					'email': v_email, 
					'password': v_password
				}, 
				'register_rules': {
					'email': v_email, 
					'password': v_password, 
					'check_password': register_password_rule, 
					'captcha': v_captcha
				}, 
				'forget_password_rules': {
					'email': v_email, 
					'new_password': v_password, 
					'check_new_password': forget_password_password_rule, 
					'captcha': v_captcha
				}
			}
		}, 
		methods: {
			get_captcha(email) {
				if (!this.timer) {
					requests.post('/captcha', {"email": email}).then(response=>{
					}).catch(error=>{
					})
					this.seconds = 60
					this.is_forbid = true
					this.timer = setInterval(()=>{
						if (this.seconds > 0) {
							this.seconds -= 1
						}
						else {
							clearInterval(this.timer)
							this.timer = null
							this.is_forbid = false
						}
					}, 1000)
				} 
			}, 
			show_dialog(name) {
				for (let key in this.visible) {
					this.visible[key] = false
					}
				this.visible[name] = true
				}, 
			request_login() {},
			}, 
	};
</script>

<style scope>
.captcha_input {
	width: 40%;
}
.captcha_button {
	float: right;
}
.link_to {
	float: right;
}
.submit_button {
	display: inline-block;
	width: 90%;
}
</style>