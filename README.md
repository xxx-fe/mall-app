# mall-app


> vue koa 应用脚手架

支持多语言    
支持多页应用    
支持多种MOCK



## Architecture

* `样式`:scss.
* `库管理`:npm,bower
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
├── public                                      // 公共资源(例如访问http://localhost:3333/public/img/bg.jpg)
│    ├── img                                    //     图片
│    └── vendor                                 //     第三方插件
├── web                                         // 前端(vue,js,css...)
│    ├── components                             //     组件
│    ├── directives                             //     指令
│    ├── entry                                  //     入口
│    ├── filters                                //     过滤
│    ├── global                                 //     全局设置
│    ├── pages                                  //     应用页面                  
│    ├── styles                                 //     样式(应用样式)
│    ├── vendor                                 //     第三方插件
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

* ```/server/router/main-app/index.js```

```javascript
const mainCtrl = require('../../controller/main-app');
module.exports.default = module.exports = [
    {path: '', ctrl: mainCtrl.pageHome},
    {path: 'main', ctrl: mainCtrl.pageHome},
    {path: 'main/list', ctrl: mainCtrl.list, method: 'post'}
];
```

### 2.新建应用控制器

* ```/server/controller/main-app/index.js```

```javascript
const mainService = require('../../service/main-app');

const pageHome = async (ctx, _next) => {
    let locals = {
        title: 'home-page'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'main-app';
    await ctx.render('pages/main-app/home', locals);
};

const list = async (ctx, _next) => {
    let locals = {
        list: await mainService.getList(ctx)
    };
    ctx.body = locals;
};

module.exports.default = module.exports = {
    pageHome,
    list
};


```

### 3.新建应用视图

- ```/server/view/pages/main-app/home.hbs```

```handlebars
{{#extend "layout-default"}}          //使用layout-default布局
    {{#content "head"}}
        {{{parseUrl 'main-app.css'}}} //main-app应用的css,直接引用
    {{/content}}                      //不需要新建,build时会抽取vue的style成独立的文件.否则生产模式看不到样式.
    {{#content "body"}}
        <div id="home-app"></div>
        {{{parseUrl 'main-app.js'}}}  //main-app应用的js(相应webpack.entry)
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
{{{parseUrl 'main-app.css' 'main-app.js'}}}
```
结果:    

```html
//dev
<link href="/dist/static/css/main-app.[chunkhash].css" type="text/css" rel="stylesheet">//如果build过,则加载
<script web="main-app.js"></script>
//prod
<link href="/dist/static/css/main-app.[chunkhash].css" type="text/css" rel="stylesheet">
<script web="/dist/static/js/main-app.[chunkhash].js"></script>
```
如果没有build过,dev模式不会加载main-app.css,一般情况只加载main-app.js.即使加载build过的css也不影响dev模式下的样式应用.



### 4.新建应用页面

* ```/web/pages/main-app/home.vue```

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
            this.$http.post('/main/list').then(response => {
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

* ```/web/pages/main-app/index.js```

```javascript
import homeApp from './home.vue';
new Vue({
    el: '#home-app',
    template: '<homeApp/>',
    components: {homeApp}
});
```
**浏览: http://localhost:3333/**


## 配置文件
* ```/webpack.entry.conf.js```

**任何模式都引用的配置文件**

**作为全局通用的入口文件,处在不同位置.在开发,生产模式webapck构建时自动合并引入webpack.entry.(不做其他属性合并).一般情况不作修改.**
```javascript
module.exports ={
    header: './web/entry/header.js', //全局头部通用文件(引用vue,全局样式...)
    footer: './web/entry/footer.js', //全局底部通用文件(比如统计数据...)
};
```

`header.js`:不支持删除,在生产模式时,紧接着插入manifest.js,vendor.js.

`footer.js`:支持删除.

* ```/webpack.dev.conf.js```

**开发模式时所引用的配置文件,构建会合并所有属性.**

```javascript
module.exports ={
    entry: {
        'main-app': './web/pages/main-app/index.js',
        'other-app': './web/pages/other-app/index.js'
    }
    //devtool: '#cheap-module-eval-source-map'
    ...
};
```

合并后的实际入口(多入口)

```javascript
entry: {
    'main-app': [
        './web/entry/header.js', 
        './web/entry/footer.js' , 
        './web/pages/main-app/index.js' , 
        'webpack-hot-client/client'
    ],
    'other-app': [
        './web/entry/header.js', 
        './web/entry/footer.js' , 
        './web/pages/other-app/index.js' , 
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
        publicPath: 'http://localhost:3333/main-app'
    })
    ...
};
```

合并后的实际入口(多入口)

```javascript
entry: {
    'main-app': ['./web/pages/main-app/index.js'],
    'other-app': ['./web/pages/other-app/index.js'],
    header: ['./web/entry/header.js'],
    footer: ['./web/entry/footer.js']
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
* `/web/utils/locale.js`

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

*  http://localhost:3333/
*  http://localhost:3333/zh/
*  http://localhost:3333/en/

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

* ```/mock/main/list.json```

现在请求 `/main/list`

`isMockAPI:true`

服务端返回 `/mock/main/list.json`.

`isMockAPI:false`

服务端返回 `http://localhost:3334/main/list`.

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
Mock.mock('/main/list', 'post', function () {
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
    # './web/pages/main-app/index.js'  --> /dist/static/js/main-app[chunkhash].js
    # 使用index.js上一级目录名作为打包文件名(example.js).

    # isIndexEntry = false
    # './web/locale/zh.js'           --> /dist/static/js/zh[chunkhash].js
    # 使用当前文件作为打包文件名(zh.js).
     -
       name: './web/pages'
       isIndexEntry : 'true'
     -
       name: './web/locale'
...
```

一般情况每一个应用都建立在 `/web/pages/**/index.js`,以`index.js`作为打包入口.

否则,如果有`/web/pages/main-app/index.js`,`/web/pages/main-app2/index.js`,`/web/pages/main-app3/index.js`.就会最终构建出以排序最后的`index.js`.

所以,`/web/pages/**`,只要目录不重名,并且以`index.js`作为入口.就不会冲突.


**dev**

从这些配置文件打包 `/webpack.base.conf` , `/webpack.entry.conf.js` , `/webpack.dev.conf.js`    
**主要从`/webpack.dev.conf.js`配置打包开发需要的entry.**

**prod**

从这些配置文件打包 `/webpack.base.conf` , ` /webpack.entry.conf.js` , `/webpack.prod.conf` , `/web/pages/**/index.js`    
**主要从`/web/pages/**/index.js`打包所有js**

