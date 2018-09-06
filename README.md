# mall-app


> vue koa 应用脚手架

支持多语言    
支持多页应用    
支持多种MOCK



## Architecture

* `样式`:scss.
* `库管理`:npm,bower(npm有的,bower不需要,但比如boostrap,npm方式比较麻烦,看情况).
* `框架`:vue2,koa2.
* `模板引擎`:handlebars4.
* `打包`:webpack4

**运行环境中Nodejs的版本至少是7**

## 目录结构

```text
.
├── build                                       // 使用 vue-cli 2.9.3(有修正)
├── config                                      // 使用 vue-cli 2.9.3(有修正)
├── server                                      // 服务端(koa,nodejs)
│    ├── lib                                    //     库
│    ├── controller                             //     控制器
│    ├── router                                 //     路由(koa-router,或者在前端用vue-router)
│    ├── service                                //     数据(api)
│    ├── view                                   //     视图
│    ├── server.js                              //     服务器入口
├── dist                                        // 生产目录
├── mock                                        // 模拟数据目录
├── public                                      // 公共资源(例如访问http://localhost:3333/public/images/bg.jpg)
│    ├── images                                 //     图片
│    └── vendor                                 //     第三方插件
├── web                                         // 前端(vue,js,css...)
│    ├── component                              //     组件
│    ├── lib                                    //     库
│    ├── locale                                 //     多语言文件
│    ├── page                                   //     页面
│    ├── style                                  //     样式(应用样式)
│    ├── webpack.entry.conf.js                  //     webpack入口配置文件
│    ├── webpack.dev.conf.js                    //     webpack开发模式配置文件
│    └── webpack.pord.conf.js                   //     webpack生产模式配置文件
│   config.yml                                  //     通用配置文件,整个脚手架很多功能都与它有关
```

## 安装

``` bash
npm install    //npm 安装
bower install  //bower 安装
```


## 命令

``` bash
npm run dev    //启动开发模式(dev)
npm run build  //构建项目
npm run prod   //启动生产模式(prod)
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
const exampleService = require('../../service/example/example');

const index = async (ctx, _next) => {
    let locals = {
        title: 'example'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example';
    await ctx.render('page/example', locals);
};

const list = async (ctx, _next) => {
    let locals = {
        list: await exampleService.getList(ctx)
    };
    ctx.body = locals;
};

module.exports.default = module.exports = {
    index,
    list
};


```

### 3.新建应用视图

- ```/server/view/page/example.hbs```

```handlebars
{{#extend "layout-example"}}         //使用layout-example布局
    {{#content "head"}}
        {{{parseUrl 'example.css'}}} //exmaple应用的css,直接引用
    {{/content}}                     //不需要新建,build时会抽取vue的style成独立的文件.否则生产模式看不到样式.
    {{#content "body"}}
        <div id="app"></div>
        {{{parseUrl 'example.js'}}}  //exmaple应用的js(相应webpack.entry)
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

* ```/web/page/example/example-app.vue```

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
import exampleApp from './example-app.vue';
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
    header: './web/lib/header.js', //全局头部通用文件(引用vue,全局样式...)
    footer: './web/lib/footer.js', //全局底部通用文件(比如统计数据...)
};
```

`header.js`:不支持删除,在生产模式时,紧接着插入manifest.js,vendor.js.

`footer.js`:支持删除.

* ```/webpack.dev.conf.js```

**开发模式时所引用的配置文件,构建会合并所有属性.**

```javascript
module.exports ={
    entry: {
        example: './web/page/example/index.js',
        example2: './web/page/example2/index.js'
    },
    //devtool: '#cheap-module-eval-source-map'
    ...
};
```

合并后的实际入口(多入口)

```javascript
entry: {
    example: [
        './web/lib/header.js', 
        './web/lib/footer.js' , 
        './web/page/example/index.js' , 
        'webpack-hot-client/client'
    ],
    example2: [
        './web/lib/header.js', 
        './web/lib/footer.js' , 
        './web/page/example/index.js' , 
        'webpack-hot-client/client'
    ]
}
```
`webpack-hot-client/client(hot-reload)`: 开发模式时每个入口自动加入.

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

