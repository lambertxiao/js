requirejs.config({
    base: 'scripts/lib',
    paths: {
        app: './app'
    },
    shim: {
        'noDefine': {
            exports: 'noDefine'
        }
    }
})

require(['app/simple', 'app/math', 'app/func', 'app/depend-func', 'app/no-define'], function (simple, math, func, dependFunc, noDefine) {
    console.log(simple)
    console.log(math.add(3, 1))
    console.log(math.sub(3, 1))
    func()
    console.log(noDefine)
})
