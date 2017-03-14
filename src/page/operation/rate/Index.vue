<template>
    <div>
        <div class="container-body">
            <h1>平台手续费配置</h1>
            <div class="header">平台手续费:10%
                <el-button type="text" @click="dialogFormVisible=true">编辑</el-button>
            </div>
            <h1>会员规则配置</h1>
            <div class="header">
                <div class="add-btn">
                    <el-button>新增等级</el-button>
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
                            <td align="center">{{item.id}}</td>
                            <td align="center">{{item.price}}</td>
                            <td align="center">{{item.account}}天</td>
                            <td align="center">
                                <el-button type="text">编辑</el-button>
                                <el-button type="text">删除</el-button>
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
                <el-button type="primary" @click="poundageChange">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            membersList: [{
                id: '1',
                price: '100',
                account: '7'
            }],
            form: {
                poundage: 10
            },
            dialogFormVisible: false
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        poundageChange() {
            console.log(this.form.poundage);
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
