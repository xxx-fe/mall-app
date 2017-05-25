<template>
    <div id="app">
        <img src="../../../public/image/logo.gif">
        <el-form ref="form" :model="form" label-width="80px;">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    password:''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
<style lang="scss">
    @import '../style/common';
</style>
