import fs from 'fs';
import nodePath from 'path';
const common = {
    /**
     *  遍历文件,文件夹
     */
    readDirSync: function (path, callback) {
        var pa = fs.readdirSync(path);
        pa.forEach(function (ele, index) {
            var info = fs.statSync(path + "/" + ele);
            var isDirectory = info.isDirectory();
            if (isDirectory) {
                callback(ele, isDirectory, nodePath.join(path, ele));
                common.readDirSync(nodePath.join(path, ele), callback);
            } else {
                callback(ele, isDirectory, nodePath.join(path, ele));
            }
        })
    }
}
export default common;
