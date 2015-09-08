(function () {

    angular
        .module('flapperNews')
        .factory('posts', [
            postsService
        ]);

    function postsService() {

        return {
            posts: [{
                title: 'post 1',
                comments: [{
                    author: 'Joe',
                    body: 'Cool post!',
                    upvotes: 0
                },
                {
                    author: 'Bob',
                    body: 'Great idea but everything is wrong!',
                    upvotes: 0
                }],
                upvotes: 5
            }]
        };
    }

})();
