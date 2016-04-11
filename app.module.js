angular.module('browserapp', ['ngRoute']).config(appConfig);

appConfig.$inject = ['$routeProvider'];

function appConfig($routeProvider) {
	$routeProvider.when('/', {
		// Path of the view
		templateUrl: 'partials/home.html',
		// name of the controller
		controller: 'HomeAngCtrl',
		controllerAs: 'contactCtrl'
	});
  	$routeProvider.otherwise({
  		redirectTo: '/'
  	});
};
