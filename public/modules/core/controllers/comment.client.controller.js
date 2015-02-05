'use strict';

angular.module('core').controller('CommentController', ['$scope',
	function($scope) {
		$scope.getComments = function(){
			$http.get('/comments').
			success(function(data, status, headers, config) {
				$scope.comments = data;
				$window.alert("success");
				});
		}
	}
]);
