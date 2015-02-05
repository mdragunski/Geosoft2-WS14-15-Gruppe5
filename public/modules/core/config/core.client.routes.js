'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('comment', {
			url: '/comment',
			templateUrl: 'modules/core/views/comment.client.view.html'
		}).
		state('search', {
			url: '/search',
			templateUrl: 'modules/core/views/search.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
