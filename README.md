# mall-app


> vue koa 应用脚手架

支持多语言,多页应用,多种MOCK

## Architecture

### 前端

* `样式`:scss.
* `库管理`:npm,bower
* `框架`:vue2.
* `模板引擎`:handlebars4.
* `打包`:webpack4.
* `图标`:iconfont.
* `组件库`:element-ui.

### 中台
* `框架`:koa2, nodejs>=7


## 目录结构

```text
.
├── build                                       # 使用 vue-cli 2.9.3(有修改)
├── config                                      # 使用 vue-cli 2.9.3(有修改)
├── server                                      # 服务端(koa,nodejs)
│    ├── api                                    #     接口
│    ├── controller                             #     控制器
│    ├── lib                                    #     库
│    ├── mock                                   #     模拟数据
│    ├── router                                 #     路由(koa-router,或前端用vue-router)
│    ├── view                                   #     视图
│    ├── server.js                              #     服务端入口
├── dist                                        # 生产目录
├── public                                      # 公共资源(例如访问http://localhost:3333/public/img/bg.jpg)
│    ├── img                                    #     图片
│    └── vendor                                 #     第三方插件
├── web                                         # 前端(vue,js,css...)
│    ├── components                             #     组件
│    ├── directives                             #     指令
│    ├── entry                                  #     入口
│    ├── filters                                #     过滤
│    ├── global                                 #     全局设置
│    ├── mock                                   #     模拟数据
│    ├── pages                                  #     页面                  
│    ├── styles                                 #     样式
│    ├── vendor                                 #     第三方插件
│    ├── webpack.entry.conf.js                  #     入口配置文件
│    ├── webpack.dev.conf.js                    #     开发模式配置文件
│    └── webpack.pord.conf.js                   #     生产模式配置文件
│   config.yml                                  #     通用配置文件,整个脚手架很多功能都与它有关
```

## 安装

``` bash
npm install    # npm 安装
bower install  # bower 安装
```


## 命令

``` bash
npm run dev    # 启动开发模式(dev)
npm run build  # 构建项目
npm run prod   # 启动生产模式(prod)
```

## example

### 1.新建应用路由

* ```/server/router/app/index.js```

```javascript
const page = require('../controller/index');
module.exports = [
    {path: '', ctrl: page.home},
    {path: 'main', ctrl: page.home},
    {path: 'api/list', ctrl: page.list, method: 'post'}
];

```

### 2.新建应用控制器

* ```/server/controller/index.js```

```javascript
const api = require('../api/index');
class page {
    async home(ctx, _next) {
        let locals = {
            title: 'home-page'
        };
        await ctx.render('pages/home', locals);
    }

    async list(ctx, _next) {
        let locals = {
            list: await api.getList(ctx)
        };
        ctx.body = locals;
    }
}
module.exports = new page();
```

### 3.新建应用视图

* ```/server/view/pages/home.hbs```

```handlebars
{{#extend "layout-default"}}          # 使用layout-default布局
    {{#content "head"}}
        {{{parseUrl 'app.css'}}}      # app应用的css,直接引用
    {{/content}}                      # 不需要新建,build时会抽取vue的style成独立的文件.否则生产模式看不到样式.
    {{#content "body"}}
        <div id="home-app"></div>
        {{{parseUrl 'app.js'}}}       # app应用的js(相应webpack.entry)
    {{/content}}
{{/extend}}
```

- `/server/view/layout/**.hbs` 以文件名注册为`handlebars partial`.

#### 引用:

