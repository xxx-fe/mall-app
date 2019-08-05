<template>
    <div class="container" id="home">
        <div class="text-center page-header">
            <h1 class="mall-app">mall-app -- vue koa 应用脚手架</h1>
            <p class="text-center">
                <img src="/public/img/logo.gif" style="width: 300px; display: inline-block">
            </p>
        </div>
        <div class="img-box clearfix">
            <div class="item" v-if="list" v-for="item in list">
                <img v-lazy="item.imageUrl"
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
        <back-to-top></back-to-top>
    </div>
</template>
<script>
    import backToTop from '../../../components/back-to-top';

    export default {
        appId: 'home',
        data() {
            return {
                list: ''
            }
        },
        methods: {},
        mounted() {
            axios.post('/api/list').then(response => {
                console.log(response);
                this.list = response.data.list
            }, response => {
                console.log(response);
            });
        },
        components: {
            backToTop
        }
    }
</script>
<style lang="scss" scoped>
    .row{
        margin: 20px 0px;
    }
    .page-header {
        margin: 80px 0 20px;
    }

    .mall-app {
        font-size: 50px;
        height: 76px;
        line-height: 76px;
        color: blue;
    }

    .img-box {
        margin: 0px 140px;
        .item {
            width: 300px;
            height: 150px;
            position: relative;
            float: left;
            margin-right: 10px;
            .caption {
                position: absolute;
                bottom: 0;
                width: 100%;
                text-align: center;
                background: #fff;
                h3{
                    font-size: 20px;
                }
            }
            &:nth-child(3n) {
                margin-right: 0;
            }
            &:nth-child(n+4) {
                margin-top: 50px;
            }
            img {
                width: 300px;
                height: 150px;
            }
        }
    }
</style>
