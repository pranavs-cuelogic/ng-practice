angular.module('myApp', ['ngRoute'])
	.controller('HomeController', function($scope){
		$scope.welcomeText = "Hello World!";
	})
	.controller('AboutController', function($scope){
		$scope.message = "About Me";
	})
	.controller('ClientController', function($scope){
		$scope.message = "Our Clients";
	})
	.controller('CareerController', function($scope){
		$scope.message = "Careers";
	})
	.controller('TocController', function($scope){
		$scope.message = "TOC list";
	})
	.directive('myheader', function () {
	    return {
	        templateUrl: "partials/directives/header.html"
	    }
	})
	.directive('myfooter', function () {
	    return {
	        templateUrl: "partials/directives/footer.html"
	    }
	})
	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				controller : 'HomeController',
				templateUrl : 'partials/home.html'
			})
			.when('/about-us', {
				controller : 'AboutController',
				templateUrl : 'partials/about.html'
			})
			.when('/join-us', {
				controller : 'CareerController',
				templateUrl : 'partials/career.html'
			})
			.when('/cuelogic/clients', {
				controller : 'ClientController',
				templateUrl : 'partials/client.html'
			})
			.when('/terms-­and-­conditions', {
				controller : 'TocController',
				templateUrl : 'partials/toc.html'
			})
	})
	;
