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
            title: '数据统计',
            children: [{
                title: '用户统计',
                path: 'user'
            }, {
                title: '订单统计',
                path: 'order'
            }]
        }, {
            title: '资金管理',
            children: [{
                title: '收支明细-代理商',
                path: 'divided'
            }]
        }];
        var managerType = NormalHelper.userInfo()["manager_type"];
        if (managerType > 0) {
            var masterList = [ {
                title: '代理商管理',
                path: 'agent'
            }, {
                title: '用户管理',
                path: 'userinfo'
            }, {
                title: '内容审核',
                path: 'product'
            }, {
                title: '配置中心',
                children: [{
                    title: '服务类型配置',
                    path: 'service-type'
                }, {
                    title: '系统配置',
                    path: 'rate'
                }]
            },{
                title: '资金管理',
                children: [{
                    title: '收支明细-平台',
                    path: 'moneyHistory'
                },{
                    title: '提现申请',
                    path: 'withdrawal'
                },{
                    title: '退款申请',
                    path: 'orderReturn'
                }]
            }];


            // 11.平台收支明细
            // 12.代理商收支明细
            //只有平台能看到
            menuList = menuList.reduce(function(coll, item) {
                var list = [];
                for (var i = 0; i < coll.length; i++) {
                    list.push(coll[i].title);
                }
                if (list.indexOf(item.title) < 0) {
                    coll.push(item);
                }
                if (list.indexOf(item.title) > -1) {
                    item.children = item.children.concat(coll[list.indexOf(item.title)].children);
                    coll[list.indexOf(item.title)].children = item.children;
                }
                return coll;
            }, masterList);
        }

        return {
            menuList: menuList
        }
    },
    created: function() {

    },
    mounted() {
        this.$nextTick(function() {
            if ($(".main-sidebar").height() < $(window).height())
                $(".main-sidebar").height($(window).height())
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
