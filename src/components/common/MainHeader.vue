<template>
    <header class="main-header">
        <div class="title">租伴网</div>
        <div class="right">
            <el-dropdown @command="outLogin">
                <span class="el-dropdown-link">
                    {{userInfo.nick_name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>{{userInfo.account}}</el-dropdown-item>
                    <el-dropdown-item disabled>{{userInfo.region_name}}</el-dropdown-item>
                    <el-dropdown-item command="outLogin">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
export default {
    name: 'main-header',
    data() {
        return {
            userInfo: ''
        }
    },
    mounted() {
        this.userInfo = NormalHelper.userInfo();
        this.userInfo.region_name = this.userInfo.region_name.split("_").join("-");
    },
    methods: {
        outLogin() {
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
</style>
