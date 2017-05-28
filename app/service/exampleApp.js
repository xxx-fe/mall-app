class exampleAppService {
    constructor(ctx) {
        this.ctx = ctx;
    }

    getList() {
        return [
            {
                name: 'webpack',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: '是前端资源模块化管理和打包工具Webpack 是当下最热门的前端资源模块化管理和打包工具。' +
                '它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。'
            },
            {
                name: 'w3schools',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: 'w3schools.com 是最受欢迎的前端技术教程网站，但是国内用户一直不能访问，并且国内的中文翻译版本十分陈旧。因此做了个镜像，希望英文好的同学直接去看原版教程吧！'
            },
            {
                name: 'gulp.js',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: '基于流的自动化构建工具。gulp.js - 基于流(stream)的自动化构建工具。Grunt ' +
                '采用配置文件的方式执行任务，而 Gulp 一切都通过代码实现。'
            },
            {
                name: 'less',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: 'LESS为CSS赋予了动态语言的特性，如变量、继承、运算、函数。LESS既可以在客户端上运行 (支持IE 6+、Webkit、Firefox)，也可以借助Node.js或者Rhino在服务端运行。'
            },
            {
                name: 'Lodash',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: 'Lodash 是一个具有一致接口、模块化、高性能等特性的 JavaScript 工具库。比相同功能的 Underscore.js 使用更广泛。'
            },
            {
                name: 'Flat UI',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: 'Flat UI是基于Bootstrap做的Metro化改造，由Designmodo提供。Flat UI包含了很多Bootstrap提供的组件，但是外观更加漂亮。在此强烈推荐！'
            },
            {
                name: 'Preboot',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: 'Preboot是一组用LESS语法书写的混合（mixin）和变量（variable）的集合，目的是辅助用户书写更优美的CSS。Bootstrap的前身就是Preboot。'
            },
            {
                name: 'Chart.js',
                imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=50&bg=ff6699&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
                description: 'Chart.js是一个简单、面向对象、为设计者和开发者准备的图表绘制工具库。'
            }
        ];
    }
}
export default exampleAppService;