* [handlebars(模板引擎)](https://github.com/wycats/handlebars.js)

* [handlebars-layouts(模板引擎布局helpers)](https://github.com/shannonmoeller/handlebars-layouts)

#### parseUrl

解析url, handlebars自定义helpers.结合ctx.state.appName,根据当前开发环境返回正确的url.

**dev**

`ctx.state.appName='app'`
```javascript
{{{parseUrl 'app.css' 'app.js'}}}
```
↓↓↓
```html
<script web="app.js"></script>
```

`ctx.state.appName=''; 或不设置`   

↓↓↓
```html
<link href="/dist/static/css/app.[chunkhash].css" type="text/css" rel="stylesheet">
<script web="app.js"></script>
```

**prod**
```html
<link href="/dist/static/css/app.[chunkhash].css" type="text/css" rel="stylesheet">
<script web="/dist/static/js/app.[chunkhash].js"></script>
```

**有这种场景** 

如果存在多个app如app1,app2.在控制器就需要设置ctx.state.appName ='app的名字'.否则读取样式会不正确.

### 4.新建应用页面

* ```/web/pages/app/home.vue```

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
            this.$http.post('/api/list').then(response => {
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

* ```/web/pages/app/index.js```

```javascript
import homeApp from './home.vue';
if(document.getElementById('home-app')) {
    new Vue({
        render: h => h(homeApp)
    }).$mount('#home-app');
}
```
**浏览: http://localhost:3333/**


## APPSTATE

整个app的传递信息(ctx.state封装),部分由 ```/config.yml```合成.

* ```/server/view/layout/layout-default.hbs```
```html
<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{title}}</title>
    {{{mountState}}}
    {{{parseUrl 'header.css' 'header.js' }}}
    {{#block "head"}}
    {{/block}}
</head>
<body>
{{#block "body"}}{{/block}}
</body>
</html>
```

```javascript
{{{mountState}}}   //将ctx.state挂载到window.APPSTATE
```
↓↓↓
```javascript
<script type="text/javascript">
    window.APPSTATE = {"locale":"zh","publicServer":"","isMockAPI":true,"appName":"app"}
</script>
```

查看页面源代码一般会看到以上代码.


## webpack配置文件
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
        'app': './web/pages/app/index.js',
    },
    //devtool: '#cheap-module-eval-source-map'
    ...
};
```

合并后的实际入口(多入口)

```javascript
entry: {
    'app': [
        './web/entry/header.js', 
        './web/entry/footer.js' , 
        './web/pages/app/index.js' , 
        'webpack-hot-client/client'
    ],
    'app2': [
        './web/entry/header.js', 
        './web/entry/footer.js' , 
        './web/pages/app/index.js' , 
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
        publicPath: 'http://localhost:3333/app'
    })
    ...
};
```

合并后的实际入口(多入口)

```javascript
entry: {
    'app': ['./web/pages/app/index.js'],
    'app2': ['./web/pages/app2/index.js'],
    header: ['./web/entry/header.js'],
    footer: ['./web/entry/footer.js']
}
```

`/web/pages/**/index.js` 都是app. 这里,`app`, `app2` 2个app,甚至更多,即多页应用.

`app`, `app2`,分别叫主app,其他app,还可以有另外app...等. 名字随你.
 
 **项目只保留1个app,多app需另建.**

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

`isMockAPI:true`

#### 引用:

* [mockjs](http://mockjs.com/)

在页面渲染时在`/header/index.js`前插入`/public/vender/mock-min.js`.

```javascript
<script src="/public/vendor/mockjs/dist/mock-min.js"></script><script src="header.js"></script>
```

### 1.服务端Mock

#### 1.1 编写/server/mock/**/.json文件.

* ```/server/mock/api/list.json```

现在请求 `/api/list`

`isMockAPI:true`

服务端返回 `/server/mock/api/list.json`.

`isMockAPI:false`

服务端返回 `http://localhost:3334/api/list`.

### 2.前端Mock

#### 2.1 编写/web/mock/**/index.js文件.

* ```/web/mock/index.js``` 

```javascript
Mock.mock('/api/list', 'post', function () {
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
**优先级:前端Mock文件>后端Mock文件.否则报500.**

## 打包

* ```/config.yml```

```yml
...
#webpack构建路径(prod模式有效)
buildPath:
    # name entry路径
    # isIndexEntry 是否使用index.js作为webpack.entry.
    # isIndexEntry = true
    # './web/pages/app/index.js'  --> /dist/static/js/app[chunkhash].js
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

否则,如果有`/web/pages/app/index.js`,`/web/pages/app2/index.js`,`/web/pages/app3/index.js`.就会最终构建出以排序最后的`index.js`.

所以,`/web/pages/**`,只要目录不重名,并且以`index.js`作为入口.就不会冲突.


**dev**

从这些配置文件打包 `/webpack.base.conf` , `/webpack.entry.conf.js` , `/webpack.dev.conf.js`    
**主要从`/webpack.dev.conf.js`配置打包开发需要的entry.**

**prod**

从这些配置文件打包 `/webpack.base.conf` , ` /webpack.entry.conf.js` , `/webpack.prod.conf` , `/web/pages/**/index.js`    
**主要从`/web/pages/**/index.js`打包所有js.**

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

## 中台自定义属性


### ctx.axios

发起请求方法.

### ctx.logger

日志方法.

### ctx.setState

设置ctx.state通用属性.

### ctx.router

全部路由.


### ctx其他属性

根据开发环境合并所有config.yml的属性.


## 路由

根据 * ```/server/router/**/**.js``` 配置生成路由. 

*  obj.path 路由路径    
*  obj.ctrl 路由控制器    
*  obj.method 路由方法    
*  obj.isAuthenticated 路由是否需要权限    
   假设逻辑为真重定向到登录页面    
*  obj.noContactToRoute 不合并到ctx.router  
   每个请求都会经过```/server/middleware/state-context.js```中间件.但只会匹配不带/api的页面路由.    
   noContactToRoute:true表示不经过这个中间件.因为```state-context```中间件根据ctx.router判断.
   