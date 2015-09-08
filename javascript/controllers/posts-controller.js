(function () {

    angular
        .module('flapperNews')
        .controller('PostsController', [
            '$scope',
            '$stateParams',
            'posts',
            postsController
        ]);

    function postsController($scope, $stateParams, posts) {

        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function () {

            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });

            $scope.body = '';
        };
    }

})();
