(function () {

    angular
        .module('flapperNews', [
            'ui.router'
        ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            stateURLConfig
        ]);

    function stateURLConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/templates/home.html',
                controller: 'MainController'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/templates/posts.html',
                controller: 'PostsController'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
