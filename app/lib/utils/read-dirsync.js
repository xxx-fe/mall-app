import fs from 'fs';
import nodePath from 'path';
/**
 * 遍历文件,文件夹
 */
export const readDirSync = (path, callback) => {
    let pa = fs.readdirSync(path);
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
