<template>
	<div>
		<el-dialog title="YBlog注册页面" :visible.sync="visible" center width='30%'>
			<el-form :model='data' :rules='registerRules' ref='register' label-width='20%' label-position="left">
				<el-form-item label="邮箱" prop='email'>
					<el-input v-model='data.email' prefix-icon='el-icon-user-solid' maxlength='50' show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model='data.password' prefix-icon='el-icon-s-cooperation' show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="check_password">
					<el-input type="password" v-model='data.check_password' prefix-icon='el-icon-s-check' show-password></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input v-model='data.captcha' prefix-icon='el-icon-s-opportunity' maxlength='6' show-word-limit class='captcha_input'></el-input>
					<el-button class='captcha_button' round :disabled="is_forbid" @click='get_captcha'>获取验证码<span v-show='is_forbid'>({{seconds}}秒)</span></el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" class='register_button'>注册</el-button>
			</div>
			<div>
				<el-link type="primary" class="go_login" @click="$emit('showLogin')">已有账号，去登录<i class="el-icon-right"></i></el-link>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			'RegisterDialogVisible': Boolean
		}, 
		watch: {
			RegisterDialogVisible(val) {
				this.visible = val
			}
		}, 
		data() {
			return {
				'visible': false, 
				'seconds': 0, 
				'timer': null, 
				'is_forbid': false, 
				data: {
					'email': '', 
					'password': '', 
					'check_password': '', 
					'captcha': ''
				}
			}
		}, 
		methods: {
			get_captcha() {
				if (!this.timer) {
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
.go_login {
	float: right;
}
.register_button {
	display: inline-block;
	width: 90%;
}
</style>