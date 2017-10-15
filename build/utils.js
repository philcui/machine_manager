'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', {globalVars:getLessVariables(config.themePath)}),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

//多页处理
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require('glob')
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_NAME = '../src/pages'
// 用于做相应的merge处理
var merge = require('webpack-merge')

//多页入口
exports.getEntry = function (path) {
  let entities = {};
  glob.sync(path).forEach(function (entity) {
    let moduleName = entity.split('/').slice(-2,-1);
    entities[moduleName] = entity
  });
  // eg: { main: './src/module/index/main.js', test: './src/module/group/test/main.js' }
  return entities;
};

exports.getplugin = function () {
  var pluginList = []
  let pages = module.exports.getEntry('./src/pages/**/*.html');
  for (let page in pages) {
    let filename = "index.html";
    if (page !== 'index') {
      filename = page+"/index.html";
    }
    pluginList.push(new HtmlWebpackPlugin({
      filename: filename,
      template: pages[page],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', page]
    }));
  }
  return pluginList
}

//主题配置
const fs = require('fs')
function getLessVariables (file) {
  var themeContent = fs.readFileSync(file, 'utf-8')
  var variables = {}
  themeContent.split('\n').forEach(function (item) {
    if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
      return
    }
    var _pair = item.split(':')
    if (_pair.length < 2) return
    var key = _pair[0].replace('\r', '').replace('@', '')
    if (!key) return
    var value = _pair[1].replace(';', '').replace('\r', '').replace(/^\s+|\s+$/g, '')
    variables[key] = value
  })
  return variables
}

