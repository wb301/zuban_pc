<template>
    <div>
        <div class="container-body">
            <h1>欢迎使用租伴网后台管理系统V1.0</h1>
        </div>
        <div class="container-qrCode" v-if="isManager" id="qrCode"></div>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data() {
        return {
            userInfo: NormalHelper.userInfo(),
            isManager: false,
            regionInfo: {}
        }
    },
    mounted() {
        this.isManager = this.userInfo.manager_type == 1 ? false : true;
        this.regionInfo = {
            "code": this.userInfo.region_code,
            "name": this.userInfo.region_name
        }
        if(this.isManager){
            this.$nextTick(function () {
                require ('../lib/common/jquery.qrcode.min.js');
                this.qrcode();
            })
        }
    },
    methods: {
        qrcode() {
            var text = this.utf16to8("https://weixin.zuban8.com/zuban_web/console/#/registered?region="+JSON.stringify(this.regionInfo));
            $("#qrCode").qrcode({
                text: text,
                width:200,
                height:200,
                correctLevel:0
            });
        },
        utf16to8(str) {
           var out, i, len, c;
           out = "";
           len = str.length;
           for(i = 0; i < len; i++) {
               c = str.charCodeAt(i);
               if ((c >= 0x0001) && (c <= 0x007F)) {
                   out += str.charAt(i);
               } else if (c > 0x07FF) {
                   out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                   out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                   out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
               } else {
                   out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                   out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
               }
           }
           return out;
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
.container-qrCode {
    width: 100%;
    text-align: center;
    position: fixed;
    top: 200px;
    bottom: 300px;
    margin-left: -100px;
}
</style>
