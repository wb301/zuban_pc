<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div>
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="代理商账号:" prop="account">
                            <el-input type="account" v-model="ruleForm2.account" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商密码:" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商姓名:" prop="name">
                            <el-input v-model.number="ruleForm2.name"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商地区:">
                            <el-col :span="8">
                                <el-form-item prop="region1">
                                    <el-select class="select" v-model="ruleForm2.region1" @change="selectRegion1List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region1List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="region2">
                                    <el-select class="select" v-model="ruleForm2.region2" @change="selectRegion2List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region2List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="region3">
                                    <el-select class="select" v-model="ruleForm2.region3" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region3List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="代理商状态:" prop="status">
                            <el-radio-group v-model="ruleForm2.status">
                                <el-radio label="1">开启</el-radio>
                                <el-radio label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                this.isCheck = false;
                return callback(new Error('姓名不能为空'));
            } else {
                this.isCheck = true;
                callback();
            }
        };
        var validateAccount = (rule, value, callback) => {
            if (value === '') {
                this.isCheck = false;
                callback(new Error('请输入账号'));
            } else {
                this.isCheck = true;
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                this.isCheck = false;
                callback(new Error('请输入密码'));
            } else {
                this.isCheck = true;
                callback();
            }
        };
        return {
            isCheck: false,
            ruleForm2: {
                id: 0,
                account: '',
                pass: '',
                name: '',
                status: "1",
                region1: '',
                region2: '',
                region3: '',
                region_name: ''
            },
            region1List: [],
            region2List: [],
            region3List: [],
            rules2: {
                account: [{
                    validator: validateAccount,
                    trigger: 'blur'
                }],
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                name: [{
                    validator: checkName,
                    trigger: 'blur'
                }]
            }
        };
    },
    mounted() {
        this.getRegionList();
    },
    methods: {
        getRegionList() {
            var param = {
                c: 'Admin',
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
                    this.ruleForm2.region1 = response[0].code;
                    this.ruleForm2.region2 = response[0].children[0].code;
                    this.ruleForm2.region3 = response[0].children[0].children[0].code;
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectRegion1List() {
            for (var i = 0; i < this.region1List.length; i++) {
                if (this.ruleForm2.region1 == this.region1List[i].code) {
                    this.region2List = this.region1List[i].children;
                    this.region3List = this.region1List[i].children[0].children;
                    this.ruleForm2.region2 = this.region1List[i].children[0].code;
                    this.ruleForm2.region3 = this.region1List[i].children[0].children[0].code;
                    this.ruleForm2.region_name = this.region1List[i].name;
                    break;
                }
            }
        },
        selectRegion2List() {
            for (var i = 0; i < this.region2List.length; i++) {
                if (this.ruleForm2.region2 == this.region2List[i].code) {
                    this.region3List = this.region2List[i].children;
                    this.ruleForm2.region3 = this.region2List[i].children[0].code;

                    if(this.ruleForm2.region2 != this.ruleForm2.region1){
                        this.ruleForm2.region_name += "-" + this.region2List[i].name;
                    }
                    break;
                }
            }
        },
        submitForm(formName) {

            var errorStr = null;
            if (this.isCheck == false) {
                errorStr = "请先填写正确！";
            }

            if (this.ruleForm2.account === '') {
                errorStr = "请先填写代理商账号！";
            }

            if (this.ruleForm2.pass == '') {
                errorStr = "请先填写代理商密码！";
            }

            if (this.ruleForm2.name == '') {
                errorStr = "请先填写代理商姓名！";
            }

            if (this.ruleForm2.region2 == this.ruleForm2.region3) {
                errorStr = "请先选择代理商地区！";
            }

            if (this.ruleForm2.status == -1) {
                errorStr = "请先选择代理商状态！";
            }

            if (errorStr) {
                NormalHelper.alert(this, errorStr, 'error');
                return false;
            }

            for (var i = 0; i < this.region3List.length; i++) {
                if (this.ruleForm2.region3 == this.region3List[i].code) {
                    this.ruleForm2.region_name += "-" + this.region3List[i].name;
                    break;
                }
            }

            var param = {
                c: 'Admin',
                m: 'User',
                a: 'updRegionManager',
                id: this.ruleForm2.id,
                account: this.ruleForm2.account,
                password: this.ruleForm2.pass,
                nick_name: this.ruleForm2.name,
                region_code: this.ruleForm2.region3,
                region_name: this.ruleForm2.region_name,
                status: this.ruleForm2.status
            };

            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.$router.push({
                        path: '/agent'
                    });
                },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
            AjaxHelper.GetRequest(p_obj);
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
