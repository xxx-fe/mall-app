<template>
    <div id="app">
        <header class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand hidden-sm" target="_blank"
                       href="https://github.com/xxx-fe/mall-app">mall-app</a>
                </div>
            </div>
        </header>
        <div class="container">
            <div class="text-center page-header">
                <h1 class="mall-app">mall-app</h1>
                <p>vue koa 应用脚手架</p>
                <img src="/public/images/logo.gif">
            </div>
            <div class="row">
                <div v-for="item in list" class="col-sm-6 col-md-4 col-lg-3">
                    <div class="thumbnail">
                        <img
                                v-bind:src="item.imageUrl"
                                width="300" height="150">
                        <div class="caption">
                            <h3>
                                <a href="javascript:void(0)"
                                   title="webpack" target="_blank">{{item.name}}
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: '',
                desc: getLocale('desc')
            }
        },
        methods: {

        },
        mounted() {
            this.$http.post('/example/list').then(response => {
                console.log(response);
                this.list = response.data.list
            }, response => {
                console.log(response);
            });
        }
    }
</script>
<style scoped>
    .page-header {
        margin: 80px 0 20px;
    }

    .mall-app {
        font-size: 50px;
        height: 76px;
        line-height: 76px;
        color: blue;
    }

    .lang {
        font-size: 30px;
    }
</style>
<style lang="scss">
</style>
