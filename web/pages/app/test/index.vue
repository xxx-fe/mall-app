<template>
    <div class="container" id="test">
        <div class="box">
            <h1 class="title">这是一个测试页面</h1>
            <button id="btn">按钮</button>
        </div>
    </div>
</template>
<script>
    export default {
        appId: 'test',
        data() {
            return {}
        },
        methods: {},
        mounted() {

        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .box {
        padding: 50px 0px;

        .title {
            margin-bottom: 50px;
            text-align: center;
            font-size: 20px
        }
    }
</style>
