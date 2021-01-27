<template>
	<div>
		<el-button type="primary" @click="LoginDialogVisible = true">登录弹开</el-button>
		<el-button type="primary" @click="LoginDialogVisible = false">登录收起</el-button>
		<LoginDialog :LoginDialogVisible="LoginDialogVisible"></LoginDialog>
		<el-button type="primary" @click="RegisterDialogVisible = true">注册弹开</el-button>
		<el-button type="primary" @click="RegisterDialogVisible = false">注册收起</el-button>
		<RegisterDialog :RegisterDialogVisible="RegisterDialogVisible" @showLogin='show_login'></RegisterDialog>
	</div>
</template>

<script>
import LoginDialog from 'components/LoginDialog.vue'
import RegisterDialog from 'components/RegisterDialog.vue'
	export default {
		components: {
			LoginDialog, 
			RegisterDialog
		}, 
		data () {
			return {
				'LoginDialogVisible': false, 
				'RegisterDialogVisible': false, 
			}
		}, 
		methods: {
			show_login() {
				this.RegisterDialogVisible = false
				this.LoginDialogVisible = true
			}, 
		}
	}
</script>