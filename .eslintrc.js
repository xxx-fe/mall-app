// module.exports = {
//     root: true,
//     parser: 'babel-eslint',
//     globals: {
//         jQuery: true,
//         Vue: true,
//         $: true
//     },
//     extends: 'airbnb-base',
//     env: {
//         node: true,
//         browser: true
//     },
//     plugins: [
//         'html',
//         'jsdoc',
//         'require-jsdoc'
//     ],
//     parserOptions: {
//         sourceType: 'module'
//     },
//     settings: {
//         'import/resolver': {
//             webpack: {
//                 config: 'build/webpack.base.conf.js'
//             }
//         }
//     },
//     rules: {
//         /*
//             'off' 或 0 - 关闭规则
//             'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
//             'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
//         */
//         'import/extensions': [
//             'error',
//             'always',
//             {
//                 'vue': 'never',
//                 'js': 'never'
//             }
//         ],
//         // allow optionalDependencies
//         'import/no-extraneous-dependencies': [
//             'error',
//             {
//                 'optionalDependencies': [
//                     'test/unit/index.js'
//                 ]
//             }
//         ],
//         // allow debugger during development
//         'no-debugger': process.env.NODE_ENV==='production'?2:0,
//
//         'strict': [
//             2,
//             'global'
//         ],
//         'indent': [ //缩进
//             'error',
//             4 //4个空格 数字表示空格数量，或者使用Tabs
//         ],
//         'linebreak-style': 0, //换行符检测  因为在linux macos 会不一样 ，所以这里关闭
//         'quotes': [ //引号
//             'error',
//             'single', //单引号
//             {
//                 'allowTemplateLiterals': true
//             }
//         ],
//         'semi': [
//             'error',
//             'always'
//         ],
//         "no-new": 0,
//         'no-console': 0, //不允许使用console  0表示关闭这个检测
//         'no-alert': 0, //不允许使用alert  这里关闭检测
//         'comma-dangle': 0, //var foo={a:1,} 要求或禁止末尾逗号   这里关闭验证
//         'func-names': 0, // function后要有名字 foo={init: function init()}  这里关闭验证
//         'prefer-arrow-callback': 0, //回调函数要使用箭头函数 这里关闭验证
//         'no-plusplus': 0, //不允许使用++ -- 而是i+=1  这里关闭验证
//         'keyword-spacing': 0, //关键词前后需要用空格  if () else {}  这里关闭验证
//         'key-spacing': 0, //强制在对象字面量的键和值之间使用一致的空格 这里关闭验证
//         'comma-spacing': 0, //强制在逗号周围使用空格 这里关闭验证
//         'camelcase': 0, //驼峰写法 因为有出现下划线的命名，所以这里关闭验证
//         'object-shorthand': 0, //要求对象字面量简写语法 这里关闭验证
//         'new-cap': 0, //要求构造函数首字母大写 new jsLib.base.Swiper  这里关闭验证
//         'no-else-return': 0, //禁止在 else 前有 return 这里关闭验证
//         // 'no-unused-expressions': 0, //禁止未使用过的表达式  这里关闭验证
//         'no-nested-ternary': 0, //禁止使用嵌套的三元表达式 这里关闭验证
//         'one-var': 0, //强制函数中的变量在一起声明或分开声明 这里关闭验证
//         'space-before-function-paren': 0, //要求匿名函数的 function 关键字后面有一个空格 这里关闭验证
//         'no-underscore-dangle': 0, //禁止标识符中有悬空下划线(不允许下划线开头的变量命名)  这里关闭验证
//         'no-param-reassign': [
//             2,
//             {
//                 'props': false
//             }
//         ],
//         'class-methods-use-this': 0, //class 里面的方法  一定要用到this
//         'eol-last': 0, //最后一行需要回车（换行，多一行）
//         'arrow-body-style': 0, //要求箭头函数体使用大括号
//         'spaced-comment': 0, //注释需要 空格 /* sdfsd */
//         'no-multi-spaces': 0, //不允许多个空格  var a = 'b'; 错误: var a =  'b';
//         'space-before-blocks': 0, //快作用域 之前空格 if(1) {}  错误 if(1){}
//         'no-script-url': 0, //不允许url使用 script 脚本
//         'space-infix-ops': 0, //判断之间必须空格  a > b  错误 a>b or  a >b
//         'prefer-template': 0, //强制使用es6模板  `a ${b}` 错误 'a'+b
//         'no-useless-constructor': 0, //class 里使用 constructor必须先定义
//         'max-len': 0, //检测每行最大长度  默认80  这里取消是因为jsx里面一行通常很长
//
//         'no-cond-assign': 0, //禁止在条件语句中出现赋值操作符  这里取消验证
//         'no-unused-vars': 0, //不允许定义变量却未使用
//         'no-restricted-syntax': 0, //禁止使用特定的语法 这里取消验证
//         'import/newline-after-import': 0, //引入模块后需要新一行（空的）  这里取消验证
//         'dot-notation': 0, //要求使用点号，对象的属性使用中要 obj.a 而不是obj['a'] 这里取消验证
//         'guard-for-in': 0, //要求 for-in 循环中有一个 if 语句 这里取消验证
//
//
//         'valid-jsdoc': [ //jsdoc 规则
//             2,
//             {
//                 'requireReturnDescription': false
//             }
//         ],
//         'jsdoc/require-param-type': 1,
//         'jsdoc/check-tag-names': 1,
//         'jsdoc/require-hyphen-before-param-description': 0, //在参数描述前使用连字符-  这里取消
//         'jsdoc/check-param-names': 1,
//         'jsdoc/check-types': 1,
//         'jsdoc/require-param': 1, //参数(必写，如果有参数情况下)
//         'jsdoc/require-returns-type': 1, //@returns 类型 必写
//         'jsdoc/newline-after-description': 1, //描述后要换行
//         'jsdoc/require-description-complete-sentence': 0, //在描述后要用'.'(英文句号)结束 这里取消
//         'jsdoc/require-param-description': 2, //参数描述(必写，如果有参数情况下)
//         'jsdoc/require-returns-description': 0, //注释中要填写@returns 描述 这里取消
//
//         /* 针对node start */
//         'require-yield': 0, //禁用函数内没有yield的 generator 函数 因为在使用koa时 yield 被抽离到公共，所以这里取消验证
//         'generator-star-spacing': 0, //强制 generator 函数中 * 号周围有空格 这里取消验证
//         'object-curly-spacing': 0, //强制在花括号中使用一致的空格 这里取消验证
//         'global-require': 0, //强制在模块顶部调用 这里取消验证
//         'import/no-dynamic-require': 0 //禁止使用动态请求 require(mod)//mod 为变量  这种情况是不允许的，所以这里取消验证
//         /* 针对node end */
//     }
// };