合并后的实际入口(多入口)

```javascript
entry: {
    example: ['./web/page/example/index.js'],
    example2: ['./web/page/example2/index.js'],
    header: ['./web/lib/header.js'],
    footer: ['./web/lib/footer.js']
}
```

## 多语言方案(locales)

### 1.配置参数
* ```/config.yml```

```yml
...
#多语言路由前缀
locales: ['zh', 'en'[,.]]
#webpack构建路径(entry)
buildPath:
     -
       #多语言入口
       name: './web/locale'
...
```

**缺一不可**

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

### 3.创建全局方法
* `/web/lib/utils/locale.js`

```javascript
/**
 * 获取locale对应的值
 */
window.getLocale = function (key) {
    if (window.locale) {
        return window.locale[key] || '';
    }
    else {
        return key;
    }
};
```

### 4.调用全局方法

```javascript
...
data() {
    return {
        list: '',
        desc: getLocale('desc')
    }
}
...
```

路由则支持

*  http://localhost:3333/example
*  http://localhost:3333/zh/example
*  http://localhost:3333/en/example

## mock

* ```/config.yml```
```yml
...
# 是否使用模拟数据api(dev模式有效)
isMockAPI : true
# apiServer api服务器
apiServer : 'http://localhost:3334'
...
```


### 1.不拦截Ajax方式

#### 1.1 编写/mock/**/.json文件.

* ```/mock/example/list.json```

现在请求 `/example/list`

`isMockAPI:true`

服务端返回 `/mock/example/list.json`.

`isMockAPI:false`

服务端返回 `http://localhost:3334/example/list`.

### 2.拦截Ajax方式

#### 2.1 编写/public/mock.js文件.

#### 引用:

* [mockjs](http://mockjs.com/)

`isMockAPI:true`

在页面渲染时紧接着`/header/index.js`前插入`/public/vender/mock-min.js`,`/public/mock.js`.

```javascript
<script src="/public/vendor/mockjs/dist/mock-min.js"></script><script src="/public/mock.js"></script><script src="header.js"></script>
```

* ```/public/mock.js``` 

**这是个全局受影响的mock文件.**

```javascript
Mock.mock('/example/list', 'post', function () {
    return Mock.mock({
        "list|1-10": [{
            'name': '@cname',
            'imageUrl': 'https://placeholdit.imgix.net/~text?txtsize=50&bg=323232&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
            'description': '@cname'
        }
        ]
    });
});
```

如果注释该文件则以**不拦截AJAX方式**发出请求.

`isMockAPI:false`

不会插入`mock-min.js`,`mock.js.`


## 打包

* ```/config.yml```

```yml
...
#webpack构建路径(prod模式有效)
buildPath:
    # name entry路径
    # isIndexEntry 是否使用index.js作为webpack.entry.
    # isIndexEntry = true
    # './web/page/example/index.js'  --> /dist/static/js/example[chunkhash].js
    # 使用index.js上一级目录名作为打包文件名(example.js).

    # isIndexEntry = false
    # './web/locale/zh.js'           --> /dist/static/js/zh[chunkhash].js
    # 使用当前文件作为打包文件名(zh.js).
     -
       name: './web/page'
       isIndexEntry : 'true'
     -
       name: './web/locale'
...
```

一般情况每一个应用都建立在 `/web/page/**/index.js`,以`index.js`作为打包入口.

否则,如果有`/web/page/example1/index.js`,`/web/page/example2/index.js`,`/web/page/example3/index.js`.就会最终构建出以排序最后的`index.js`.

所以,`/web/page/**`,只要目录不重名,并且以`index.js`作为入口.就不会冲突.


**dev**

从这些配置文件打包 `/webpack.base.conf` , `/webpack.entry.conf.js` , `/webpack.dev.conf.js`    
**主要从`/webpack.dev.conf.js`配置打包开发需要的entry.**

**prod**

从这些配置文件打包 `/webpack.base.conf` , ` /webpack.entry.conf.js` , `/webpack.prod.conf` , `/web/page/**/index.js`    
**主要从`/web/page/**/index.js`打包所有js**

