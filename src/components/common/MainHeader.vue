<template>
    <header class="main-header">
        <div class="title">leanBI</div>
        <div class="right">
        </div>
    </header>
</template>
<script>
export default {
    name: 'main-header',
    data() {
        return {
            sellerList: [],
            seller_name: ''
        }
    },
    mounted: function() {
    },
    methods: {
        
    }
}
</script>
<style lang="less">
.main-header {
    width: 100%;
    height: 60px;
    background-color: #324057;
    position: relative;
    max-height: 100px;
    .title {
        font-size: 20px;
        color: #FFFFFF;
        margin: 0 20px;
        min-height: 100%;
        line-height: 60px;
        display: inline-block;
    }
}
</style>
