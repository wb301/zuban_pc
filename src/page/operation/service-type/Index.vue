<template>
    <div>
        <div class="container-body">
            <div class="header">
                <div class="add-btn">
                    <el-button>新增一级类型</el-button>
                </div>
            </div>
            <el-tree :data="categoryList" :props="defaultProps" node-key="id" accordion :expand-on-click-node="false" :render-content="renderContent">
            </el-tree>
        </div>
    </div>
</template>
<script>
let id = 1000;
export default {
    components: {},
    data() {
        return {
            categoryList: [],
            defaultProps: {
                children: 'children',
                label: 'category_name'
            }
        }
    },
    mounted() {
        this.getCategoryList();
    },
    methods: {
        getCategoryList() {
            var param = {
                c: 'Admin',
                m: 'Category',
                a: 'getCategoryList'
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.categoryList = response;
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        append(store, data) {
            console.log(data);
            // store.append({
            //     id: id++,
            //     label: 'testtest',
            //     children: []
            // }, data);
        },

        remove(store, data) {
            this.$confirm('删除后无法恢复，确认要删除该条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                store.remove(data);
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
                        click: () => this.append(store, data)
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
                // , h('el-button', {
                //     'class': {},
                //     props: {
                //         disabled: true
                //     },
                //     domProps: {
                //         innerHTML: '上移'
                //     },
                //     attrs: {
                //         type: "text"
                //     },
                //     on: {
                //         click: () => this.append(store, data)
                //     }
                // }), h('el-button', {
                //     'class': {},
                //     props: {
                //         disabled: true
                //     },
                //     domProps: {
                //         innerHTML: '下移'
                //     },
                //     attrs: {
                //         type: "text"
                //     },
                //     on: {
                //         click: () => this.append(store, data)
                //     }
                // })
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
            return html;
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
