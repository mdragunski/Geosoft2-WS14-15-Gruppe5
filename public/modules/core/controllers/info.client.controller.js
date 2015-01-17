'use strict';

var app = angular.module('core');

app.controller('InfoController', ['$scope', 'ngDialog',
	function($scope, ngDialog) {
		// Sidebar controller controller logic
		// ...
		$scope.open = function () {
					ngDialog.open({
						template: 'modules/core/views/firstDialog.client.view.html',
						controller: 'FirstDialogCtrl',
						className: 'ngdialog-theme-default ngdialog-theme-custom'
					});
				};
			}
		]);

app.controller('FirstDialogCtrl', function ($scope, ngDialog) {
				$scope.next = function () {
					ngDialog.close('ngdialog1');
					ngDialog.open({
						template: 'modules/core/views/secondDialog.client.view.html',
						className: 'ngdialog-theme-default ngdialog-theme-custom'
					});
				};
			});