<template>
    <div id="app">
        exampleNews
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
