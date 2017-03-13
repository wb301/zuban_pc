<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="add-btn">
                    <el-button>新增代理商</el-button>
                </div>
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-form-item label="代理商手机号码" prop="phone">
                            <el-input v-model.number="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商类型">
                            <el-col :span="8">
                                <el-form-item prop="region1">
                                    <el-select class="select" v-model="form.region1" @change="selectRegion1List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region1List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="region2">
                                    <el-select class="select" v-model="form.region2" @change="selectRegion2List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region2List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="region3">
                                    <el-select class="select" v-model="form.region3" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region3List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')">提交</el-button>
                            <el-button @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="table">
                <el-table :data="agentList" border style="width: 100%">
                    <el-table-column prop="date" align="center" label="代理商编号" width="110">
                    </el-table-column>
                    <el-table-column prop="name" align="center" label="代理商名称">
                    </el-table-column>
                    <el-table-column prop="province" align="center" label="代理商手机号">
                    </el-table-column>
                    <el-table-column prop="city" align="center" label="代理商类型">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="所属地区">
                    </el-table-column>
                    <el-table-column prop="zip" align="center" label="添加时间">
                    </el-table-column>
                    <el-table-column prop="zip" align="center" label="帐号状态">
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template scope="scope">
                            <el-button @click="edit(scope.$index, agentList)" size="small">
                                编辑
                            </el-button>
                            <el-button @click="changeState(scope.$index, agentList)" size="small">
                                关闭
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="el-pagination" @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="50">
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
                region1: '',
                region2: '',
                region3: ''
            },
            region1List: [],
            region2List: [],
            region3List: [],
            agentList: [{
                date: '1',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙',
                zip: 200333
            }],

        }
    },
    mounted() {
        this.getRegionList();
        this.getRegionManagerList();
    },
    methods: {
        getRegionList() {
            var param = {
                c: 'Zb',
                m: 'Region',
                a: 'getRegionList',
                fixAll: 1
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.region1List = response;
                    this.region2List = response[0].children;
                    this.region3List = response[0].children[0].children;
                    this.form.region1 = response[0].code;
                    this.form.region2 = response[0].children[0].code;
                    this.form.region3 = response[0].children[0].children[0].code;
                },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectRegion1List() {
            for (var i = 0; i < this.region1List.length; i++) {
                if (this.form.region1 == this.region1List[i].code) {
                    this.region2List = this.region1List[i].children;
                    this.region3List = this.region1List[i].children[0].children;
                    this.form.region2 = this.region1List[i].children[0].code;
                    this.form.region3 = this.region1List[i].children[0].children[0].code;
                }
            }
        },
        selectRegion2List() {
            for (var i = 0; i < this.region2List.length; i++) {
                if (this.form.region2 == this.region2List[i].code) {
                    this.region3List = this.region2List[i].children;
                    this.form.region3 = this.region2List[i].children[0].code;
                }
            }
        },
        getRegionManagerList() {
            var param = {
                c: 'Admin',
                m: 'User',
                a: 'getRegionManagerList'
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    console.log(response);
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
            rows.splice(index, 1);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.region2List = this.region1List[0].children;
            this.region3List = this.region1List[0].children[0].children;
            this.$refs[formName].resetFields();
            this.form.region1 = this.region1List[0].code;
            this.form.region2 = this.region2List[0].code;
            this.form.region3 = this.region3List[0].code;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
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
