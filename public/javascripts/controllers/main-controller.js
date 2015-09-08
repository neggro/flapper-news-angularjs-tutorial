(function () {

    angular
        .module('flapperNews')
        .controller('MainController', [
            '$scope',
            'posts',
            mainController
        ]);

    function mainController($scope, posts) {

        $scope.posts = posts.posts;

        $scope.addPost = function () {
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function (post) {
            post.upvotes++;
        };
    }

})();
