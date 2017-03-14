<template>
    <div>
        <div class="container-body">
            <el-tree :data="categoryList" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
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
                    console.log(response);
                    this.categoryList = response;
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        append(store, data) {
            store.append({
                id: id++,
                label: 'testtest',
                children: []
            }, data);
        },

        remove(store, data) {
            store.remove(data);
        },

        renderContent(h, {
            node,
            data,
            store
        }) {
            return h('span', [h('span', data.category_name), h('el-button', {
                // 和`v-bind:class`一样的 API
                'class': {},
                domProps: {
                    innerHTML: 'baz'
                },
                // 正常的 HTML 特性
                attrs: {
                    // id: 'foo'
                    type: "text"
                },
                // 事件监听器基于 "on"
                // 所以不再支持如 v-on:keyup.enter 修饰器
                // 需要手动匹配 keyCode。
                nativeOn: {
                    click: this.append
                }
            }), h('el-button', {
                // 和`v-bind:class`一样的 API
                'class': {},
                domProps: {
                    innerHTML: 'baz'
                },
                // 正常的 HTML 特性
                attrs: {
                    // id: 'foo'
                    type: "text"
                },
                // 事件监听器基于 "on"
                // 所以不再支持如 v-on:keyup.enter 修饰器
                // 需要手动匹配 keyCode。
                nativeOn: {
                    click: this.append
                }
            })])
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
