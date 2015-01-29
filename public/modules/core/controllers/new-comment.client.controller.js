'use strict';

angular.module('core').controller('NewCommentController', ['$scope', '$http',
	function($scope, $http) {
		$scope.comment ={
			tags:[],
			additionalressources:[],
			georeference:{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: []
				}
			}
		}

		$scope.changeCoordinates= function(){
			$scope.comment.georeference.geometry.coordinates =[$scope.lat, $scope.lng];
		}



		$scope.addTag = function(tag){
			if(!$scope.contains(tag, $scope.comment.tags)&& tag!=''){
				$scope.comment.tags.push(tag);
			}

			$scope.tag_input=null;

		}

		$scope.removeTag = function(tag){
			for (var i=0; i<$scope.comment.tags.length; i++){
				if(tag== $scope.comment.tags[i]){
					$scope.comment.tags.splice(i,1);
				}
			}
		}
		$scope.addAdditionalRessource = function(ressource){
			if (ressource != null && ressource!=""){
				$scope.comment.additionalressources.push(ressource);
				$scope.additionalressource_input=null;
			}


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
