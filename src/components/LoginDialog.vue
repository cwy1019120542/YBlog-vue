<template>
	<div>
		<el-dialog title="登录" :visible.sync="visible" center width='30%'>
			<el-form :model='data' :rules='loginRules' ref='login'>
				<el-form-item label="邮箱" prop='email'>
					<el-input v-model='data.email' prefix-icon='el-icon-user-solid' maxlength='50' show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model='data.password' prefix-icon='el-icon-s-cooperation' show-password></el-input>
				</el-form-item>
				<div>
				  <el-link class="forget_password" icon="el-icon-warning-outline">忘记密码</el-link>
				  <el-link class="register" type="primary">没有账号？去注册<i class="el-icon-right"></i> </el-link>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button icon="el-icon-close" circle @click="visible = false"></el-button>
				<el-button type="success" icon="el-icon-check" circle @click="login"></el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {loginRules} from 'service/rules.js'
	export default {
		props: {
			"LoginDialogVisible": Boolean
		}, 
		data () {
			return {
				data: {
					"email": '', 
					"password": '',
				}, 
				"visible": this.LoginDialogVisible, 
				"loginRules": loginRules, 
			}
		}, 
		watch: {
			LoginDialogVisible (val) {
				this.visible = val
			}
		}, 
		methods: {
			login() {
				console.log(this.$refs)
				this.$refs["login"].validate((valid)=>{
					if (valid) {
						alert("success")
					}
					// else {
					// 	return false
					// }
				})
			}, 
		}
	};
</script>

<style scope>
.forget_password {
	float: left;

}
.register {
	float: right;
}

	
</style>