<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-col :span="12">
                            <el-form-item label="订单编号" prop="orderNo">
                                <el-input v-model.string="form.orderNo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="交易类型">
                                <el-form-item prop="status">
                                    <el-select v-model="form.status" style="width:100%" placeholder="全部">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in tradeList"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="交易时间" prop="time">
                                <el-date-picker v-model="form.time" type="daterange" style="width:100%" placeholder="选择日期范围">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm()">提交</el-button>
                                <el-button @click="resetForm('from')">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </div>
            </div>
            <div class="table" style="margin-top: 10px">
                <el-table :data="priceList" border style="width: 100%">
                    <el-table-column prop="name" align="center" label="类型" min-width="90">
                    </el-table-column>
                    <el-table-column prop="mingxi" align="center" label="明细" min-width="130">
                    </el-table-column>
                </el-table>
            </div>
            <div class="table" style="margin-top: 10px">
                <el-table :data="moneyHistoryList" border style="width: 100%">
                    <el-table-column prop="order_type" align="center" label="抽成类型" min-width="90">
                    </el-table-column>
                    <el-table-column prop="price_info" align="center" label="订单编号" min-width="90">
                    </el-table-column>
                    <el-table-column prop="remark" align="center" label="交易类型" min-width="130">
                    </el-table-column>
                    <el-table-column prop="price" align="center" label="抽成金额" min-width="120">
                    </el-table-column>
                    <el-table-column prop="create_time" align="center" label="结算时间" min-width="120">
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
                status: '',
                time: ''
            },
            tradeList: [],
            moneyHistoryList: [],
            priceList: [],
            page: 1,
            total: 0
        }
    },
    mounted() {
        this.getMoneyHistoryList();
        this.getMaxPriceInfo();
        this.getTradeList();
    },
    methods: {
        getTradeList() {
            this.tradeList = [{
                name: "全部",
                code: 0
            }, {
                name: "收入",
                code: 1
            }, {
                name: "提现",
                code: 2
            }];
        },
        getMaxPriceInfo() {
            var param = {
                c: 'Admin',
                m: 'MoneyHistory',
                a: 'getMaxPriceInfo'
            };

            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.priceList = response;
                },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        getMoneyHistoryList(p_obj) {
            var param = {
                c: 'Admin',
                m: 'MoneyHistory',
                a: 'getMoneyHistoryList',
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
                    switch (response.list[i].order_type) {
                        case '0':
                             response.list[i].order_type='查看服务收费';break;
                        case '1':
                            response.list[i].order_type='购买服务分成';break;
                        case '2':
                            response.list[i].order_type='会员充值收费';break;
                        default:
                            response.list[i].order_type='购买服务分成';
                    }



            }
                    this.moneyHistoryList = response.list;
                    this.total = parseInt(response.total);
                },
                fail: (response) => {
                    NormalHelper.alert(this, response, 'error');
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        accessGetMoneyHistoryList() {
            var param = {};
            if (this.form.orderNo.length > 0) {
                param["orderNo"] = this.form.orderNo;
            }
            if (this.form.status > 0) {
                param["status"] = this.form.status;
            }
            if (this.form.time != "") {
                param.sTime = new Date(this.form.time[0]).Format("yyyy-MM-dd hh:mm:ss");
                param.eTime = new Date(this.form.time[1]).Format("yyyy-MM-dd hh:mm:ss").replace('00:00:00', '23:59:59');
            }
            this.getMoneyHistoryList(param);
        },
        submitForm(formName) {
            this.page = 1;
            this.accessGetMoneyHistoryList();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.accessGetMoneyHistoryList();
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
