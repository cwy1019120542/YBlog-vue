const loginRules = {
	"email": [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
	"password": [
			{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
	], 
};

export {loginRules};