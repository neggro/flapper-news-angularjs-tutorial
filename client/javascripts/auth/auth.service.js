(function () {
    'use strict';

    angular
        .module('flapperNews')
        .factory('auth', authService);

    authService.$inject = [
        '$http',
        '$window',
        '$state'
    ];

    function authService($http, $window, $state) {

        return {
            getToken: getToken,
            getUserName: getUserName,
            isLoggedIn: isLoggedIn,
            login: login,
            logOut: logOut,
            register: register,
            saveToken: saveToken
        };

        function saveToken(token) {
            $window.localStorage.flapperNewsToken = token;
        }

        function getToken() {
            return $window.localStorage.flapperNewsToken;
        }

        function isLoggedIn() {

            var token = getToken();
            var payload;

            if (token) {

                payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            }

            return false;
        }

        function getUserName() {

            var token;
            var payload;
            var userName = '';

            if (isLoggedIn()) {

                token = getToken();
                payload = JSON.parse($window.atob(token.split('.')[1]));

                userName = payload.username;
            }

            return userName;
        }

        function register(user) {
            return $http.post('/register', user).success(function registerSuccess(data) {
                saveToken(data.token);
            });
        }

        function login(user) {
            return $http.post('/login', user).success(function loginSuccess(data) {
                saveToken(data.token);
            });
        }

        function logOut() {
            $window.localStorage.removeItem('flapperNewsToken');
            $state.go('login');
        }
    }

})();
