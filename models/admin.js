var db = require('./manageDB');

exports.findAll = function (callback)
{
    db.executeQuery("select * from banhang", function (err, data){
        callback(err, data);
    });
}
exports.create = function(admin, callback){
    db.executeQuery("INSERT INTO `qldanhsach`.`banhang` SET ?", admin, callback);
}

exports.delete = function (adminId, callback) {
    db.executeQuery("DELETE from `qldanhsach`.`banhang` WHERE masp = ?",adminId,callback);
}
exports.update = function (admin, callback) {
    db.executeQuery("update `qldanhsach`.`banhang` set ? where `masp` = ?;",[admin, admin.id], callback);
}
exports.findOne = function (adminId, callback) {
    db.executeQuery("select * from `qldanhsach`.`banhang` where masp=?", adminId, callback);
}