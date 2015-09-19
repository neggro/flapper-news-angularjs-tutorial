(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('PostsController', PostsController);

    PostsController.$inject = [
        'comments',
        'post'
    ];

    /* @ngInject */
    function PostsController(comments, post) {

        var vm = this;
        vm.post = post;
        vm.addComment = addComment;
        vm.upvote = upvote;

        function addComment() {

            comments
                .add(vm.post._id, {
                    // the author of the comment will be populated in backend
                    // author: 'user',
                    body: vm.body
                })
                .then(function successCallback(comment) {
                    vm.post.comments.push(comment);
                    vm.body = '';
                }, processError);
        }

        function upvote(comment) {
            comments
                .upvote(comment)
                .then(function successCallback(resComment) {
                    comment.upvotes = resComment.upvotes;
                }, processError);
        }

        function processError() {
            alert('Shit happens, please try again.');
        }
    }

})();
