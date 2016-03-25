var express = require('express');
var articlModel = require('../model/article');
var markdown = require('markdown').markdown;
//这是一个路由的实例
var router = express.Router();
router.use(function(req,res,next){
  console.log('user');
  next();
});
//当用户访问/的时候，执行对应的回调函数
router.get('/',function(req,res,next){
  //用数据渲染模板 从 session
  //第二个参数对象最后会合并到res.local对象上，，并渲染模板
  //先配置参数，然后在执行查询
  //我们查出来的是user是ID，需要通过populate转成对象
  articlModel.find().populate('user').exec(function(err,artcles){
    if(err){
      req.flash('error',error);
      return res.redirect('/');
    }
    artcles.forEach(function(article){
      article.content = markdown.toHTML(article.content);
    });
    res.render('index',{artcles:artcles});
  })
});

module.exports = router;






