<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-col :span="12">
                            <el-form-item label="结算时间" prop="time">
                                <el-date-picker v-model="form.time" type="daterange" style="width:100%;" placeholder="选择日期范围">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="userInfo.manager_type>0">
                            <el-form-item label="所属代理商">
                                <el-form-item prop="admin_code">
                                    <el-select class="select" v-model="form.admin_code" placeholder="全部">
                                        <el-option :label="item.nick_name" :value="item.admin_code" v-for="(item,index) in RegionManagerList"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form-item>
                        </el-col>
                                <!--<el-col :span="4">
                                <el-form-item prop="region1">
                                    <el-select class="select" v-model="form.region1" @change="selectRegion1List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region1List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item prop="region2">
                                    <el-select class="select" v-model="form.region2" @change="selectRegion2List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region2List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item prop="region3">
                                    <el-select class="select" v-model="form.region3" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region3List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="交易类型">
                                <el-form-item prop="status">
                                    <el-select class="select" v-model="form.status" placeholder="全部">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in tradeList"></el-option>
                                    </el-select>
                                </el-form-item>
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
                <div style="float:left;">
                    <div class="line" style="margin-top: 10px; margin-bottom: 20px; font-size: 20px;">
                        <b style="padding-left: 120px">当前账号余额: {{report.balance}}元</b>
                        <b style="padding-left: 120px">累计抽成金额: {{report.cumulative}}元</b>
                        <b style="padding-left: 120px">已销账金额: {{report.withdrawal}}元</b>
                    </div>
                </div>
            </div>
            <div class="table">
                <el-table :data="List" border style="width: 100%">
                    <el-table-column prop="nick_name" align="center" label="代理商" min-width="90">
                    </el-table-column>
                    <el-table-column prop="region_name" align="center" label="所属区域" min-width="90">
                    </el-table-column>
                    <el-table-column prop="price_type" align="center" label="交易类型" min-width="80">
                    </el-table-column>
                    <el-table-column prop="remark" align="center" label="说明" min-width="400">
                    </el-table-column>
                    <el-table-column prop="price" align="center" label="金额" min-width="80">
                    </el-table-column>
                    <el-table-column prop="create_time" align="center" label="入账时间" min-width="100">
                    </el-table-column>
                </el-table>
                <el-pagination class="el-pagination" @current-change="handleCurrentChange" :current-page="page" :page-size="10" layout="total, prev, pager, next" :total="total">
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
                time: '',
                status: 0,
                admin_code:'',
                region1: '',
                region2: '',
                region3: ''
            },
            region1List: [],
            region2List: [],
            region3List: [],
            List: [],
            total: 0,
            page: 1,
            report: {},
            RegionManagerList: {},
            userInfo:NormalHelper.userInfo()


        }
    },
    mounted() {
        this.getDividedList();
        this.getTradeList();
        this.getAllRegionManagerList();
    },
    methods: {
        getTradeList() {
            this.tradeList = [{
                name: "全部",
                code: 0
            }, {
                name: "分成",
                code: 1
            }, {
                name: "结算",
                code: 2
            }];
        },
        getAllRegionManagerList() {
            var param = {
                c: 'Admin',
                m: 'User',
                a: 'getAllRegionManagerList'
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.RegionManagerList = response;
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
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
                    this.form.region1 = response[0].code;
                    this.form.region2 = response[0].children[0].code;
                    this.form.region3 = response[0].children[0].children[0].code;
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
        getDividedList(p_obj) {
            var param = {
                c: 'Admin',
                m: 'MoneyHistory',
                a: 'getDividedList',
                page: this.page,
                row: 10
            };
            if (p_obj) {
                for (var key in p_obj) {
                    param[key] = p_obj[key];
                }
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    for (var i = 0; i < response.list.length; i++) {
                        response.list[i].price_type = response.list[i].price_type == 1 ? "分成" : "平台结算";
                    }
                    this.report = response.report;
                    this.List = response.list;
                    this.total = parseInt(response.total);
                }
            }
            AjaxHelper.GetRequest(p_obj);
        },
        accessGetDividedList() {
            var param = {};
            if (this.form.status > 0) {
                param.status = this.form.status;
            }
            if (this.form.time != "") {
                param.startTime = new Date(this.form.time[0]).Format("yyyy-MM-dd hh:mm:ss");
                param.endTime = new Date(this.form.time[1]).Format("yyyy-MM-dd hh:mm:ss").replace('00:00:00', '23:59:59');
            }
            if (this.form.admin_code != "") {
                param.admin_code = this.form.admin_code;
            }
            this.getDividedList(param);
        },
        submitForm(formName) {
            this.page = 1;
            this.accessGetDividedList();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.accessGetDividedList();
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
