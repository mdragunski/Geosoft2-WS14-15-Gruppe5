'use strict';

angular.module('core').filter('advancedSearch', [
	function() {
		return function(items, aSearch, showAdvancedSearch) {
			if(!showAdvancedSearch){
				return items;
			}

			var filteredItems=[];

			for (var i=0;i<items.length;i++){
				var blub = items[i].rating;
				if(blub >= aSearch.rating){
					filteredItems.push(items[i]);
				}
			}
			return filteredItems;
		};
	}
]);
