(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('AuthController', AuthController);

    AuthController.$inject = [
        '$state',
        'auth'
    ];

    function AuthController($state, auth) {

        var vm = this;
        vm.user = {};

        vm.register = register;
        vm.login = login;

        function register() {
            auth.register(vm.user).error(function (error) {
                vm.error = error;
            }).then(function () {
                $state.go('home');
            });
        }

        function login() {
            auth.login(vm.user).error(function (error) {
                vm.error = error;
            }).then(function () {
                $state.go('home');
            });
        }
    }

})();
