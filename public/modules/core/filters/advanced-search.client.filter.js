'use strict';

angular.module('core').filter('advancedSearch', [
	function() {
		return function(items, advSearch, showAdvancedSearch) {
			if(!showAdvancedSearch){
				return items;
			}

			var filteredItems=[];

			for (var i=0;i<items.length;i++){

				if(advSearch.rating!= null && items[i].rating < advSearch.rating ){
					continue;
				}
				if(advSearch.startDate!= null && advSearch.endDate!=null
						&& (items[i].timereference.enddate < aSearch.startdate
						|| items[i].timereference.startdate > aSearch.enddate)){
					continue;
				}
				/*if(advSearch.location != null && items[i].rating < aSearch.rating ){
					continue;
				}*/

				filteredItems.push(items[i]);
			}
			return filteredItems;
		};
	}
]);
