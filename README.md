# mall-app


> vue koa 多页应用脚手架

支持多语言

## Architecture

* `样式`:scss.
* `库管理`:bower(npm有的,bower不需要,但比如boostrap,npm方式比较麻烦,看情况).
* `框架`:vue2,koa2.
* `模板引擎`:handlebars.
* `打包`:webapck3

**运行环境中Nodejs的版本至少是7**

## 目录结构

```text
.
├── build                                       // 使用 vue-cli 2.9.6(有修正)
├── config                                      // 使用 vue-cli 2.9.6(有修正)
├── server                                      // 服务端(koa,nodejs)
│    ├── lib                                    //     库
│    ├── controller                             //     控制器
│    ├── router                                 //     路由(koa-router,或者在前端用vue-router)
│    ├── service                                //     数据(api)
│    ├── view                                   //     视图
│    ├── server.js                              //     服务器入口
├── dist                                        // 生产目录
├── public                                      // 公共资源
│    ├── images                                 //     图片
│    └── vendor                                 //     第三方插件
├── web                                         // 前端(vue,js,css...)
│    ├── component                              //     组件
│    ├── lib                                    //     库
│    ├── locale                                 //     多语言文件
│    ├── page                                   //     页面(目录下的每个文件夹都应是一个应用)
│    ├── style                                  //     样式(应用样式)
│    ├── webpack.entry.conf.js                  //     webpack入口配置文件
│    ├── webpack.dev.conf.js                    //     webpack开发模式配置文件
│    └── webpack.pord.conf.js                   //     webpack生产模式配置文件
│   config.yml                                  //     通用配置文件
```

## 命令

``` bash
npm install    //安装
npm run dev    //启动开发模式
npm run build  //构建项目
npm run prod   //启动生产模式
```

## example

### 1.新建应用路由

* ```/server/router/example/example.js```

```javascript

const exampleCtrl = require('../../controller/example/example');
module.exports.default = module.exports = [
    {path: '', ctrl: exampleCtrl.index},
    {path: 'example', ctrl: exampleCtrl.index},
    {path: 'example/list', ctrl: exampleCtrl.list, method: 'post'}
];
```

### 2.新建应用控制器

* ```/server/controller/example/example.js```

```javascript
import exampleService from '../../service/example/example';

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

- ```/server/view/page/example.hbs```

```handlebars
{{#extend "layout-example"}}     //使用layout-example布局
    {{#content "head"}}
        {{{parseUrl 'example.css'}}} //exmaple应用的css,直接引用
    {{/content}}                     //不需要新建,build时会抽取vue的style成独立的文件.否则生产模式看不到样式.
    {{#content "body"}}
        <div id="app"></div>
        {{{parseUrl 'example.js'}}}  //exmaple应用的js,webpack.options.conf.js  entry.home
    {{/content}}
{{/extend}}
```

`/server/view/layout/**.hbs` 以文件名注册为`handlebars partial`.

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
<script web="example.js"></script>
//prod
<link href="/dist/static/css/example.[chunkhash].css" type="text/css" rel="stylesheet">
<script web="/dist/static/js/example.[chunkhash].js"></script>
```
如果没有build过,dev模式不会加载example.css,一般情况只加载example.js.即使加载build过的css也不影响dev模式下的样式应用.



### 4.新建应用页面

* ```/web/page/example/example.vue```

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

* ```/web/page/example/index.js```

```javascript
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
import exampleApp from './example.vue';
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

## 配置文件
* ```/webpack.entry.conf.js```

**任何模式都引用的配置文件**

**作为全局通用的入口文件,处在不同位置.在开发,生产模式webapck构建时自动合并引入webpack.entry.(不做其他属性合并).一般情况不作修改.**
```javascript
module.exports ={
    header: './web/lib/header/index.js', //全局头部通用文件
    footer: './web/lib/footer/index.js', //全局底部通用文件
};
```

`header/index.js`:不支持删除,在生产模式时,紧接着插入manifest.js,vendor.js.

`footer/index.js`:支持删除.

* ```/webpack.dev.conf.js```

**开发模式时所引用的配置文件,构建会合并所有属性.**

```javascript
module.exports ={
    entry: {
        example: './web/page/example/index.js'
    },
    //devtool: '#cheap-module-eval-source-map'
};
```

* ```/webpack.prod.conf.js```

**生产模式时所引用的配置文件,构建会合并所有属性.**

```javascript
module.exports ={
    ...
    new ManifestPlugin({
        publicPath: 'http://localhost:3333/example'
    })
    ...
};
```

## 多语言(locales)

### 1.配置参数
* ```/config.yml```

```yml
...
#多语言路由前缀
locales: ['zh', 'en'[,.]]
buildPath: #webpack构建路径
     -
       name: './web/locale'
...
```

缺一不可

路由则支持

*  http://localhost:3333/example
*  http://localhost:3333/zh/example
*  http://localhost:3333/en/example

### 2.创建多语言文件
* `/web/locale/zh.js`

```javascript
window.locale = {
    'desc': 'vue koa 多页应用脚手架'
};
```

* `/web/locale/en.js`

```javascript
window.locale = {
    'desc': 'vue koa scaffold'
};
```

多语言文件会在`header.js`之前插入.

### 3.调用getLocale全局方法
* `/web/lib/utils/locale.js`

```javascript
getLocale('desc')
```

## 打包

* ```/config.yml```

```yml
...
buildPath: #webpack构建路径
    # name 路径
    # isIndexEntry 是否使用index.js作为webpack.entry.
    # isIndexEntry = true
    # './web/page/example/index.js'  --> /dist/static/js/example[chunkhash].js
    # 使用index.js上一级目录名作为打包文件名(example.js).

    # isIndexEntry = false
    # './web/locale/zh.js'           --> /dist/static/js/zh[chunkhash].js
    # 使用当前文件作为打包文件名(zh.js).
     -
       name: './web/page'
       isIndexEntry : 'ture'
     -
       name: './web/locale'
...
```

一般情况每一个应用都建立在 `/web/page/**/index.js`,以`index.js`作为打包入口.

否则,如果有`/web/page/example1/index.js`,`/web/page/example2/index.js`,`/web/page/example3/index.js`.就会最终构建出以排序最后的`index.js`.

所以,`/web/page/**`,只要目录不重名,并且以`index.js`作为入口.就不会冲突.
