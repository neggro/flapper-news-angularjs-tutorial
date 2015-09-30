(function () {
    'use strict';

    angular
        .module('flapperNews')
        .factory('commentsService', commentsService);

    commentsService.$inject = [
        '$http',
        'auth'
    ];

    function commentsService($http, auth) {

        return {
            add: add,
            upvote: upvote
        };

        function add(id, comment) {
            return $http.post('/posts/' + id + '/comments', comment, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            });
        }

        function upvote(comment) {
            return $http.put('/comments/' + comment._id + '/upvote', null, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            });
        }
    }

})();
