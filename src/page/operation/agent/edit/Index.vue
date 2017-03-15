<template>
    <div>
        <div class="container-body">
            <el-form :model="form" ref="form" label-width="120px">
                <el-form-item label="代理商帐号" prop="phone">
                    <el-col :span="8">
                        <el-input v-model.number="form.phone" placeholder="请输入代理商手机号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理商密码" prop="password">
                    <el-col :span="8">
                        <el-input v-model.number="form.password" placeholder="请输入代理商密码"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理商姓名" prop="nick_name">
                    <el-col :span="8">
                        <el-input v-model.number="form.nick_name" placeholder="请输入代理商姓名"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理商状态" prop="status">
                    <el-col :span="8">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1">开启</el-radio>
                            <el-radio label="0">关闭</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            form: {
                phone: '',
                password: '',
                nick_name: '',
                status: "1"
            }
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    padding: 15px;
}
</style>
