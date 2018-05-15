var db = require('./manageDB');

exports.findAll = function (callback)
{
    db.executeQuery("select * from loaisanpham", function (err, data){
        callback(err, data);
    });
}
exports.create = function(loaisanpham, callback){
    db.executeQuery("INSERT INTO `qldanhsach`.`loaisanpham` SET ?", loaisanpham, callback);
}

exports.delete = function (loaisanphamId, callback) {
    db.executeQuery("DELETE from `qldanhsach`.`loaisanpham` WHERE id = ?",loaisanphamId,callback);
}
exports.update = function (loaisanpham, callback) {
    db.executeQuery("update `qldanhsach`.`loaisanpham` set ? where `id` = ?;",[loaisanpham, loaisanpham.id], callback);
}
exports.findOne = function (loaisanphamId, callback) {
    db.executeQuery("select * from `qldanhsach`.`loaisanpham` where id=?", loaisanphamId, callback);
}