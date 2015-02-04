'use strict';

angular.module('core').filter('shortenUrl', [
	function() {
		return function(input) {
			if(input.length < 30){
				return input;
			}
			else{
				return input.substring(0,29)+'...';
			}
		};
	}
]);
