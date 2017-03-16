<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="search">
                    <el-form :model="form" ref="form" label-width="120px">
                        <el-form-item label="服务类型">
                            <el-col :span="8">
                                <el-form-item prop="cate1">
                                    <el-select class="select" v-model="form.cate1" @change="selectCate1List" placeholder="全部">
                                        <el-option :label="item.category_name" :value="item.id" v-for="(item,index) in cate1List"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="cate2">
                                    <el-select class="select" v-model="form.cate2" placeholder="全部">
                                        <el-option :label="item.category_name" :value="item.id" v-for="(item,index) in cate2List"></el-option>
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
                    <el-table-column prop="id" align="center" label="编号" min-width="90">
                    </el-table-column>
                    <!-- <el-table-column prop="image_list" align="center" label="服务图片" min-width="120">
                        <img :src="image_list" class="avatar">
                    </el-table-column> -->
                    <el-table-column fixed="left" align="center" label="服务图片" min-width="150">
                        <template scope="scope">
                            <img :src="item" style="width: 50px; height: 50px" class="avatar" v-for="(item,index) in scope.row.image_list" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="priceInfo" align="center" label="服务类型/价格" min-width="100">
                    </el-table-column>
                    <el-table-column prop="region_name" align="center" label="服务地区" min-width="120">
                    </el-table-column>
                    <el-table-column prop="product_info" align="center" label="补充意见" min-width="170">
                    </el-table-column>
                    <el-table-column prop="userInfo.nick_name" align="center" label="发布人" min-width="175">
                    </el-table-column>
                    <el-table-column prop="update_time" align="center" label="发布时间" min-width="100">
                    </el-table-column>
                    <el-table-column prop="status_name" align="center" label="状态" min-width="100">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="140">
                        <template scope="scope">
                            <el-button @click="changeState(scope.$index, agentList)" size="small">
                                {{scope.row.status==1?"关闭":"开启"}}
                            </el-button>
                        </template>
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
                cate1: '',
                cate2: ''
            },
            cate1List: [],
            cate2List: [],
            agentList: [],
            total: 0,
            page: 1

        }
    },
    mounted() {
        this.getCateList();
        this.getShowProductList();
    },
    methods: {
        getCateList() {
            var param = {
                c: 'Admin',
                m: 'Category',
                a: 'getCategoryList',
                fixAll: 1
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.cate1List = response;
                    this.cate2List = response[0].children;
                    this.form.cate1 = response[0].id;
                    this.form.cate2 = response[0].children[0].id;
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectCate1List() {
            for (var i = 0; i < this.cate1List.length; i++) {
                if (this.form.cate1 == this.cate1List[i].id) {
                    this.cate2List = this.cate1List[i].children;
                    this.form.cate2 = this.cate1List[i].children[0].id;
                }
            }
        },
        getShowProductList() {
            var param = {
                c: 'Admin',
                m: 'Product',
                a: 'getShowProductList',
                page: this.page,
                row: 10
            };
            if (this.form.cate2 != 0 && this.form.cate2 != 1) {
                param.categoryId = this.form.cate2;
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    for (var i = 0; i < response.list.length; i++) {
                        response.list[i].status_name = response.list[i].status == 1 ? "开启" : "关闭";
                        var type = response.list[i].price_type;
                        var info = "小时";
                        if (type == 2) {
                            info = "天";
                        } else if (type == 3) {
                            info = "次";
                        }
                        response.list[i].priceInfo = response.list[i].price + "元/" + info;
                    }
                    this.agentList = response.list;
                    this.total = parseInt(response.total);
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        changeState(index, rows) {
            var status = 0;
            if (rows[index].status == 0) {
                status = 1;
            }
            var param = {
                productInfo: {
                    id: rows[index].id,
                    status: status
                }
            };
            var p_obj = {
                action: '&c=Admin&m=Product&a=updateProductBySys',
                param: param,
                success: (response) => {
                    rows[index].status = status;
                    rows[index].status_name = rows[index].status == 1 ? "开启" : "关闭";
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.cate2 != "") {
                        this.page = 1;
                        this.getShowProductList();
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.cate2List = this.cate1List[0].children;
            this.$refs[formName].resetFields();
            this.form.cate1 = this.cate1List[0].id;
            this.form.cate2 = this.cate2List[0].id;
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getShowProductList();
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
