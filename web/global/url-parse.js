function urlParse(param1) {
    var anchor = document.createElement('a');
    anchor.href = param1;
    return {
        source: param1,
        protocol: anchor.protocol.replace(':', ''),
        host: anchor.hostname,
        port: anchor.port,
        query: anchor.search,
        params: (function () {
            var ret = {},
                seg = anchor.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                str;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                str = seg[i].split('=');
                ret[str[0]] = str[1];
            }
            return ret;
        })(),
        file: (anchor.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: anchor.hash.replace('#', ''),
        path: anchor.pathname.replace(/^([^\/])/, '/$1'),
        relative: (anchor.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: anchor.pathname.replace(/^\//, '').split('/')
    };
};
Vue.prototype.urlParse = urlParse(document.URL);
