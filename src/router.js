import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [{
        path: '/login',
        component: function(resolve) {
            require(['./page/login/Index.vue'], resolve)
        }
    }, {
        path: '/operation',
        component: function(resolve) {
            require(['./page/operation/Index.vue'], resolve)
        },
        children: [{
            path: '/index',
            component: function(resolve) {
                require(['./components/Hello.vue'], resolve)
            }
        }, {
            path: '/agent',
            component: function(resolve) {
                require(['./page/operation/agent/Index.vue'], resolve)
            },
            children: [{
                path: '',
                component: function(resolve) {
                    require(['./page/operation/agent/list/Index.vue'], resolve)
                }
            }, {
                path: '/edit',
                component: function(resolve) {
                    require(['./page/operation/agent/edit/Index.vue'], resolve)
                }
            }]
        }, {
            path: '/user',
            component: function(resolve) {
                require(['./page/operation/user/Index.vue'], resolve)
            },
            children: [{
                path: '',
                component: function(resolve) {
                    require(['./page/operation/user/list/Index.vue'], resolve)
                }
            }, {
                path: '/edit',
                component: function(resolve) {
                    require(['./page/operation/user/edit/Index.vue'], resolve)
                }
            }]
        }, {
            path: '/order',
            component: function(resolve) {
                require(['./page/operation/order/Index.vue'], resolve)
            },
            children: [{
                path: '',
                component: function(resolve) {
                    require(['./page/operation/order/list/Index.vue'], resolve)
                }
            }]
        }, {
            path: '/service-type',
            component: function(resolve) {
                require(['./page/operation/service-type/Index.vue'], resolve)
            }
        }]
    }, {
        path: '/',
        redirect: {
            path: '/index'
        }
    }]
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0) // scroll to top
    next()
});
export default router
