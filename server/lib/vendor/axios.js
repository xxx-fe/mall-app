const fs = require('fs');
const axios = require('axios');
/**
 * axios 请求数据
 */
module.exports.default = module.exports = async (ctx, options) => {
    let url = options.url;
    //读mock数据
    if (ctx.app.context.env === 'development' && ctx.app.context.isMockAPI) {
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
            return res.data;
        }).catch(function (error) {
            console.error(error.response.data);
            return {status: error.response.status, error: error.response.data};
        });
    }
};