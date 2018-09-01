# Webpack 杂记

## 介绍
首先我们要消除一个常见的误解。webpack 是一个模块打包器(module bundler)（例如，Browserify 或 Brunch）。它不是一个任务执行器(task runner)（例如，Make, Grunt 或者 Gulp ）。任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于打包器(bundler)，任务执行器则聚焦在偏重上层的问题上面。你可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。

打包器(bundler)帮助您取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以压缩、拆分 chunk 和懒加载，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。

## 起步

* 安装
    > $ npm install --save-dev webpack

* 新建webpack.config.js配置文件，并写入以下内容
   
    ```
    module.exports = {
    　　entry: './src/scripts/app.js',
    　　output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist/scripts')
    　　}
    }
    ```
* 执行编译
    > $ ./node_modules/.bin/webpack webpack.config.js

* 使用npm脚本来方便启动webpack，在package.json中加入:
    
    ```
    {
      "scripts": {
        "build": "webpack"
      },
    }
    ```

    现在，可以使用 npm run build 命令，来替代我们之前用到的较长命令。注意，使用 npm 的 scripts，我们可以通过模块名，来引用本地安装的 npm 包，而不是写出完整路径。这是大多数基于 npm 的项目遵循的标准，允许我们直接调用 webpack，而不是去调用 ./node_modules/.bin/webpack。

## 资源管理

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build` 目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以_明确表述它自身的依赖，我们将避免打包未使用的模块。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。让我们从 CSS 开始起步，或许你可能已经熟悉了这个设置过程。

---

### 加载css

* 为了从 JavaScript 模块中 import 一个 CSS 文件，需要安装加载css的插件
    > $ npm install --save-dev style-loader css-loader

* 在 module 配置中 添加 style-loader 和 css-loader
    ```
    module.exports = {
      module: {
        // 通过匹配不同正则表达式的，调用相应的loader
        rules: [
          {
            // webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    }
    ```
* 在app.js中通过import引入css文件
    
    ```
    import '../styles/app.css';
    ```

---

### 加载图片

* 安装读取文件的loader
    > $ npm install --save-dev file-loader

* 在app.js文件中引入图片
    > $ import Icon from '../images/th.jpeg'

---

### 加载数据

* 安装csv和xml加载器
    > $ npm install --save-dev csv-loader xml-loader

* 配置
    ```
    module: {
      rules: [
        {
          test: /\.(csv|tsv)$/,
          use: ['csv-loader']
        },
        {
          test: /\.xml$/,
          use: ['xml-loader']
        }
      ]
    }
    ```

## 管理输出

* html页面自动引入资源

目前，我们在 index.html 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始对文件名使用哈希(hash)]并输出多个 bundle，手动地对 index.html 文件进行管理，一切就会变得困难起来。然而，可以通过一些插件，会使这个过程更容易操控。

```
const path = require('path')

module.exports = {
  entry: {
    app: './src/scripts/app.js',
    common: './src/scripts/common.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/scripts')
  }
}
```

当有多个入口文件时，会编译成多个bundle.js文件，每次改动都需要在页面中手动引入。此时，需要用到 `html-webpack-plugin

> $ npm install --save-dev html-webpack-plugin

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/scripts/app.js',
    common: './src/scripts/common.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hi webpack'
    })
  ]
}

```

* 清理旧的输出文件

> $ npm install clean-webpack-plugin --save-dev

```
const CleanWebpackPlugin = require('clean-webpack-plugin');

plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hi webpack'
    })
  ]
```

## 开发实践

* 使用 `source map` 定位错误
```
module.exports = {
   devtool: 'inline-source-map',
}
```

* 使用webpack-dev-server，为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

    > $ npm install --save-dev webpack-dev-server

    修改配置文件，告诉开发服务器(dev server)，在哪里查找文件
    
    ```
    module.exports = {
        devServer: {
            contentBase: './dist'
        },
    }
    ```
    以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

    在package.json中添加一个脚本配置
    
    ```
    "scripts": {
      "start": "webpack-dev-server --open"
    }
    ```

## 代码分离
  代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

* 入口起点：使用 entry 配置手动地分离代码。
* 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
* 动态导入：通过模块的内联函数调用来分离代码。

