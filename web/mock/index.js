Mock.mock('/api/list', 'post', function () {
    return Mock.mock({
        "list|5-10": [{
            'name': '@cname',
            'imageUrl': 'http://placehold.it/300x150/f69/fff',
            'description': '@cname'
        }
        ]
    });
});
