<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-col :span="12">
                            <el-form-item label="注册手机号" prop="phone">
                                <el-input v-model.number="form.phone" placeholder="请输入注册手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户昵称" prop="name">
                                <el-input v-model.number="form.name" placeholder="请输入用户昵称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                                <el-button @click="resetForm('form')">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </div>
            </div>
            <div class="table">
                <el-table :data="userList" border style="width: 100%">
                    <el-table-column prop="nick_name" align="center" label="用户昵称" min-width="90">
                    </el-table-column>
                    <el-table-column prop="account" align="center" label="注册手机" min-width="120">
                    </el-table-column>
                    <el-table-column prop="register_time" align="center" label="注册时间" min-width="130">
                    </el-table-column>
                    <el-table-column prop="status_name" align="center" label="账号状态" min-width="120">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="140">
                        <template scope="scope">
                            <el-button @click="deleteUser(scope.$index, userList)" size="small">
                                {{scope.row.status==1?"禁用":"正常"}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="el-pagination" @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            form: {
                phone: '',
                name: '',
                status: 1
            },
            userList: [],
            page: 1,
            total: 0
        }
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            var param = {
                c: 'Admin',
                m: 'User',
                a: 'getUserList',
                status: this.form.status,
                page: this.page,
                row: 10
            };
            if (this.form.phone != "") {
                param.phone = this.form.phone;
            }
            if (this.form.name != "") {
                param.name = this.form.name;
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    for (var i = 0; i < response.list.length; i++) {
                        response.list[i].status_name = response.list[i].status == 1 ? "正常" : "禁用";
                    }
                    this.userList = response.list;
                    this.total = parseInt(response.total);
                },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        deleteUser(index, rows) {
            var param = {
                c: 'Admin',
                m: 'User',
                a: 'deleteUser',
                userId: rows[index].user_id
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.getUserList();
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.page = 1;
                    this.getUserList();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getUserList();
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    padding: 15px;
    .header {
        .search {
            margin-top: 15px;
            .select {
                display: block;
            }
        }
    }
    .table {
        .el-pagination {
            float: right;
            margin: 5px 20px 0 0;
        }
    }
}
</style>
