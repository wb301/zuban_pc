<template>
    <div>
        <div class="container-body">

            <div class="table">
                <el-table :data="systemList" border style="width: 100%">
                    <el-table-column prop="config_name" align="center" label="配置类型" min-width="120">
                    </el-table-column>
                    <el-table-column prop="config_value" align="center" label="配置值" min-width="120">
                    </el-table-column>
                    <el-table-column prop="remark" align="center" label="类型介绍" min-width="180">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="140">
                        <template scope="scope">
                            <el-button @click="onSubmit(scope.row)" size="small">
                                修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="平台手续费配置" v-model="platform">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="平台手续费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="platform = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="注册地手续费配置" v-model="registered">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="注册地手续费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="registered = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="消费地手续费配置" v-model="consum">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="消费地手续费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="consum = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查看手续费配置" v-model="lookPrice">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="查看手续费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="lookPrice = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="银卡手续费配置" v-model="vipLevel1">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="银卡手续费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="vipLevel1 = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="金卡手续费配置" v-model="vipLevel2">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="金卡手续费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="vipLevel2 = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="钻石会员费配置" v-model="vipLevel3">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="钻石会员费：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="vipLevel3 = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="客服电话配置" v-model="cusomerService">
            <el-form ref="updInfo" :model="updInfo" label-width="130px">
                <el-form-item label="客服电话：">
                    <el-col :span="18">
                        <el-input v-model.number="updInfo.config_value"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cusomerService = false">取 消</el-button>
                <el-button type="primary" @click="updateSysConfig">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let index = 0;
export default {
    components: {},
    data() {
        return {
            systemList: [],
            vipList: [],
            membersList: [],
            updInfo: {},
            updValue: "",
            platform: false,
            registered: false,
            consum: false,
            lookPrice: false,
            vipLevel1: false,
            vipLevel2: false,
            vipLevel3: false,
            cusomerService: false
        }
    },
    created() {

    },
    mounted() {
        this.getSysConfigList();
    },
    methods: {
        getSysConfigList() {
            var param = {
                c: 'Admin',
                m: 'Sys',
                a: 'getSysConfigList'
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.systemList = [];
                    this.vipList = [];
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].config_key == "AS_PLATFORM" || 
                            response[i].config_key == "AS_REGISTERED" || 
                            response[i].config_key == "AS_CONSUM") {

                            var configValue = parseFloat(response[i].config_value) / 1000;
                        }else if (response[i].config_key == "VIP_LIST") {
                            this.vipList = JSON.parse(response[i].config_value);

                            for (var j = 0; j < this.vipList.length; j++) {
                                var vipInfo = {
                                               "config_key": "VIP_LIST",
                                               "config_name": this.vipList[j]["name"],
                                               "level": this.vipList[j]["level"],
                                               "config_value": this.vipList[j]["price"],
                                               "month": this.vipList[j]["month"],
                                               "remark": response[i].remark,
                                               "vIndex": j
                                            }
                                this.systemList.push(vipInfo);
                            }
                            continue;
                        }
                        this.systemList.push(response[i]);
                    }
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        updateSysConfig() {
            var updValue = this.updInfo["config_value"];
            if(this.updInfo["config_key"] == "VIP_LIST"){
                this.vipList[this.updInfo["vIndex"]]["price"] = updValue;
                updValue = JSON.stringify(this.vipList);
            }

            var param = {
                key: this.updInfo["config_key"],
                value: updValue
            };

            var p_obj = {
                action: '&c=Admin&m=Sys&a=updateSysConfig',
                param: param,
                success: (response) => {
                    this.clearDialog();
                    this.getSysConfigList();
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        clearDialog() {
            this.updInfo = {};
            this.platform = false;
            this.registered = false;
            this.consum = false;
            this.lookPrice = false;
            this.vipLevel1 = false;
            this.vipLevel2 = false;
            this.vipLevel3 = false;
            this.cusomerService = false;
        },
        onSubmit(info) {
            this.updInfo = info;
            switch(info["config_key"]){
                case "AS_PLATFORM":
                    this.platform = true;
                    break;
                case "AS_REGISTERED":
                    this.registered = true;
                    break;
                case "AS_CONSUM":
                    this.consum = true;
                    break;
                case "LOOK_PRICE":
                    this.lookPrice = true;
                    break;
                case "VIP_LIST":
                    if(info["level"] == 1){
                        this.vipLevel1 = true;
                    }else if(info["level"] == 2){
                        this.vipLevel2 = true;
                    }else if(info["level"] == 3){
                        this.vipLevel3 = true;
                    }
                    break;
                case "CUSTOMER_SERVICE":
                    this.cusomerService = true;
                    break;
            }
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    padding: 15px;
    .header {
        margin-left: 50px;
        table {
            margin-top: 10px;
            border-spacing: 0;
            border-top: 1px solid grey;
            border-left: 1px solid grey;
            th,
            td {
                border-right: 1px solid grey;
                border-bottom: 1px solid grey;
                min-width: 100px;
                .el-button+.el-button {
                    margin-left: 0px;
                }
            }
        }
    }
}
</style>
