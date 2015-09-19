(function () {
    'use strict';

    angular
        .module('flapperNews')
        .factory('posts', postsService);

    postsService.$inject = [
        '$http',
        'auth'
    ];

    /* @ngInject */
    function postsService($http, auth) {

        var postsResponse = {
            getAll: getAll,
            create: create,
            upvote: upvote,
            get: get,
            posts: []
        };

        return postsResponse;

        function getAll() {
            return $http.get('/posts');
        }

        function create(post) {
            return $http.post('/posts', post, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            });
        }

        function upvote(post) {
            return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            });
        }

        function get(id) {
            return $http.get('/posts/' + id).then(function (res) {
                return res.data;
            });
        }
    }

})();
