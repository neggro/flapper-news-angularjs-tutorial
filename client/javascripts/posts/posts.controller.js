(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('MainController', MainController);

    MainController.$inject = [
        'postsService'
    ];

    function MainController(postsService) {

        var vm = this;
        vm.posts = [];
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        activate();

        function activate() {
            postsService
                .getAll()
                .then(function successCallback(serviceResponse) {
                    vm.posts = serviceResponse.data;
                }, processError);
        }

        function addPost() {
            postsService
                .create({
                    title: vm.title,
                    link: vm.link
                })
                .then(function successCallback(postResponse) {
                    vm.posts.push(postResponse.data);
                    vm.title = '';
                    vm.link = '';
                }, processError);
        }

        function incrementUpvotes(post) {
            postsService
                .upvote(post)
                .then(function successCallback() {
                    post.upvotes++;
                }, processError);
        }

        function processError() {
            alert('Shit happens, please try again.');
        }
    }

})();
