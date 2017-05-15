#mallapp

> 一个前端开发脚手架

##技术栈
vue2 + koa2 + webpack2 + ES6/7 + handlebars  

**运行环境中Nodejs的版本至少是7**


##目录结构
```text
...
```

##运行
``` bash
npm install  //安装
npm run app  //启动开发模式
```

##webpack.options.conf.js
```JavaScript
module.exports ={
    entry: {
        app: './src/pages/about/about.js'
    }
}
```
新建一个webpack.options.conf.js文件(不上传到仓库),作为当前应用开发的入口.
