(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('NavController', NavController);

    NavController.$inject = [
        'auth'
    ];

    /* @ngInject */
    function NavController(auth) {

        var vm = this;
        vm.title = 'NavController';

        vm.isLoggedIn = auth.isLoggedIn;
        vm.getUserName = auth.getUserName;
        vm.logOut = auth.logOut;

        // activate();

        // function activate() {
        // }
    }
})();
