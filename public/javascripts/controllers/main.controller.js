(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('MainController', MainController);

    MainController.$inject = [
        'posts'
    ];

    /* @ngInject */
    function MainController(posts) {

        var vm = this;
        vm.posts = [];
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        activate();

        function activate() {
            posts
                .getAll()
                .then(function successCallback(serviceResponse) {
                    vm.posts = serviceResponse.data;
                }, processError);
        }

        function addPost() {
            posts
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
            posts
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
