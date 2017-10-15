# machine_manager

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 模板框架包含以下内容

* 多页结构，pages下的每个页面代表一个独立的单页（目前未支持子文件夹划分）
* 支持主题配置，src/style/theme.less定义了全局的变量，无需每个组件单独引入
* 全局的http请求方法
* 移动端rem适配
* 其他工具方法