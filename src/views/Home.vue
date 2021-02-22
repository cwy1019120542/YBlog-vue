<template>
	<div>
		<el-button type="primary" @click="dialog_visible='login'">登录</el-button>
		<el-button type="primary" @click="dialog_visible='register'">注册</el-button>
		<el-button type="primary" @click="dialog_visible='reset_password'">忘记密码</el-button>
		<Login :dialog_visible='dialog_visible'></Login>
	</div>
</template>

<script>
import Login from 'components/Login.vue'
	export default {
		components: {
			Login
		}, 
		data () {
			return {
				'dialog_visible': ''
			}
		}, 
	};
</script>