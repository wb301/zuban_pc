<template>
    <div>
        <div class="container-body">
            <h1>欢迎使用租伴网后台管理系统V1.0</h1>
        </div>
        <div id="qrCode"></div>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data() {
        return {
            userInfo: NormalHelper.userInfo()
        }
    },
    mounted() {
        this.$nextTick(function () {
            require ('../../../lib/common/jquery.qrcode.min.js');
            this.qrcode();
        })
    },
    methods: {
        qrcode() {
            $("#qrCode").qrcode({
                text: "http://www.baidu.com",
                width:200,
                height:200
            })
        }
    },
}
</script>
<style lang="less" scoped>
.container-body {
    h1 {
        text-align: center;
    }
}
</style>
