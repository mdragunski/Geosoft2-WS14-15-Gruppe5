'use strict';

angular.module('core').controller('SearchController', ['$scope', '$http',
	function($scope, $http) {

		$scope.getComments = function(){
			$http.get('/comments').
			success(function(data, status, headers, config) {
				$scope.comments = data;

			}).
			error(function(data, status, headers, config) {

			});
		}

		$scope.aSearch=0;



$scope.open = function($event) {
	$event.preventDefault();
	$event.stopPropagation();

	$scope.opened = true;
};







}
]);
