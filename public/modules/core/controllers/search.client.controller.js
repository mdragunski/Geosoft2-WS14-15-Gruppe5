'use strict';

angular.module('core').controller('SearchController', ['$scope',
	function($scope) {
		$scope.comments = [
	{
		'url':'google.de',
		'creationdate':1421649549816,
		'text':'blub',
		'rating':3,
		'timereference':1421614649816,
		'georeference':'blub',
		'tags':[
		'bla',
		'bla2',
		'bla3'
		],
		'additionalressources':[
		'blub'
		],
		'username':'anonymous'
	},
{
	'url':'google.de',
	'creationdate':1424614649816,
	'text':'blub2 elefant',
	'rating':4,
	'timereference':1421614649816,
	'georeference':'blub',
	'tags':[
	'bla',
	'bla2',
	'bla3'
	],
	'additionalressources':[
	'blub'
	],
	'username':'anonymous'
},
{
	'url':'google.de',
	'creationdate':1391614644756,
	'text':'blub hallo',
	'rating':3,
	'timereference':1421614649816,
	'georeference':'blub',
	'tags':[
	'bla',
	'bla2',
	'bla3'
	],
	'additionalressources':[
	'blub'
	],
	'username':'anonymous'
}
];

$scope.open = function($event) {
	$event.preventDefault();
	$event.stopPropagation();

	$scope.opened = true;
};







}
]);
