var mongoose = require('moogoose');
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
var userModel = mongoose.model('user',userSchema);
module.exports = userModel;




