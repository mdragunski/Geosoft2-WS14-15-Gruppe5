'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    // Leaflet angular
		angular.extend($scope, {
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
                            apikey: "pk.eyJ1IjoidG9tYmF0b3NzYWxzIiwiYSI6Imo3MWxyTHMifQ.TjXg_IV7ZYMHX6tqjMikPg",
                            mapid: "tombatossals.jbn2nnon"
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
            controls: {
                    draw: {
                      draw: {
                         polyline: false,
                         polygon: false,
                         rectangle: false,
                         circle: false,
                         marker: true,
                       }
                    }   
          }
        });
        

        $scope.coordinates = {};

        $scope.markers = [];

        $scope.clickEvent = function (e, args) {
            $scope.markers.push({
                lat: args.leafletEvent.latlng.lat,
                lng: args.leafletEvent.latlng.lng
            });
            $scope.coordinates.lat = args.leafletEvent.latlng.lat;
            $scope.coordinates.lng = args.leafletEvent.latlng.lng;
        }

        // $scope.$on('leafletDirectiveMap.click', function(e, args) {
            
        // });

        $scope.activateEvents = function () {
            $scope.$on('leafletDirectiveMap.click', $scope.clickEvent);
        }
        
        // Calender tests

        $scope.today = function() {
            $scope.dt = new Date();
          };
          $scope.today();

          $scope.clear = function () {
            $scope.dt = null;
          };

          // Disable weekend selection
          $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
          };
          $scope.toggleMin();

          $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
          };

          $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          $scope.format = $scope.formats[0];
        
    }   
]);