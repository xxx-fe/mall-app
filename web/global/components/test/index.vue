<template>
    <div class="container test-box">
        test 全局组件
    </div>
</template>
<script>
    export default {
        name: 'test',
        props: {

        },
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>
<style lang="scss" scoped>
    .test-box {
        margin: 50px 0px;
        text-align: center;
        font-size: 20px;
    }
</style>
