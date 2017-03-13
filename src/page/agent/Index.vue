<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {}
    },
    created() {

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
<style lang="less" scoped>
</style>
