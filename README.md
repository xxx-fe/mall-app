# mall-app

> 一个前端开发脚手架


## 技术栈
vue2 + koa2 + webpack2 + ES6/7 + handlebars + bower + jquery

**运行环境中Nodejs的版本至少是7**


## 目录结构
```text
.
├── build                                       // webpack配置文件(vue-cli生成)
├── config                                      // 项目打包路径(vue-cli生成)
├── app                                         // koa前端服务器
│    ├── common                                 //     通用等一系列方法
│    ├── controller                             //     控制器
│    ├── middleware                             //     中间件
│    ├── controller                             //     控制器
│    ├── router                                 //     路由
│    ├── service                                //     数据(api)
│    ├── view                                   //     视图
│    │    ├── common                            //         通用视图
│    │    └── layout                            //         布局
│    ├── app.js                                 // koa前端服务器启动入口
├── dist                                        // 生产目录
├── public                                      // 公共资源
│    ├── common                                 //     通用等一系列方法
│    ├── image                                  //     图片
│    ├── style                                  //     样式
│    ├── vendor                                 //     第三方插件(主要来自bower)
│    └── common.js                              //     通用脚本
│                    
├── src                                         // 源码
│    ├── components                             //     组件
│    └─  pages                                  //     页面(每个页面都是一个应用)

```

## 命令
``` bash
npm install    //安装
npm run dev    //启动开发模式(包含热加载)
npm run build  //构建项目
npm run prod   //启动生产模式
```

## 基本开发流程例子


### 开发前的配置文件 
* ```/webpack.options.conf.js```

```javascript
module.exports ={
    entry: {
        header: './public/common/header.js',
        home: './src/pages/home/home.js',
        footer: './public/common/footer.js',
    }
}
```
新建一个webpack.options.conf.js文件(不上传到仓库),作为当前app的入口.


### 1.新建路由
* ```/app/router/home.js``` 
```javascript
import Router from 'koa-router';
import home from '../controller/home';

const router = Router({
    prefix: '/'
});

router.get('/', home.index);

module.exports = router;
```

### 2.新建控制器
* ```/app/controller/home.js``` 
```javascript
const index = async (ctx, _next) => {
    let locals = {
        title: '首页',
    };
    await ctx.render('home', locals);
}

export default {
    index
};
```

### 3.新建视图
* ```/app/view/home.hbs``` 
```handlebars
{{#extend "layoutDefault"}}   //使用默认布局
{{#content "head"}}
    {{{parseUrl 'home.css'}}} //当前业务的css,直接引用,不需要新建,build时会抽取vue的style成独立的文件.否则生产模式看不到样式.
{{/content}}
{{#content "body"}}
<div id="app"></div>
{{{parseUrl 'home.js'}}}      //当前业务的js
{{/content}}
{{/extend}}
```
[handlebars模板引擎](https://github.com/wycats/handlebars.js)

####handlebars 自定义helpers

`parseUrl`：**根据当前开发环境返回正确的url,每个应用这是必须用到的,否则无法正确返回路径.**


### 4.新建页面
* ```/src/pages/home.vue``` 
```vue
<template>
    <div id="app"></div>
</template>
<script>
    export default {
        name: 'home'
    }
</script>

<style scoped>
</style>
<style lang="scss">
    @import '../style/common';
</style>
```

### 5.新建页面入口
* ```/src/pages/home.js``` 
```vue
import Vue from 'vue';
import Home from './home.vue';
$(document).ready(function(){
    new Vue({
        el: '#app',
        template: '<Home/>',
        components: {Home}
    });
});
```
**浏览: http://localhost:3333/**

## 热加载文件
* ```/header.js``` 头部打包js
* ```/app.js``` app打包js 或者叫业务打包js
* ```/footer.js``` 底部打包js

生产模式会根据实际情况替换为正确的js/css.保证开发时替换css/js都能立即看到结果.
