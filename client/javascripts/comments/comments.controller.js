(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('PostsController', PostsController);

    PostsController.$inject = [
        '$stateParams',
        'commentsService',
        'postsService'
    ];

    function PostsController($stateParams, commentsService, postsService) {

        var vm = this;
        vm.post = {};
        vm.addComment = addComment;
        vm.upvote = upvote;
        vm.delete = deleteComment;

        activate();

        function activate() {
            return getPost();
        }

        function getPost() {
            return postsService.get($stateParams.id).then(function (data) {
                vm.post = data;
                return vm.post;
            }, processError);
        }

        function addComment() {

            commentsService
                .add(vm.post._id, {
                    // the author of the comment will be populated in backend
                    // author: 'user',
                    body: vm.body
                })
                .then(function successCallback(comment) {
                    vm.post.comments.push(comment.data);
                    vm.body = '';
                    vm.hideModal();
                }, processError);
        }

        function upvote(comment) {
            commentsService
                .upvote(comment)
                .then(function successCallback(resComment) {
                    comment.upvotes = resComment.data.upvotes;
                }, processError);
        }

        function deleteComment(id) {
            commentsService.delete(id).then(function successCallback(responsData) {
                if (responsData.data.success) {
                    activate();
                } else {
                    processError();
                }
            }, processError);
        }

        function processError() {
            alert('Shit happens, please try again.');
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('flapperNews')
        .directive('modalElement', modalElement);

    function modalElement() {
        return function linkFn(scope, element, attrs) {
            scope.vm.hideModal = hideModal;

            function hideModal() {
                element.modal('hide');
            }
        };
    }

})();
