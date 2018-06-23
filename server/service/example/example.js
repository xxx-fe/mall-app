class exampleService {
    constructor(ctx) {
        this.ctx = ctx;
    }

    getList(ctx) {
        return ctx.axios(ctx, {url: '/example/list', method: 'post'});
    }
}

export default exampleService;
