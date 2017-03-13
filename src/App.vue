<template>
    <div>
        <main-header></main-header>
        <main-sidebar :side-list="menuList"></main-sidebar>
        <div class="container">
            <section>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>
<script>
import MainHeader from 'components/common/MainHeader'
import MainSidebar from 'components/common/MainSidebar'
export default {
    name: 'app',
    components: {
        MainHeader,
        MainSidebar
    },
    data() {
        return {
            menuList: [{
                title: '代理商管理',
                path: 'agent'
            }]
        }
    },
    created: function() {
        GlobalModel.RootVue = this;
    },
    mounted() {

    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less">
body {
    margin: 0;
    padding: 0;
}

.container {
    margin-left: 200px;
}
</style>
