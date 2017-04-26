/*
 *@fileOverview 首页
 *@auth subying
 */

module.exports = async function(ctx){
    var session = this.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = `首页 ${session.count}`;
};
