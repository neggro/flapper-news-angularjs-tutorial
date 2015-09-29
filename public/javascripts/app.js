(function () {
    'use strict';

    angular
        .module('flapperNews', [
            'ui.router'
        ])
        .config(stateURLConfig);

    stateURLConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function stateURLConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/templates/home.html',
                controller: 'MainController',
                controllerAs: 'vm',
                onEnter: onAppEnterNoAuth
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/templates/posts.html',
                controller: 'PostsController',
                controllerAs: 'vm',
                onEnter: onAppEnterNoAuth
            })
            .state('login', {
                url: '/login',
                templateUrl: '/templates/login.html',
                controller: 'AuthController',
                controllerAs: 'vm',
                onEnter: onAppEnterAuth
            })
            .state('register', {
                url: '/register',
                templateUrl: '/templates/register.html',
                controller: 'AuthController',
                controllerAs: 'vm',
                onEnter: onAppEnterAuth
            });

        $urlRouterProvider.otherwise('/');

        onAppEnterNoAuth.$inject = [
            '$state',
            'auth'
        ];

        function onAppEnterNoAuth($state, auth) {
            if (!auth.isLoggedIn()) {
                $state.go('login');
            }
        }

        onAppEnterAuth.$inject = [
            '$state',
            'auth'
        ];

        function onAppEnterAuth($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }
    }

})();
