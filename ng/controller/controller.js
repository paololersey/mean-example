angular.module('app').controller('PostsCtrl', function ($scope, $http, PostsSvc) {
    $scope.addPost = function () {
        if ($scope.postBody) {
            PostsSvc.create({
                username: 'paolo s.',
                body: $scope.postBody
            }).success(function (post) {
                $scope.posts.unshift(post)
                $scope.postBody = null
            })
        }
    }

    $scope.deletePost = function (post) {
        if (post._id != null) {
            PostsSvc.delete({
                post: post
            }).success(function (post) {
                console.log('ok delete');
            })
        }
    }

    PostsSvc.fetch().success(function (posts) {
        $scope.posts = posts
    })
})