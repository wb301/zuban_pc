<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="130px">
                        <el-form-item label="服务地区">
                            <el-col :span="8">
                                <el-select class="select" v-model="form.region1" @change="selectRegion1List" placeholder="全国">
                                    <el-option :label="item.name" :value="item.code" v-for="(item,index) in region1List"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select class="select" v-model="form.region2" @change="selectRegion2List" placeholder="全国">
                                    <el-option :label="item.name" :value="item.code" v-for="(item,index) in region2List"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select class="select" v-model="form.region3" placeholder="全国">
                                    <el-option :label="item.name" :value="item.code" v-for="(item,index) in region3List"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-col :span="12">
                            <el-form-item label="订单编号：" prop="phone">
                                <el-input v-model.number="form.orderNo" placeholder="请输入订单编号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买用户手机号：" prop="phone">
                                <el-input v-model.number="form.phone" placeholder="请输入购买用户手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="下单时间：" prop="time">
                                <el-date-picker v-model="form.time" style="width:100%;" type="daterange" placeholder="选择日期范围">
                                </el-date-picker>
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
            <div style="float:left;padding-bottom: 10px;">
                <el-radio-group v-model="orderStatus">
                    <el-radio-button label="ALL">全部</el-radio-button>
                    <el-radio-button label="WaitingPay">待付款</el-radio-button>
                    <el-radio-button label="WaitingConfirm">待确认</el-radio-button>
                    <el-radio-button label="Ongoing">进行中</el-radio-button>
                    <el-radio-button label="End">已完成</el-radio-button>
                </el-radio-group>
            </div>
            <div class="table">
                <el-table :data="orderList" border style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="服务地区:">
                                            <span>{{ props.row.productList[0].product.region_name }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="订单类型:">
                                            <span>{{ props.row.order_type==1?"预约服务":"购买联系方式" }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="发布单价:">
                                            <span>{{ props.row.productList[0].price }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="数量:">
                                            <span> {{ props.row.productList[0].num }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="订单金额:">
                                            <span>{{ props.row.total_price}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="订单状态:">
                                            <span> {{ props.row.status_name }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="23" :offset="1">
                                        <el-form-item label="下单时间:">
                                            <span>{{ props.row.create_time}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="卖家昵称:">
                                            <span>{{ props.row.seller.nick_name}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="卖家手机号:">
                                            <span> {{ props.row.seller.account }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="买家昵称:">
                                            <span>{{ props.row.buyers.nick_name}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="买家手机号:">
                                            <span> {{ props.row.buyers.account }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_no" align="left" label="订单编号" min-width="100">
                    </el-table-column>
                    <el-table-column prop="memo" align="left" label="留言信息" min-width="100">
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
                phone: '',
                orderNo: '',
                region1: '',
                region2: '',
                region3: ''
            },
            orderStatus: 'ALL',
            region1List: [],
            region2List: [],
            region3List: [],
            orderList: [],
            total: 0,
            page: 1

        }
    },
    watch: {
        orderStatus: function() {
            this.orderCommonFilter({
                status: this.orderStatus
            });
        }
    },
    mounted() {
        this.getRegionList();
        this.orderCommonFilter();
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
        orderCommonFilter(p_obj) {
            var param = {
                c: 'Admin',
                m: 'Order',
                a: 'orderCommonFilter',
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
                    this.orderList = response.list;
                    this.total = parseInt(response.total);
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        accessOrderCommonFilter() {
            var param = {};
            if (this.form.region3 != "" && this.form.region3 != '1') {
                param.sourse = this.form.region3;
            }
            if (this.form.time != "") {
                param.startTime = new Date(this.form.time[0]).Format("yyyy-MM-dd hh:mm:ss");
                param.endTime = new Date(this.form.time[1]).Format("yyyy-MM-dd hh:mm:ss").replace('00:00:00', '23:59:59');
            }
            if (this.form.orderNo != "") {
                param.orderNo = this.form.orderNo;
            }
            if (this.form.phone != "") {
                param.phone = this.form.phone;
            }
            this.orderCommonFilter(param);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.page = 1;
                    this.accessOrderCommonFilter();
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
            this.accessOrderCommonFilter();
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
