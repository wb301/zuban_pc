<template>
    <aside class="main-sidebar">
        <el-menu default-active="1" router class="el-menu-vertical-demo" theme="dark">
            <template v-for="(item,index) in sideList">
                <el-submenu index="1" v-if="item.children">
                    <template slot="title">{{item.title}}</template>
                    <el-menu-item :index="item2.path" :route="{path: '/'+item2.path}" v-for="(item2,index) in item.children">{{item2.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.path" :route="{path: '/'+item.path}" v-else>{{item.title}}</el-menu-item>
            </template>
        </el-menu>
    </aside>
</template>
<script>
export default {
    name: 'main-sidebar',
    props: {
        sideList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {

        }
    },
    mounted() {},
    methods: {

    }
}
</script>
<style lang="less">
.main-sidebar {
    width: 200px;
    position: absolute;
    left: 0;
    .el-menu-vertical-demo {
        display: inline-block;
        text-align: left;
        width: 200px;
        min-height: 100%;
        border-radius: 0px;
    }
}
</style>
