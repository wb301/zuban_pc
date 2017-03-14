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

        var menuList = [{
            title: '用户统计',
            path: 'order'
        }, {
            title: '订单统计',
            path: 'order'
        }, {
            title: '收支明细',
            path: 'order'
        }];
        var managerType = NormalHelper.userInfo()["manager_type"];
        if (managerType > 0) {
            var masterList = [{
                title: '提现申请',
                path: 'agent'
            }, {
                title: '代理商管理',
                path: 'agent'
            }, {
                title: '服务类型配置',
                path: 'service-type'
            }, {
                title: '费率配置',
                path: 'agent'
            }, {
                title: '内容审核',
                path: 'agent'
            }];
            //只有平台能看到
            menuList = menuList.concat(masterList);
        }

        return {
            menuList: menuList
        }
    },
    created: function() {

    },
    mounted() {
        this.$nextTick(function() {
            if ($(".main-sidebar").height() < $("body").height())
                $(".main-sidebar").height($("body").height())
        })
    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less">
.container {
    margin-left: 200px;
}
</style>
