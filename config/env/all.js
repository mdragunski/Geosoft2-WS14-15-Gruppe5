'use strict';

module.exports = {
	app: {
		title: 'georate',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 80,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/leaflet/dist/leaflet.css',
				'public/lib/leaflet.draw/dist/leaflet.draw.css',
				'public/lib/ngDialog/css/ngDialog.css',
				'public/lib/ngDialog/css/ngDialog-theme-default.css',
				'public/lib/fontawesome/css/font-awesome.css',
				'public/lib/leaflet.markercluster/dist/MarkerCluster.Default.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/leaflet/dist/leaflet.js',
				'public/lib/angular-leaflet/dist/angular-leaflet-directive.min.js',
				'public/lib/ngDialog/js/ngDialog.js',
				'public/lib/leaflet.markercluster/dist/leaflet.markercluster.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
