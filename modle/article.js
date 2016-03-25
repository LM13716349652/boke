var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    img:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    creatAt:{type:Date,default:Date.now}
});
var articleModle = mongoose.model('article',articleSchema);
module.exports = articleModle;















