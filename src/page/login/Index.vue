<template>
    <div>
        <div>
            <div class="container-body">
                <div class="wapper-main">
                    <div class="content-wapper">
                        <h3>欢迎使用租伴网后台管理系统</h3>
                        <el-input v-model="account" placeholder="您的账号"></el-input>
                        <el-input type="password" v-model="password" placeholder="您的密码"></el-input>
                        <el-button type="primary" class="login" @click="login()">登录</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            account: '',
            password: ''
        }
    },
    mounted() {

    },
    methods: {
        login() {
            var param = {
                c: 'Admin',
                m: 'User',
                a: 'login',
                account: this.account,
                password: this.password
            };

            var mobile = param.account;
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
                NormalHelper.alert("手机号码有误，请重填");
                return false;
            };
            var str = /^(\w){6,20}$/;
            if (!str.exec(this.password)) {
                NormalHelper.alert("密码格式错误！");
                return false;
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    NormalHelper.setUserInfo(response);
                    this.$router.push({
                        path: '/index'
                    });
                }
            };
            AjaxHelper.GetRequest(p_obj);
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {}

.title-wapper {
    font-size: 20px;
    text-align: center;
    margin-top: 40px;
}

.wapper-main {
    width: 358px;
    height: 398px;
    background: #FFFFFF;
    border: 1px solid #D3DCE6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    margin: auto;
    margin-top: 40px;
    .hidden {
        display: none;
    }
    .content-wapper {
        height: 347px;
        margin: 20px 50px;
        .el-input {
            margin-top: 20px;
        }
        .login {
            width: 100%;
            margin-top: 20px;
        }
        .prompt-regist {
            text-align: right;
            margin-top: 20px;
        }
    }
}

@media screen and (max-width: 640px) {
    .title-wapper {
        visibility: hidden;
    }
    .wapper-main {
        border: 0px;
        box-shadow: none;
        width: 100%;
        .hidden {
            display: block;
        }
        div.content-wapper:first-child {
            margin-top: 0px;
        }
    }
    .tab-hidden {
        display: none;
    }
}
</style>
