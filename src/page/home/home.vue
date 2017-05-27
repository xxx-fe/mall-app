<template>
    <div id="app">
        <img src="../../../public/image/logo.gif">
        <h1>mall-app</h1>
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
</style>
<style lang="scss">
    @import '../style/common';
</style>
