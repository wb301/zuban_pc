<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')">提交</el-button>
                            <el-button @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="table">
                <el-table :data="List" border style="width: 100%">
                    <el-table-column prop="id" align="center" label="编号" min-width="90">
                    </el-table-column>
                    <el-table-column prop="create_time" align="center" label="申请时间" min-width="160">
                    </el-table-column>
                    <el-table-column prop="from" align="center" label="提现类型" min-width="100">
                    </el-table-column>
                    <el-table-column prop="account" align="center" label="提现账号" min-width="200">
                    </el-table-column>
                    <el-table-column prop="price" align="center" label="提现金额" min-width="100">
                    </el-table-column>
                    <el-table-column prop="status_name" align="center" label="状态" min-width="90">
                    </el-table-column>
                   <!-- <el-table-column prop="nick_name" align="center" label="用户名" min-width="100">
                    </el-table-column>-->
                    <el-table-column prop="update_time" align="center" label="完成时间" min-width="160">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="140">
                        <template scope="scope">
                            <el-button @click="changeState(scope.$index, List)" size="small">
                                {{scope.row.status==1?"":"已完成"}}
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
                List: [],
                total: 0,
                page: 1

            }
        },
        mounted() {
            this.getRegionManagerList();
        },
        methods: {
            getRegionManagerList() {
                var param = {
                    c: 'Admin',
                    m: 'Withdraw',
                    a: 'getUserWithdrawHistoryList',
                    page: this.page,
                    row: 10
                };
                var p_obj = {
                            action: '',
                            param: param,
                            success: (response) => {
                            for (var i = 0; i < response.list.length; i++) {
                       response.list[i].status_name = response.list[i].status == 1 ? "提现成功" : "提现中";
                }
                this.List = response.list;
                this.total = parseInt(response.total);
            },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
                AjaxHelper.GetRequest(p_obj);
            },
            edit(index, rows) {

            },
            changeState(index, rows) {
                var param = {
                    c: 'Admin',
                    m: 'User',
                    a: 'updRegionManagerStatus',
                    id: rows[index].id,
                    status: rows[index].status
                };
                var p_obj = {
                            action: '',
                            param: param,
                            success: (response) => {
                            row[index].status = row[index].status == 1 ? 0 : 1;
                row[index].status_name = row[index].status == 1 ? "提现成功" : "提现中";
            },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
                AjaxHelper.GetRequest(p_obj);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.form.region3 != "") {
                            this.page = 1;
                            this.getRegionManagerList();
                        }
                    } else {
                        return false;
            }
            });
            },
            resetForm(formName) {

            },
            handleCurrentChange(val) {
                this.page = val;
                this.getRegionManagerList();
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
