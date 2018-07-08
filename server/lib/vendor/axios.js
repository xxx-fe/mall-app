const fs = require('fs');
const axios = require('axios');
/**
 * axios 请求数据
 */
module.exports.default = module.exports = async (ctx, options) => {
    let url = options.url;
    //读mock数据
    if (ctx.env === 'development' && ctx.isMockAPI) {
        let mockFilePath = `./mock${url}.json`;
        let existsMockFilePath = await fs.existsSync(mockFilePath);
        if (existsMockFilePath) {
            let data = fs.readFileSync(mockFilePath, 'utf-8');
            return new Promise((resolve, reject) => {
                return resolve(JSON.parse(data));
            });
        }
        else {
            return {
                error: 'no file'
            }
        }
    }
    //请求url
    else {
        options.url = ctx.apiServer + options.url;
        return await axios(options).then(function (res) {
            showInfo('info', res, {
                response: res.data
            });
            return res.data;
        }).catch(function (res) {
            showInfo('warn', res, {
                response: res.response.data
            });
            return {status: res.response.status, error: res.response.data};
        });
    }
};

function showInfo(type, res, option) {
    let defaults = {
        url: res.config.url,
        method: res.request.method
    };
    let options = JSON.stringify(Object.assign({}, defaults, option));
    if (type === 'info') {
        console.info(options);
    }
    else if (type === 'warn') {
        console.warn(options);
    }
}