<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    components: {},
    data() {
        return {}
    },
    created: function() {
        GlobalModel.RootVue = this;
    },
    mounted() {},
    methods: {},
    destroyed() {}
}
</script>
<style lang="less">
body {
    margin: 0;
    padding: 0;
}
</style>
