<template>
    <div id="home-app">
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
                <img src="/public/img/logo.gif" style="width: 300px;">
            </div>

            <div class="row">
                <div v-if="list" v-for="item in list" class="col-sm-6 col-md-4 col-lg-3">
                    <div class="thumbnail">
                        <img :src="item.imageUrl"
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
        <back-to-top></back-to-top>
    </div>
</template>
<script>
    import backToTop from '../../components/back-to-top';
    export default {
        data() {
            return {
                list: ''
            }
        },
        methods: {

        },
        mounted() {
            this.$http.post('/api/list').then(response => {
                console.log(response);
                this.list = response.data.list
            }, response => {
                console.log(response);
            });
        },
        components:{
            backToTop
        }
    }
</script>
<style lang="scss" scoped>
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
