<template>
    <div>
        <header class="main-header">
            <div class="title">租伴网后台</div>
            <div class="right">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                    {{userInfo.nick_name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>{{userInfo.account}}</el-dropdown-item>
                        <el-dropdown-item disabled>{{userInfo.region_name}}</el-dropdown-item>
                        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="outLogin">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </header>
        <el-dialog title="修改密码" v-model="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="旧密码：">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                    <el-input v-model="form.confirmpassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'main-header',
    data() {
        return {
            userInfo: '',
            dialogFormVisible: false,
            form: {
                password: '',
                confirmpassword: ''
            }
        }
    },
    mounted() {
        this.userInfo = NormalHelper.userInfo();
        this.userInfo.region_name = this.userInfo.region_name;
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'outLogin':
                    this.$confirm('您确定要退出登陆吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        SaveDataHelper.delCookie(GlobalModel.COOKIE_USER_INFO);
                        localStorage.clear();
                        this.$router.push({
                            path: '/login'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                    break;
                case 'changePassword':
                    this.dialogFormVisible = true;
                    break;
            }
        },
        changePwd() {
            let bool = true;
            if (this.form.password == "") {
                bool = false;
                NormalHelper.alert(this, '旧密码不得为空', 'warning');
                return;
            }
            if (this.form.confirmpassword == "") {
                bool = false;
                NormalHelper.alert(this, '新密码不得为空', 'warning');
                return;
            }
            if (bool) {
                var param = {
                    oldPwd: this.form.password,
                    newPwd: this.form.confirmpassword
                };
                var p_obj = {
                    action: '&c=Admin&m=User&a=changePassword',
                    param: param,
                    success: (response) => {
                        NormalHelper.alert(this, '修改成功', 'success');
                        this.dialogFormVisible = false;
                    }
                };
                AjaxHelper.PostRequest(p_obj);
            }
        }
    }
}
</script>
<style lang="less">
.main-header {
    width: 100%;
    height: 60px;
    background-color: #324057;
    position: relative;
    max-height: 100px;
    .title {
        font-size: 20px;
        color: #FFFFFF;
        margin: 0 20px;
        min-height: 100%;
        line-height: 60px;
        display: inline-block;
    }
    .right {
        position: absolute;
        right: 21px;
        top: 0;
        min-height: 100%;
        color: #ffffff;
        line-height: 60px;
        .el-dropdown {
            cursor: pointer;
            color: #FFFFFF;
            font-size: 16px;
        }
    }
}

.el-dialog {
    width: 400px;
}
</style>
