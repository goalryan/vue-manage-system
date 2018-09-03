<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="userNo">
                    <el-input v-model="ruleForm.userNo" placeholder="userNo"></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="pwd" placeholder="pwd" v-model="ruleForm.pwd" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 输入正确的用户名密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import md5 from '../utils/md5';

    export default {
        data: function(){
            return {
                submitData:{
                    userNo: '',
                    pwd: ''
                },
                ruleForm: {
                    userNo: 'admin',
                    pwd: '123456'
                },
                rules: {
                    userNo: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitData.userNo=this.ruleForm.userNo;
                        this.submitData.pwd= md5.hex_md5(this.ruleForm.pwd).toUpperCase();
                        this.$http.post('/fmUser/login', this.submitData)
                            .then(res => {
                                const {token, code} = res;
                                if (code === 200) {
                                    sessionStorage.setItem("token", token);
                                    localStorage.setItem('ms_username',this.ruleForm.userNo);
                                    this.$router.push('/');
                                } else {
                                    this.$message({message: res.msg, type: 'error'});
                                }
                            })
                            .catch(e => {
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
