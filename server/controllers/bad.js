/*
 *@fileOverview bad
 *@auth subying
 */

module.exports = async function(ctx){
    var session = this.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = `bad 测试 ${session.count}`;
};
