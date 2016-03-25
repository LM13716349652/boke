var express = require('express');
var userModel = require('../model/user');
var validate = require('../middle/index.js');
var crypto = require('crypto');
//生成一个路由实例
var router = express.Router();
//用户注册 当用户通过get方法请求 /users/reg的时候，执行此回调
router.get('/reg',function(req,res){
  res.render('user/reg');
});
//提交用户注册的表单
router.post('/reg',function(req,res){
  var user = req.body;
  user.avatar = 'https://secure.gravatar.com/avatar/'+md5(user.email);
  user.password = md5(user.password);
  userModel.create(user,function(err,doc){
    if(err){
      req.flash('error',err);
      req.redirect('back');//返回上一个页面
    }else{
      //把保存之后的用户防止到此用户会话的user属性上
      req.session.user = doc;
      req.flash('sussess','注册成功');
      res.redirect('/');
    }
  })
});

//用户登录 当用户通过get方法请求 /users/reg的时候，执行此回调
router.get('/login',function(req,res){
  res.render('user/login');
});

//提交用户登录的表单
router.post('/login',function(req,res){
  var user = req.body;
  user.password = md5(user.password);
  userModel.findOne(user,function(err,user){
    if(err){
      req.flash('error',err);
      return res.redirect('back');
    }else{
      req.session.user=user;
      req.flash('success','登录成功');
      res.redirect('/');
    }
  })
});


//退出登录
router.get('/logout',function(req,res){
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
function md5(str){
  return crypto.createHash('md5')
    .update(str).digest('hex');
}