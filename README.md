# mall-app

> 一个前端开发脚手架


## 技术栈
vue2 + koa2 + webpack2 + ES6/7 + handlebars + bower

**运行环境中Nodejs的版本至少是7**


## 目录结构
```text
.
├── build                                       // webpack配置文件(vue-cli生成)
├── config                                      // 项目打包路径(vue-cli生成)
├── app                                         // koa前端服务器
├── dist                                        // 生产目录
├── public                                      // 公共资源目录
├── src                                         // 源码目录

```

## 命令
``` bash
npm install    //安装
npm run dev    //启动开发模式
npm run build  //构建项目
npm run prod   //启动生产模式
```

## default.hbs
* ```/app/view/layout/default.hbs``` 布局默认模板
```html
<!doctype html>
<html>
<head>
    <script type="text/javascript" src="/header.js"></script>
    {{#block "head"}}
        <title>{{title}}</title>
    {{/block}}
</head>
<body>
    {{#block "body"}}
        模板body
    {{/block}}
    <div id="app"></div>
    <script type="text/javascript" src="/app.js"></script>
    {{#block "footer"}}
        模板footer
    {{/block}}
    <script type="text/javascript" src="/footer.js"></script>
</body>
</html>

```

## 热加载文件
* ```/header.js``` 头部打包js
* ```/app.js``` app打包js 或者叫业务打包js
* ```/footer.js``` 底部打包js

生产模式会根据实际情况替换为正确的js/css.保证开发时替换css/js都能立即看到结果.

## webpack.options.conf.js
```javaScript
module.exports ={
    entry: {
        header: './public/common/header.js',
        app: './src/pages/home/home.js',
        footer: './public/common/footer.js',
    }
}
```
新建一个webpack.options.conf.js文件(不上传到仓库),作为当前app的入口.
