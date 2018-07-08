/**
 * 监听
 */
module.exports.default = module.exports = async (app) => {
    let port = app.context.port || 3333;
    app.listen(port, () => {
        app.context.logger.info(`server listen on ${port}`);
        app.context.logger.info(`---------- mode: ${app.context.env} ----------`);
    });
};
