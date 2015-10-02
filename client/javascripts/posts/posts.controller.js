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
        vm.delete = deletePost;

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

        function deletePost(id) {
            postsService.delete(id).then(function successCallback(responseData) {
                if (responseData.data.success) {
                    activate();
                } else {
                    processError;
                }
            }, processError);
        }

        function processError() {
            alert('Shit happens, please try again.');
        }
    }

})();
