'use strict';

angular.module('core').controller('NewCommentController', ['$scope', '$http',
	function($scope, $http) {
		$scope.comment ={
			tags:[],
			additionalressources:[]
		}
		$scope.comment.georeference = $scope.lat+' , '+$scope.lng;


		$scope.addTag = function(tag){
			if(!$scope.contains(tag, $scope.comment.tags)&& tag!=''){
				$scope.comment.tags.push(tag);
			}

			$scope.tag_input='';

		}
		$scope.addAdditionalRessource = function(ressource){
			$scope.comment.additionalressources.push(ressource);
		}

		$scope.submitComment = function(){
			$http.post('/comments',$scope.comment)
			.success(function(data, status, headers, config) {
				Console.log('success');
			})
			.
			error(function(data, status, headers, config) {
				Console.log('error');})
		}

		$scope.contains = function(obj, array){
			for(var i=0; i<array.length;i++){
				if(array[i]==obj){
					return true;
				}
			}
			return false;
		}
	}
]);
