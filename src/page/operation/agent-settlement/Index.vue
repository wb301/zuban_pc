<template>
    <div>
        <div class="container-body">
            <el-row>
                <el-col :span="8">
                    代理商分成总金额：10000.00元
                </el-col>
                <el-col :span="8">
                    已结算金额：8000.00元
                </el-col>
                <el-col :span="8">
                    待结算金额：12000.00元
                </el-col>
            </el-row>
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="130px">
                        <el-form-item label="代理商">
                            <el-col :span="8">
                                <el-form-item>
                                    <el-select class="select" v-model="form.region1" @change="selectRegion1List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region1List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-select class="select" v-model="form.region2" @change="selectRegion2List" placeholder="全国">
                                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in region2List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
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
                <el-table :data="orderList" border style="width: 100%">
                    <el-table-column prop="order_no" align="left" label="订单编号" min-width="100">
                    </el-table-column>
                    <el-table-column prop="memo" align="left" label="留言信息" min-width="100">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" min-width="220">
                        <template scope="scope">
                            <el-button @click="settlementMoney(scope.row)" size="small">
                                结算金额
                            </el-button>
                            <el-button @click="settlementRecord(scope.row)" size="small">
                                查看结算记录
                            </el-button>
                        </template>
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
                region1: '',
                region2: '',
                region3: ''
            },
            region1List: [],
            region2List: [],
            region3List: [],
            orderList: [],
            total: 0,
            page: 1
        };
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
        },
        settlementMoney(item) {

        },
        settlementRecord(item) {

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
        margin-top: 10px;
        .el-pagination {
            float: right;
            margin: 5px 20px 0 0;
        }
    }
}
</style>
