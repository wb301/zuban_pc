<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="add-btn">
                </div>
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model.number="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="订单编号" prop="order_no">
                            <el-input v-model.number="form.order_no"></el-input>
                        </el-form-item>
                        <el-form-item label="服务地区">
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
                <el-table :data="List" border style="width: 100%">
                    <el-table-column prop="order_no" align="center" label="订单编号" min-width="120">
                    </el-table-column>
                    <el-table-column prop="price" align="center" label="交易金额" min-width="100">
                    </el-table-column>
                    <el-table-column prop="category_name" align="center" label="服务类型" min-width="100">
                    </el-table-column>
                    <el-table-column prop="status" align="center" label="状态" min-width="80">
                    </el-table-column>
                    <el-table-column prop="receiver" align="center" label="用户姓名" min-width="80">
                    </el-table-column>
                    <el-table-column prop="phone" align="center" label="手机号" min-width="100">
                    </el-table-column>
                    <el-table-column prop="update_time" align="center" label="申请时间" min-width="100">
                    </el-table-column>
                <el-pagination class="el-pagination" @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
                </el-pagination>
                    </el-table>
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
            List: [],
            total: 0,
            page: 1,
            report:{}

        }
    },
    mounted() {
        this.getRegionList();
        this.getDividedList();
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
        getDividedList() {
            var param = {
                c: 'Admin',
                m: 'Order',
                a: 'orderReturnFilter',
                startTime: '',
                endTime: '',
                status:'',
                phone:'',
                orderNo:'',
                sourse:'',
                page: this.page,
                row: 10
            };
            if (this.form.region3 != "" && this.form.region3 != '1') {
                param.sourse = this.form.region3;
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    for (var i = 0; i < response.list.length; i++) {
                        response.list[i].status = response.list[i].status == 11 ? "申请退款" : "退款已完成";
                         }
                    this.List = response.list;
                    this.total = parseInt(response.total);
            }}
            AjaxHelper.GetRequest(p_obj);
        },
        edit(index, rows) {

        },
        changeState(index, rows) {
            var param = {
                c: 'Admin',
                m: 'Order',
                a: '',
                id: rows[index].id,
                status: rows[index].status > 0 ? 0 : 1
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    row[index].status = row[index].status == 1 ? 0 : 1;
                    row[index].status_name = row[index].status == 1 ? "开启" : "关闭";
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.region3 != "") {
                        this.page = 1;
                        this.getDividedList();
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
