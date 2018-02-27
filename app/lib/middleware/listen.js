/**
 * 监听
 */
module.exports.default = module.exports = async (app) => {
    let port = app.context.port || 3333;
    app.listen(port, () => {
        console.info(`server listen on ${port}`);
        console.info(`dev mode:${app.context.env}`);
    });
};
