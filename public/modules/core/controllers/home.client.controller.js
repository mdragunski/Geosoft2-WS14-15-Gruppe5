'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$window',
	function($scope, Authentication, $http, $window) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    // Leaflet angular
    angular.extend($scope, {
    	bounds:{},
    	center: {

    		autoDiscover: true
    	},

    	layers: {
    		baselayers: {
    			osm: {
    				name: 'OpenStreetMap',
    				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    				type: 'xyz'
    			},
    			mapboxTerrain: {
    				name: 'Mapbox Terrain',
    				url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    				type: 'xyz',
    				layerOptions: {
    					apikey: "pk.eyJ1IjoiZHJhZ29uc2t5IiwiYSI6Inl1TGc5eVUifQ.sMGhI3VW_pQRIqGViDXbCw",
                                  //"pk.eyJ1IjoidG9tYmF0b3NzYWxzIiwiYSI6Imo3MWxyTHMifQ.TjXg_IV7ZYMHX6tqjMikPg",
                                  mapid:  "dragonsky.tombatossals"
                                  //"i5ho0lna.jbn2nnon"
                              }
                          },
                          arc: {
                          	name: 'Aerial',
                          	url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                          	type: 'xyz'
                          }
                      }
                  },
                  defaults: {
                  	scrollWheelZoom: false,
                  	controls: {
                  		layers: {
                  			visible: true,
                  			position: 'topleft',
                  			collapsed: true
                  		}
                  	}
                  },
            /*controls: {
                    draw: {
                      draw: {
                         polyline: false,
                         polygon: false,
                         rectangle: false,
                         circle: false,
                         marker: true,
                       },
                      //edit: false
                    }
                }*/
            });


$scope.coordinates = {};

$scope.markers = [];

$scope.clickToAddCoordinatesEvent = function (e, args) {

	$scope.comment.georeference.geometry.coordinates[0] = args.leafletEvent.latlng.lat;
	$scope.comment.georeference.geometry.coordinates[1] = args.leafletEvent.latlng.lng;
	$scope.$on('leafletDirectiveMap.click', null);
}



$scope.activateEvents = function () {
	$scope.$on('leafletDirectiveMap.click', $scope.clickToAddCoordinatesEvent);
}

				//new Comment

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

				$scope.parseUrl= function (url){
					$http.post('/parser',{url:$scope.comment.url}).
					success(function(data, status, headers, config) {
						$scope.parser=data;
						$window.alert("success");

					});
				}

				$scope.changeCoordinates= function(){
					$scope.comment.georeference.geometry.coordinates =[$scope.lat, $scope.lng];
				}

				$scope.openDatepicker = function($event, picker) {
					$event.preventDefault();
					$event.stopPropagation();

					if(picker=='startPicker'){
						$scope.pickerStartOpened = true;
					}
					else if(picker == 'endPicker'){
						$scope.pickerEndOpened = true;
					}
					else if(picker == 'searchStartPicker'){
						$scope.pickerSearchStartOpened = true;
					}
					else if(picker == 'searchEndPicker'){
						$scope.pickerSearchEndOpened = true;
					}

				};



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
					$scope.alerts = [];
					if($scope.validate()){
						$http.post('/comments',$scope.comment)
						.success(function(data, status, headers, config) {
							console.log('success');
						})
						.error(function(data, status, headers, config) {
							console.log('error');})
				}
				}

				$scope.contains = function(obj, array){
					for(var i=0; i<array.length;i++){
						if(array[i]==obj){
							return true;
						}
					}
					return false;
				}

					//search

					$scope.getComments = function(){
						$http.get('/comments').
						success(function(data, status, headers, config) {
							$scope.comments = data;
							$window.alert("success");

						});
					}

					$scope.getBoundingBox = function (){
						$scope.advSearch.location = bounds;
					}

					$scope.advSearch={
						rating:null,
						startdate:null,
						enddate:null,
						location:null,
						usertype:null,
					};

					$scope.userTypes=['user','expert','scientist'];



					$scope.open = function($event) {
						$event.preventDefault();
						$event.stopPropagation();

						$scope.opened = true;
					};

					$scope.validate = function() {
						var valid = true;
						if (typeof $scope.comment.url === 'undefined' || $scope.comment.url === '' || !$scope.validateUrl($scope.comment.url)){
							valid = false;
							$scope.alerts.push({ type: 'danger', msg: 'No valid URL!'});
						}
						if ($scope.comment.text === '' || typeof $scope.comment.text === 'undefined'){
							valid = false;
							$scope.alerts.push({ type: 'danger', msg: 'Comment needed!'});
						}
						if (typeof $scope.comment.georeference.geometry.coordinates[0] === 'undefined') {
							valid = false;
							$scope.alerts.push({ type: 'danger', msg: 'A valid value has to be set for latitude!'})		
						}
						if (typeof $scope.comment.georeference.geometry.coordinates[0] === 'undefined'){
							valid = false;
							$scope.alerts.push({ type: 'danger', msg: 'A valid value has to be set for longitude!'})
						}
						if ($scope.comment.timereference.startdate > $scope.comment.timereference.enddate){
							valid = false;
							$scope.alerts.push({ type: 'danger', msg: 'Startdate needs to be settled before enddate!'})
						}
						if (!$scope.validateUrl($scope.additionalressource_input)){
							valid = false;
							$scope.alerts.push({ type: 'danger', msg: 'No valid URL for additional ressources!'})
						}
						return valid;
					}

					$scope.validateUrl = function(url) {
						console.log("BLA");
						regExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
						if (regExp.test(url)){
							return true;
						}
						return false;
					}	

					$scope.alerts = [];
				}
			]);
