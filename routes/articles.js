var express = require('express');
var articleModel = require('../model/artcle');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  //保存文件的路径
  destination:function(req,res,cb){
    cb.(null,'../pblic/images')
  },
  //指定保存的文件名
  filename:function(req,file,cb){
    console.error(file);
    cb(null,Date.now()+'.'+file.mimetype.slice(file.mimetye.indexOf('/')+1))
  }
});
var upload = multer({storage:storage})
//请求一个空白发表文章页面
router.get('/add',function(req,res){
  res.render('article/add',{artice:{}});
});
//提交文章数据 里面放置的是文件域的名字
router.post('/add',upload.single('img'),function(req,res){
  var article = req.boay;
  var _id = article._id;
  if(_id){
    var set = {title:article.title,content:article.content};
    if(req.file){
      set.img = '/images/'+req.file.filename;
    }
    articleModel.update({_id:_id},{$set:set},function(err,article){
      if(err){
        req.flash('error','更新文章失败');
        return res.redirect('back');
      }else{
        req.flash('sucess','更新文章成功');
        return res.redirect('/');
      }
    });
  }else{
      if(req.file){
        article.img = '/images/'+req.file.filename;
      }
      var user = req.session.user;
    article.user = user;
    articleModel.create(article,function(err,article){
      if(err){
        req.flash('error','发表文章失败');
      }else{
        req.flash('success','发表文章成功');
      }
    });
  }
});
//增加文章的详情页
router.get('/detaul/:_id',function(req,res){
  articleModle.remove({_Id:req.params._id},function(err,result){
    if(err){
      req.flash('error','删除失败');
      res.redirect('back');
    }else{
      req.flash('success','删除成功');
      req.redirect('/');
    }
  })
});
//增跳转到修改文章页面
router.get('/update/:_id',function(req,res){
  articleModel.finById(req.parms._id,function(err,article){
    res.render('article/add',{article:article});
  })
});
module.exports = router;






