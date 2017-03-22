<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="add-btn">
                    <el-button @click="addFirst">新增一级类型</el-button>
                </div>
            </div>
            <el-tree :data="categoryList" :props="defaultProps" node-key="id" accordion :expand-on-click-node="false" :render-content="renderContent">
            </el-tree>
        </div>
        <el-dialog :title="dialogType>1?'编辑服务类型':'新增服务类型'" v-model="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="类型名称：">
                    <el-input v-model="form.category_name"></el-input>
                </el-form-item>
                <el-form-item label="出租人联系方式：">
                    <el-radio-group v-model="form.is_free">
                        <el-radio label="0">收费查看</el-radio>
                        <el-radio label="1">免费查看</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="dialogType>1" @click="editCategory">确 定</el-button>
                <el-button type="primary" v-else @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let p_store, p_data;
export default {
    components: {},
    data() {
        return {
            categoryList: [],
            defaultProps: {
                children: 'children',
                label: 'category_name'
            },
            dialogFormVisible: false,
            dialogType: 0,
            form: {
                category_name: '',
                is_free: "0"
            }
        }
    },
    mounted() {
        this.getCategoryList();
    },
    methods: {
        getCategoryList(p_id = 1) {
            var param = {
                c: 'Admin',
                m: 'Category',
                a: 'getCategoryList',
                id: p_id
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if (p_id == 1) {
                        for (var i = 0; i < response.length; i++) {
                            if (!response[i].children) {
                                response[i].children = [];
                            }
                        }
                        this.categoryList = response;
                    } else {
                        for (var i = 0; i < this.categoryList.length; i++) {
                            if (this.categoryList[i].id == p_id) {
                                this.categoryList[i].children = response;
                            }
                        }
                    }
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        updateCategoryInfo(p_id, p_obj, callback) {
            var param = {
                categoryInfo: {
                    id: p_id
                }
            };
            if (p_obj) {
                for (var key in p_obj) {
                    param.categoryInfo[key] = p_obj[key];
                }
            }
            var p_obj = {
                action: '&c=Admin&m=Category&a=updateCategoryInfo',
                param: param,
                success: (response) => {
                    callback(response);
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        editCategory() {
            this.updateCategoryInfo(p_data.id, {
                category_name: this.form.category_name,
                is_free: this.form.is_free
            }, (res) => {
                this.dialogFormVisible = false;
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                if (parseInt(p_data.level) > 2)
                    this.getCategoryList(p_data.parent_id);
                else
                    this.getCategoryList();
            })
        },
        createCategoryInfo(p_obj, callback) {
            var param = {
                categoryInfo: {}
            };
            if (p_obj) {
                for (var key in p_obj) {
                    param.categoryInfo[key] = p_obj[key];
                }
            }
            var p_obj = {
                action: '&c=Admin&m=Category&a=createCategoryInfo',
                param: param,
                success: (response) => {
                    callback(response);
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        addCategory(bool) {
            if (bool) {
                let param = {
                    parent_id: 1,
                    category_name: this.form.category_name,
                    is_free: this.form.is_free,
                    sort: this.categoryList.length + 1
                }
                if (this.dialogType > 0) {
                    param = {
                        parent_id: p_data.id,
                        category_name: this.form.category_name,
                        is_free: this.form.is_free,
                        sort: p_data.children ? p_data.children.length + 1 : 1
                    }
                }
                this.createCategoryInfo(param, (res) => {
                    this.dialogFormVisible = false;
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    if (this.dialogType > 0) {
                        this.getCategoryList(p_data.id);
                    } else {
                        this.getCategoryList();
                    }
                })
            } else {
                this.form = {
                    category_name: '',
                    is_free: "0"
                };
                this.dialogFormVisible = true;
            }
        },
        addFirst() {
            this.dialogType = 0;
            this.addCategory(false);
        },
        append(store, data) {
            p_store = store;
            p_data = data;
            this.dialogType = 1;
            this.addCategory(false);
        },
        edit(store, data) {
            p_store = store;
            p_data = data;
            this.dialogType = 2;
            this.form = {
                category_name: data.category_name,
                is_free: data.is_free,
            };
            this.dialogFormVisible = true;
        },
        remove(store, data) {
            this.$confirm('删除后无法恢复，确认要删除该条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.updateCategoryInfo(data.id, {
                    status: -1
                }, (res) => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    store.remove(data);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        renderContent(h, {
            node,
            data,
            store
        }) {
            var html = h('span', [h('span', data.category_name), h('el-button', {
                'class': {},
                style: {
                    'margin-left': '10px'
                },
                domProps: {
                    innerHTML: '编辑'
                },
                attrs: {
                    type: "text"
                },
                on: {
                    click: () => this.edit(store, data)
                }
            }), h('el-button', {
                'class': {},
                domProps: {
                    innerHTML: '删除'
                },
                attrs: {
                    type: "text"
                },
                on: {
                    click: () => this.remove(store, data)
                }
            })])

            if (node.level == 1) {
                html.children.splice(2, 0, h('el-button', {
                    'class': {},
                    props: {},
                    domProps: {
                        innerHTML: '添加下级'
                    },
                    attrs: {
                        type: "text"
                    },
                    on: {
                        click: () => this.append(store, data)
                    }
                }));
            }
            var props = {
                disabled: false
            }
            if (data.sort == "1") {
                props.disabled = true;
            }
            html.children.push(h('el-button', {
                'class': {},
                props: props,
                domProps: {
                    innerHTML: '上移'
                },
                attrs: {
                    type: "text"
                },
                on: {
                    click: () => this.moveCate(store, data, "up")
                }
            }), h('el-button', {
                'class': {},
                props: {
                    disabled: false
                },
                domProps: {
                    innerHTML: '下移'
                },
                attrs: {
                    type: "text"
                },
                on: {
                    click: () => this.moveCate(store, data, "down")
                }
            }));
            return html;
        },
        moveCate(store, data, type = "up") {
            var param = {}
            if (type == "up") {
                param.sort = parseInt(data.sort) - 1
            } else {
                param.sort = parseInt(data.sort) + 1
            }
            this.updateCategoryInfo(data.id, param, (res) => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                this.getCategoryList();
            })
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    padding: 15px;
    .header {
        margin-bottom: 5px;
    }
}
</style>
