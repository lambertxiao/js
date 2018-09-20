requirejs.config({
    // 所有模块的查找根路径
    baseUrl: 'scripts/lib',
    // path映射那些不直接放置于baseUrl下的模块名。
    // 设置path时起始位置是相对于baseUrl的，除非该path设置以"/"开头或含有URL协议
    paths: {
        app: '../app',
        jquery: './jquery.min'
    },
    // 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置
    shim: {
        'underscore': {
            exports: '_'
        }
    }
})

require(['app/simple', 'app/math', 'app/func'], function (simple, math, func) {
    console.log(simple)
    console.log(math.add(3, 1))
    console.log(math.sub(3, 1))
    func()
})

require(['jquery'], function ($) {
    $('#app').css('background', '#000');
})

require(['underscore'], function (_) {
    console.log(_.max([9, 1, 2]))
})
