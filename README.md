# mall-app


> vue koa 前后分离多页应用脚手架

支持多语言

## Architecture

* `脚本`:vue2,ES5+.
* `样式`:scss.
* `库管理`:bower(npm有的,bower不需要,但比如boostrap,npm方式比较麻烦,看情况).
* `服务器`:koa2.
* `模板引擎`:handlebars.
* `打包`:webapck2

**运行环境中Nodejs的版本至少是7**

## 目录结构

```text
.
├── build                                       // webpack配置文件(vue-cli生成,有修改)
├── config                                      // 项目打包路径(vue-cli生成,有修改)
├── app                                         // app应用
│    ├── lib                                    //     库
│    ├── controller                             //     控制器
│    ├── router                                 //     路由
│    ├── service                                //     数据(api)
│    ├── view                                   //     视图
│    │    ├── common                            //         通用视图
│    │    └── layout                            //         布局视图
│    ├── app.js                                 //     应用入口
├── dist                                        // 生产目录
├── public                                      // 公共资源
│    ├── script                                 //     脚本
│    │      ├── common                          //        通用方法
│    │      └── locale                          //        多语言文件
│    ├── image                                  //     图片
│    ├── style                                  //     样式(全局样式)
│    └── vendor                                 //     第三方插件
├── src                                         // 源码
│    ├── component                              //     组件
│    ├── page                                   //     页面(每个页面都是一个应用)
│    └── style                                  //     样式(应用样式)

```

## 命令

``` bash
npm install    //安装
npm run dev    //启动开发模式(读webpack.options.conf.js文件entry,并热加载)
npm run build  //构建项目
npm run prod   //启动生产模式(读dist目录打包后的文件)
```

## example

### 应用配置文件
* ```/webpack.options.conf.js```

**在开发模式,entry 作为热加载,在生产模式会忽略此文件.**
```javascript
module.exports ={
    entry: {
        header: './public/common/header.js',//公共资源头部js:一般包括第三方插件,全局通用函数等.(所有应用共享)
        example: './src/page/example/index.js',//源代码应用js                              (当前应用js)
        footer: './public/common/footer.js',//公共资源底部js:一般有统计脚本等.               (所有应用共享)
    }
}
```
新建一个webpack.options.conf.js(不上传到仓库).
* ```/app/view/**/**.hbs```  引用它们.

### 1.新建应用路由

* ```/app/router/example/index.js```
```javascript
import exampleCtrl from '../../controller/example/index';
import {addRouter} from '../../lib/add-router';

let router = addRouter(function (router) {
    router.get('', exampleCtrl.index);
    router.get('example', exampleCtrl.index);
    router.post('example/list', exampleCtrl.list);
});

module.exports = router;
```

### 2.新建应用控制器

* ```/app/controller/example/index.js```
```javascript
import exampleService from '../../service/example/index';

const index = async (ctx, _next) => {
    let locals = {
        title: 'example'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example';
    await ctx.render('page/example', locals);
};

const list = async (ctx, _next) => {
    const service = new exampleService(ctx);
    let locals = {
        list: service.getList()
    };
    ctx.body = locals;
};

module.exports = {
    index,
    list
};

```

### 3.新建应用视图

- ```/app/view/page/example.hbs```
```handlebars
{{#extend "layout-example"}}     //使用layout-example布局
{{#content "head"}}
    {{{parseUrl 'example.css'}}} //exmaple应用的css,直接引用
{{/content}}                     //不需要新建,build时会抽取vue的style成独立的文件.否则生产模式看不到样式.
{{#content "body"}}
<div id="app"></div>
{{{parseUrl 'example.js'}}}      //exmaple应用的js
{{/content}}                     //webpack.options.conf.js  entry.home
{{/extend}}
```

`/app/view/**/**.hbs` 以文件名注册为`handlebars partial`.

#### 引用:

* [handlebars(模板引擎)](https://github.com/wycats/handlebars.js)

* [handlebars-layouts(模板引擎布局helpers)](https://github.com/shannonmoeller/handlebars-layouts)

#### parseUrl

解析url, handlebars自定义helpers.根据当前开发环境返回正确的url.

```javascript
{{{parseUrl 'example.css' 'example.js'}}}
```
结果:
```html
//dev
<link href="/dist/static/css/example.[chunkhash].css" type="text/css" rel="stylesheet">//如果build过,则加载
<script src="example.js"></script>
//prod
<link href="/dist/static/css/example.[chunkhash].css" type="text/css" rel="stylesheet">
<script src="/dist/static/js/example.[chunkhash].js"></script>
```
如果没有build过,dev模式不会加载example.css,一般情况只加载example.js.即使加载build过的css也不影响dev模式下的样式应用.


### 4.新建应用页面

* ```/src/page/example/index.vue```
```javascript
...
<script>
    export default {
        data () {
            return {
                list: ''
            }
        },
        mounted(){
            this.$http.post('/example/list').then(response => {
                console.log(response);
                this.list = response.data.list
            }, response => {
                console.log(response);
            })
        }
    }
</script>
...
```
### 5.新建应用入口

* ```/src/page/example/index.js```
```javascript
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
import exampleApp from './index.vue';
//公共资源样式
import '../../../public/style/common.scss';
$(document).ready(function(){
    new Vue({
        el: '#app',
        template: '<exampleApp/>',
        components: {exampleApp}
    });
});
```
**浏览: http://localhost:3333/example**

## 打包

`npm run build` 从`/src/page/**/*.js`打包,如果设置了多语言也打包`/public/srcipt/locale/**/*.js`

### 打包的命名生成

`/public/srcipt/locale/zh/index.js` --> `/dist/static/js/zh[chunkhash].js`

`/src/page/example/index.js` --> `/dist/static/js/example[chunkhash].js`

生成到`/dist/static/js/`的文件名是由文件目录决定的.

#### 为什么这么做

一般情况每一个应用都建立在 `/src/page/**/index.js`,以`index.js`作为入口.
`index.js`引用当前目录.js方便管理该应用.


## 多语言(locales)

### 1.配置locales参数
* ```/config.yml```
```yml
locales: ['zh', 'en'[,.]]
```

路由则支持

*  http://localhost:3333/example
*  http://localhost:3333/zh/example
*  http://localhost:3333/en/example

**默认语言:en**

### 2.创建多语言文件
* `/public/srcipt/locale/zh/index.js`
```javascript
locale = {
    'desc': 'vue koa 前后分离多页应用脚手架'
};
```
* `/public/srcipt/locale/en/index.js`
```javascript
locale = {
    'desc': 'vue koa scaffold'
};
```

多语言文件会在`header.js`之前自动插入.文件一定是在目录下,以目录名为生产文件.
和**打包的命名生成**规则是一样的.

### 3.调用getLocale全局方法
* `/public/srcipt/common/locale.js`
```javascript
getLocale('desc')
```


