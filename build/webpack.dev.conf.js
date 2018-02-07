'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');

// 这里模仿请求本地数据
const express = require('express');
const app = express(); //  从这后面开始加

let appData = require('../src/data/data.json');

const banner = appData.home.banner;    // 首页获取对应的首页banner图片
const aboutUs = appData.home.aboutUs;     // 首页获取对应的首页公司简介
const ourProducts = appData.home.ourProducts;     // 首页获取对应的首页公司产品
const ourAdvantages = appData.home.ourAdvantages;   // 首页产品优势
const ourCases = appData.home.ourCases;   // 首页合作案例
const contactUs = appData.home.contactUs;   // 首页合作案例

const copyInfor = appData.publicFooter;   // 公共底部信息


const smartBanner = appData.faceGoSmart.banner;   // faceGoSmart 页面
const smartIntroduce = appData.faceGoSmart.introduce;
const smartFunciton = appData.faceGoSmart.features;
const smartAdvantages = appData.faceGoSmart.advantages;
const smartApplication = appData.faceGoSmart.applicationCases;
const smartDownload = appData.faceGoSmart.download;
const smartContact = appData.faceGoSmart.contactUs;

const cubeBanner = appData.faceGoCube.banner;   // faceGoCube 页面
const cubeIntroduce = appData.faceGoCube.introduce;
const cubeFunciton = appData.faceGoCube.features;
const cubeAdvantages = appData.faceGoCube.advantages;
const cubeApplication = appData.faceGoCube.applicationCases;
const cubeDownload = appData.faceGoCube.download;
const cubeContact = appData.faceGoCube.contactUs;

const recoBanner = appData.faceRecognise.banner;   // faceGoCube
const recoIntroduce = appData.faceRecognise.introduce;
const recoFunciton = appData.faceRecognise.features;
const recoAdvantages = appData.faceRecognise.advantages;
const recoApplication = appData.faceRecognise.applicationCases;
const recoDownload = appData.faceRecognise.download;
const recoContact = appData.faceRecognise.contactUs;

const sdkBanner = appData.businessSDK.banner;   // faceGosdk
const sdkIntroduce = appData.businessSDK.introduce;
const sdkFunciton = appData.businessSDK.features;
const sdkAdvantages = appData.businessSDK.advantages;
const sdkApplication = appData.businessSDK.applicationCases;
const sdkDownload = appData.businessSDK.download;
const sdkContact = appData.businessSDK.contactUs;

const secCaseBanner = appData.clientCase.securityCase.banner;   // 安防案例
const secCaseTypical = appData.clientCase.securityCase.typical;
const secCaseMore = appData.clientCase.securityCase.moreCase;

const finCaseBanner = appData.clientCase.financialCase.banner;   // 金融案例
const finCaseTypical = appData.clientCase.financialCase.typical;
const finCaseMore = appData.clientCase.financialCase.moreCase;

const othCaseBanner = appData.clientCase.otherCase.banner;   // 其他案例
const othCaseTypical = appData.clientCase.otherCase.typical;
const othCaseMore = appData.clientCase.otherCase.moreCase;

const bankCardBanner = appData.coreTechnology.bankCardRecog.banner;   //  银行卡识别
const bankCardIntroduce = appData.coreTechnology.bankCardRecog.introduce;
const bankCardFunciton = appData.coreTechnology.bankCardRecog.features;
const bankCardAdvantages = appData.coreTechnology.bankCardRecog.advantages;
const bankCardApplication = appData.coreTechnology.bankCardRecog.useCases;


