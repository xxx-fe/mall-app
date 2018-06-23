Mock.mock('/example/list', 'post', function () {
    return Mock.mock({
        "list|1-10": [{
            'name': '@cname',
            'imageUrl': 'https://placeholdit.imgix.net/~text?txtsize=50&bg=323232&txtclr=ffffff&txt=150%C3%97300&w=300&h=150',
            'description': '@cname'
        }
        ]
    });
});