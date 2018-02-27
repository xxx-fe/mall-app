var fs = require('fs');
var nodePath = require('path');
/**
 * 遍历文件,文件夹
 */
module.exports.default = module.exports = function readDirSync(path, callback) {
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        let info = fs.statSync(path + "/" + ele);
        let isDirectory = info.isDirectory();
        if (isDirectory) {
            callback(ele, isDirectory, nodePath.join(path, ele));
            readDirSync(nodePath.join(path, ele), callback);
        } else {
            callback(ele, isDirectory, nodePath.join(path, ele));
        }
    })
};
