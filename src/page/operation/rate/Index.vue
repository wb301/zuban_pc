<template>
    <div>
        <div class="container-body">
            <h1>平台手续费配置</h1>
            <div class="header">平台手续费:{{form.poundage}}%
                <el-button type="text" @click="dialogFormVisible=true">编辑</el-button>
            </div>
            <h1>会员规则配置</h1>
            <div class="header">
                <div class="add-btn">
                    <el-button @click="editMembers(false)">新增等级</el-button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>会员等级</th>
                            <th>会员价格</th>
                            <th>会员周期</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in membersList">
                            <td align="center">{{item.name}}</td>
                            <td align="center">{{item.price}}</td>
                            <td align="center">{{item.month}}月</td>
                            <td align="center">
                                <el-button type="text" @click="editMembers(true,index)">编辑</el-button>
                                <el-button type="text" @click="removeMembers(index)">删除</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <el-dialog title="编辑平台手续费" v-model="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="平台手续费：">
                    <el-col :span="8">
                        <el-input v-model.number="form.poundage"></el-input>
                    </el-col>%
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfigASPLATFORM">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="membersType>1?'编辑会员等级':'新增会员等级'" v-model="membersDialogFormVisible">
            <el-form ref="membersForm" :model="membersForm" label-width="130px">
                <el-form-item label="会员等级名称：">
                    <el-col :span="12">
                        <el-input v-model="membersForm.name" placeholder="请输入会员等级名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="会员卡价格：">
                    <el-col :span="12">
                        <el-input v-model.number="membersForm.price"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="会员周期：">
                    <el-col :span="12">
                        <el-input v-model.number="membersForm.month"></el-input>
                    </el-col>月
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="membersDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfigMembers">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let index = 0;
export default {
    components: {},
    data() {
        return {
            membersList: [],
            form: {
                poundage: 0
            },
            dialogFormVisible: false,
            membersForm: {
                name: '',
                price: '',
                month: ''
            },
            membersType: 1,
            membersDialogFormVisible: false
        }
    },
    created() {

    },
    mounted() {
        this.getSysConfigList();
    },
    methods: {
        getSysConfigList() {
            var param = {
                c: 'Admin',
                m: 'Sys',
                a: 'getSysConfigList'
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].config_key == "AS_PLATFORM") {
                            this.form.poundage = parseFloat(response[i].config_value) / 1000;
                        }
                        if (response[i].config_key == "VIP_LIST") {
                            this.membersList = JSON.parse(response[i].config_value);
                        }
                    }
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        updateSysConfig(p_obj, callback) {
            var param = {};
            if (p_obj) {
                for (var key in p_obj) {
                    param[key] = p_obj[key];
                }
            }
            var p_obj = {
                action: '&c=Admin&m=Sys&a=updateSysConfig',
                param: param,
                success: (response) => {
                    callback(response);
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        updateSysConfigASPLATFORM() {
            var param = {
                key: 'AS_PLATFORM',
                value: this.form.poundage * 1000
            };
            this.updateSysConfig(param, (res) => {
                this.dialogFormVisible = false;
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                this.getSysConfigList();
            });
        },
        removeMembers(p_index) {
            this.$confirm('删除后无法恢复，确认要删除该条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var param = {
                    key: 'VIP_LIST',
                    value: JSON.stringify(this.membersList.splice(p_index, 1))
                }
                this.updateSysConfig(param, (res) => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getSysConfigList();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        editMembers(bool, p_index) {
            if (bool) {
                index = p_index;
                this.membersForm = {
                    name: this.membersList[p_index].name,
                    price: this.membersList[p_index].price,
                    month: this.membersList[p_index].month
                };
                this.membersType = 2;
            }
            this.membersDialogFormVisible = true;
        },
        updateSysConfigMembers() {
            if (this.membersType > 1) {
                this.membersList[index].name = this.membersForm.name;
                this.membersList[index].price = this.membersForm.price;
                this.membersList[index].month = this.membersForm.month;
            } else {
                this.membersList.push({
                    "img": "",
                    "name": this.membersForm.name,
                    "level": 1,
                    "price": parseFloat(this.membersForm.price),
                    "month": this.membersForm.month
                });
            }
            var param = {
                key: 'VIP_LIST',
                value: JSON.stringify(this.membersList)
            }
            this.updateSysConfig(param, (res) => {
                this.membersDialogFormVisible = false;
                var mgs = '新增成功！';
                if (this.membersType > 1) {
                    mgs = '修改成功！'
                }
                this.$message({
                    type: 'success',
                    message: mgs
                });
                this.getSysConfigList();
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    padding: 15px;
    .header {
        margin-left: 50px;
        table {
            margin-top: 10px;
            border-spacing: 0;
            border-top: 1px solid grey;
            border-left: 1px solid grey;
            th,
            td {
                border-right: 1px solid grey;
                border-bottom: 1px solid grey;
                min-width: 100px;
                .el-button+.el-button {
                    margin-left: 0px;
                }
            }
        }
    }
}
</style>
