<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-form-item label="订单编号" prop="orderNo">
                            <el-input v-model.number="form.orderNo"></el-input>
                        </el-form-item>
                        <el-form-item label="交易时间">
                            <!-- <el-col :span="8">
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
                            </el-col> -->
                        </el-form-item>
                        <el-form-item label="交易类型">
                            <el-col :span="8">
                                <el-form-item prop="tradeName">
                                    <el-select class="select" v-model="form.tradeName" placeholder="全部">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in tradeList"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="分成地区" v-if="managerType > 0">
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
                <el-table :data="userStatisticsList" border style="width: 100%">
                    <el-table-column prop="day_name" align="center" label="统计类型" min-width="90">
                    </el-table-column>
                    <el-table-column prop="all_num" align="center" label="总注册用户数" min-width="120">
                    </el-table-column>
                    <el-table-column prop="register_num" align="center" label="当日注册用户数" min-width="130">
                    </el-table-column>
                    <el-table-column prop="login_num" align="center" label="当日活跃用户数" min-width="120">
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
                orderNo: '',
                region1: '',
                region2: '',
                region3: '',
                tradeName: ''
            },
            region1List: [],
            region2List: [],
            region3List: [],
            tradeList: [],
            userStatisticsList: [],
            page: 1,
            total: 0,
            userInfo: NormalHelper.userInfo(),
            managerType: 0
        }
    },
    mounted() {

        this.managerType = this.userInfo["manager_type"];
        if (this.managerType <= 0) {
            this.form.region3 = this.userInfo["region_code"];
        } else {
            this.getRegionList();
        }
        this.getUserStatistics();
        this.getTradeList();
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
        getTradeList() {
            this.tradeList = [{
                name: "提现中",
                code: 1
            }];
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
        getUserStatistics() {
            var param = {
                c: 'Admin',
                m: 'Report',
                a: 'userStatistics'
            };

            if (this.form.region3 != "" && this.form.region3 != '1') {
                param.region = this.form.region3;
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {

                    this.userStatisticsList = [];
                    for (var item in response) {
                        this.userStatisticsList.push(response[item]);
                    }
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
                        this.getUserStatistics();
                    }
                } else {
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
