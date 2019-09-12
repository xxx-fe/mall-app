const fs = require('fs');
const axios = require('axios');
/**
 * axios 请求数据
 */
module.exports.default = module.exports = async (ctx, options, isReturnFullResponse) => {
    let url = options.url;
    //读mock数据
    if (ctx.env === 'development' && ctx.isMockAPI) {
        let mockFilePath = `./server/mock${url}.json`;
        let existsMockFilePath = await fs.existsSync(mockFilePath);
        if (existsMockFilePath) {
            let data = fs.readFileSync(mockFilePath, 'utf-8');
            return new Promise((resolve, reject) => {
                return resolve(JSON.parse(data));
            });
        } else {
            return {
                error: 'no file'
            }
        }
    }
    //请求url
    else {
        options.url = ctx.apiServer + options.url;
        options.headers = {
            'content-type': 'application/json;charset=utf-8'
        };
        if (ctx.headers.cookie) {
            options.headers.cookie = ctx.headers.cookie;
        }
        return await axios(options).then(function (res) {
            showInfo(ctx, 'info', res, {
                params: ctx.params,
                response: res.data
            });
            let setCookie = res.headers["set-cookie"];
            if (setCookie) {
                ctx.res.setHeader('Set-Cookie', setCookie);
            }
            if (isReturnFullResponse) {
                return res;
            } else {
                return res.data;
            }
        }).catch(function (res) {
            //服务器错误
            if (res.response) {
                showInfo(ctx, 'error', res, {
                    params: ctx.params,
                    response: res.response.data,
                });
                if (res.response.status === 500) {
                    ctx.throw(500);
                } else if (res.response.status === 401) {
                    ctx.throw(401);
                } else {
                    return {status: res.response.status, error: res.response.data};
                }
                //其他错误
            } else {
                ctx.throw(500);
            }
        });
    }
};

function showInfo(ctx, type, res, option) {
    let defaults = {
        url: res.config.url,
        method: res.request.method
    };
    let options = JSON.stringify(Object.assign({}, defaults, option));
    if (type === 'info') {
        ctx.logger.info(options);
    } else if (type === 'error') {
        ctx.logger.error(options);
    }
}