// 接口地址
let apiRoutes = express.Router();
app.use('/api', apiRoutes);

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // 这里类似页面这样写请求
    before(app) {
      // 首页
      app.get('/api/banner', (req, res) => {
        res.json({
          status: 0,
          data: banner
        })
      });
      app.get('/api/aboutUs', (req, res) => {
        res.json({
          status: 0,
          data: aboutUs
        })
      });
      app.get('/api/ourProducts', (req, res) => {
        res.json({
          status: 0,
          data: ourProducts
        })
      });
      app.get('/api/ourAdvantages', (req, res) => {
        res.json({
          status: 0,
          data: ourAdvantages
        })
      });
      app.get('/api/ourCases', (req, res) => {
        res.json({
          status: 0,
          data: ourCases
        })
      });
      app.get('/api/contactUs', (req, res) => {
        res.json({
          status: 0,
          data: contactUs
        })
      });
      app.get('/api/copyInfor', (req, res) => {
        res.json({
          status: 0,
          data: copyInfor
        })
      });

      //   facegosmart 页面
      app.get('/api/smartBanner', (req, res) => {
        res.json({
          status: 0,
          data: smartBanner
        })
      });
      app.get('/api/smartIntro', (req, res) => {
        res.json({
          status: 0,
          data: smartIntroduce
        })
      });
      app.get('/api/smartFun', (req, res) => {
        res.json({
          status: 0,
          data: smartFunciton
        })
      });
      app.get('/api/smartAdvan', (req, res) => {
        res.json({
          status: 0,
          data: smartAdvantages
        })
      });
      app.get('/api/smartAppli', (req, res) => {
        res.json({
          status: 0,
          data: smartApplication
        })
      });
      app.get('/api/smartDown', (req, res) => {
        res.json({
          status: 0,
          data: smartDownload
        })
      });
      app.get('/api/smartCon', (req, res) => {
        res.json({
          status: 0,
          data: smartContact
        })
      });

      //   facegoCube 页面
      app.get('/api/cubeBanner', (req, res) => {
        res.json({
          status: 0,
          data: cubeBanner
        })
      });
      app.get('/api/cubeIntro', (req, res) => {
        res.json({
          status: 0,
          data: cubeIntroduce
        })
      });
      app.get('/api/cubeFun', (req, res) => {
        res.json({
          status: 0,
          data: cubeFunciton
        })
      });
      app.get('/api/cubeAdvan', (req, res) => {
        res.json({
          status: 0,
          data: cubeAdvantages
        })
      });
      app.get('/api/cubeAppli', (req, res) => {
        res.json({
          status: 0,
          data: cubeApplication
        })
      });
      app.get('/api/cubeDown', (req, res) => {
        res.json({
          status: 0,
          data: cubeDownload
        })
      });
      app.get('/api/cubeCon', (req, res) => {
        res.json({
          status: 0,
          data: cubeContact
        })
      });

      //   人脸识别引擎页面
      app.get('/api/recoBanner', (req, res) => {
        res.json({
          status: 0,
          data: recoBanner
        })
      });
      app.get('/api/recoIntro', (req, res) => {
        res.json({
          status: 0,
          data: recoIntroduce
        })
      });
      app.get('/api/recoFun', (req, res) => {
        res.json({
          status: 0,
          data: recoFunciton
        })
      });
      app.get('/api/recoAdvan', (req, res) => {
        res.json({
          status: 0,
          data: recoAdvantages
        })
      });
      app.get('/api/recoAppli', (req, res) => {
        res.json({
          status: 0,
          data: recoApplication
        })
      });
      app.get('/api/recoDown', (req, res) => {
        res.json({
          status: 0,
          data: recoDownload
        })
      });
      app.get('/api/recoCon', (req, res) => {
        res.json({
          status: 0,
          data: recoContact
        })
      });

      //   商用SDK 页面
      app.get('/api/sdkBanner', (req, res) => {
        res.json({
          status: 0,
          data: sdkBanner
        })
      });
      app.get('/api/sdkIntro', (req, res) => {
        res.json({
          status: 0,
          data: sdkIntroduce
        })
      });
      app.get('/api/sdkFun', (req, res) => {
        res.json({
          status: 0,
          data: sdkFunciton
        })
      });
      app.get('/api/sdkAdvan', (req, res) => {
        res.json({
          status: 0,
          data: sdkAdvantages
        })
      });
      app.get('/api/sdkAppli', (req, res) => {
        res.json({
          status: 0,
          data: sdkApplication
        })
      });
      app.get('/api/sdkDown', (req, res) => {
        res.json({
          status: 0,
          data: sdkDownload
        })
      });
      app.get('/api/sdkCon', (req, res) => {
        res.json({
          status: 0,
          data: sdkContact
        })
      });

      // 安防
      app.get('/api/secCaseBanner', (req, res) => {
        res.json({
          status: 0,
          data: secCaseBanner
        })
      });
      app.get('/api/secCaseTypical', (req, res) => {
        res.json({
          status: 0,
          data: secCaseTypical
        })
      });
      app.get('/api/secCaseMore', (req, res) => {
        res.json({
          status: 0,
          data: secCaseMore
        })
      });

      //  金融
      app.get('/api/finCaseBanner', (req, res) => {
        res.json({
          status: 0,
          data: finCaseBanner
        })
      });
      app.get('/api/finCaseTypical', (req, res) => {
        res.json({
          status: 0,
          data: finCaseTypical
        })
      });
      app.get('/api/finCaseMore', (req, res) => {
        res.json({
          status: 0,
          data: finCaseMore
        })
      });

      //  其他
      app.get('/api/othCaseBanner', (req, res) => {
        res.json({
          status: 0,
          data: othCaseBanner
        })
      });
      app.get('/api/othCaseTypical', (req, res) => {
        res.json({
          status: 0,
          data: othCaseTypical
        })
      });
      app.get('/api/othCaseMore', (req, res) => {
        res.json({
          status: 0,
          data: othCaseMore
        })
      });

      // 银行卡识别
      app.get('/api/bankCardBanner', (req, res) => {
        res.json({
          status: 0,
          data: bankCardBanner
        })
      });
      app.get('/api/bankCardIntro', (req, res) => {
        res.json({
          status: 0,
          data: bankCardIntroduce
        })
      });
      app.get('/api/bankCardFun', (req, res) => {
        res.json({
          status: 0,
          data: bankCardFunciton
        })
      });
      app.get('/api/bankCardAdvan', (req, res) => {
        res.json({
          status: 0,
          data: bankCardAdvantages
        })
      });
      app.get('/api/bankCardAppli', (req, res) => {
        res.json({
          status: 0,
          data: bankCardApplication
        })
      });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: '云从能力引擎开放平台'
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
