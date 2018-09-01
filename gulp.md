# Gulp 杂记

### 什么是 gulp?

gulp 是一个构建工具，可以通过它自动执行网站开发过程中的公共任务，比如编译 SASS/Less，编译压缩混淆 JavaScript,，合并编译模板和版本控制等。因为 gulp 是基于 Node.js 构建的，所以 gulp 源文件和开发者自己定义的 gulpfile 都被写进 JavaScript 里，前端开发者可以用自己熟悉的语言来编写 gulp 任务。

gulp 本身并不能完成这么多种任务，不过它可以借助 npm 丰富的插件库。开发者可以在 npm 中搜索 gulpplugin 找到想要的插件。例如本文中将要提到的 gulp-cssmin, gulp-jshint, gulp-concat、gulp-inject 等等。

### 为什么选择 gulp？

其实现有的基于 Node.js 的构建工具有很多，比如 Bower，Yeoman，grunt 等。而且自 2013 年 grunt v0.4.0 发布以后，grunt 已经改变了前端的开发方式。那么为什么我们要选 gulp？

gulp 最大的特点是所有的任务都是以 Node.js Stream 的形式处理，构建流程可以由 Stream 之间的 pipe 来定义，省去了把中间文件写到磁盘再读取的过程，而且任务都是默认并行，速度比 grunt 快很多，配置也感觉更省心。

* 易于使用：采用代码优于配置策略，gulp 让简单的事情继续简单，复杂的任务变得可管理。
* 高效：gulp 基于 Node.js 流 Unix 管道连接的方式，不需要往磁盘写中间文件，可以更快地完成构建。
* 高质量：gulp 每个 task 只完成一个任务，提高 task 的重用度。
* 易于学习：gulp 核心 API 约 5 个，开发者能在很短的时间内学会，之后就可以通过管道流来组合自己需要的 task。

### 起步

1. 创建项目，初始化package.json文件，并安装gulp作为开发依赖
    > \$ mkdir gulp-app && npm init
    > $ npm install --save-dev gulp

2. 新建gulpfile.js文件，并写入以下内容
    ```
    var gulp = require('gulp')
    
    gulp.task('default', () => {
        console.log('what the hell')
    })
    ```
3. 命令行执行gulp，会看到输出 'what the hell'

### gulp几个重要的api



### 构建自动化流程

gulp提供了许多可以满足我们工作需求的插件，以下列举部分：

* [gulp-uglify][1]
    
    * 安装
    > $ npm install --save-dev gulp-uglify

    * 配置task
    ```
    gulp.task('default', () => {
      gulp
      .src('src/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
    })

    ```

* [gulp-less][2]
    
    * 安装
    > $ npm install --save-dev gulp-less

    * 配置
    ```
    var less = require('gulp-less')
    
    gulp.task('default', () => {
      gulp.src('src/styles/app.less')
      .pipe(less())
      .pipe(gulp.dest('dist/styles'))
    })
    ```

* [gulp-coffee][3]

    * 安装
    > $ npm install --save-dev gulp-coffee

    * 配置
    ```
    var coffee = require('gulp-coffee')

    gulp.task('default', () => {
      gulp.src('src/scripts/app.coffee').pipe(coffee()).pipe(gulp.dest('dist/scripts'))
    })

    ```
    
* [gulp-clean][4]
    * 安装
    > $ npm install --save-dev gulp-clean

    * 配置
    ```
    var clean = require('gulp-clean')

    gulp.task('clean', () => {
      gulp.src('dist/').pipe(clean())
    })
    ```
    
* [gulp-autoprefixer][5]
    * 安装
    >$ npm install --save-dev gulp-autoprefixer

    * 配置
    ```
    var autoPrefixer = require('gulp-autoprefixer')
    
    gulp.task('css', () => {
      gulp.src('src/styles/app.less').pipe(less()).pipe(autoPrefixer()).pipe(gulp.dest('dist/styles'))
    })
    ```
    
* [browser-sync][6] 拥有实时重载（live-reloading）和 CSS 注入的服务器
    * 安装
    >$ npm install --save-dev browser-sync

    * 配置
    ```
    var gulp = require('gulp')
    var uglify = require('gulp-uglify')
    var less = require('gulp-less')
    var coffee = require('gulp-coffee')
    var clean = require('gulp-clean')
    var autoPrefixer = require('gulp-autoprefixer')
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;
    
    gulp.task('clean', () => {
      gulp.src('dist/').pipe(clean())
    })
    
    gulp.task('coffee', () => {
      gulp.src('src/scripts/*.coffee')
      .pipe(coffee())
      .pipe(uglify())
      .pipe(gulp.dest('dist/scripts'))
      // .pipe(reload({ stream: true }))
    })
    
    gulp.task('less', () => {
      gulp.src('src/styles/app.less')
      .pipe(less())
      .pipe(autoPrefixer())
      .pipe(gulp.dest('dist/styles'))
      .pipe(reload({ stream: true }))
    })
    
    // 监视文件改动并重新载入
    gulp.task('serve', function() {
      browserSync({
        server: {
          baseDir: './'
        }
      });
    
      gulp.watch('src/styles/app.less', ['less']);
      gulp.watch('src/scripts/app.coffee', ['coffee'])
    });
    
    gulp.task('default',['clean', 'coffee', 'less', 'serve'])
    })
    ```

[1]: https://www.npmjs.com/package/gulp-uglify "gulp-uglify"
[2]: https://www.npmjs.com/package/gulp-less "gulp-less"
[3]: https://www.npmjs.com/package/gulp-coffee "gulp-coffee"
[4]: https://www.npmjs.com/package/gulp-clean "gulp-clean"
[5]: https://www.npmjs.com/package/gulp-autoprefixer "autoprefixer"
[6]: http://www.gulpjs.com.cn/docs/recipes/server-with-livereload-and-css-injection/
