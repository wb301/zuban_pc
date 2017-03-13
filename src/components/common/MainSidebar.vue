<template>
    <aside class="main-sidebar">
        <ul>
            <router-link active-class='active' tag="li" :to="{path: '/'+item.path}" v-for="(item,index) in sideList">
                {{item.title}}
            </router-link>
        </ul>
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
    height: 100%;
    position: absolute;
    left: 0;
    background-color: #5E6D82;
    ul,
    li {
        margin: 0;
        padding: 0;
    }
    ul li {
        padding-left: 20px;
        height: 56px;
        line-height: 56px;
        list-style-type: none;
        color: #fff;
        font-size: 14px;
    }
    li.active {
        background-color: #8492A6;
    }
    li:hover {
        background-color: #8492A6;
    }
}
</style>
