angular.module('myApp', ['ngRoute', 'ngCookies'])
	.controller('AppController', function($scope, AuthService, $location){
		$scope.loginStatus = null;
		$scope.loginStausMessage = null;
		$scope.isAuthenticated = AuthService.isAuthenticated();

		$scope.logout = function(){ 
			AuthService.logout();
			$scope.isAuthenticated = false;
			$scope.loginStatus = 'SUCCESS';
		    $scope.loginStausMessage = "You Logged out successfully";
			$location.path('/login');
		}

		$scope.setStatusMsg = function(status, msg){
			$scope.loginStatus = status;
			$scope.loginStausMessage = msg;
			$scope.isAuthenticated = AuthService.isAuthenticated();
		}
	})
	.controller('HomeController', function($scope){
		$scope.welcomeText = "Hello World!";
		$scope.menu = {
			top:[{url:'', name:'Home', class:'fa-home'},
				{url:'about-us', name:'About Me', class:'fa-shield'},
				{url:'join-us', name:'Join Us', class:'fa-comment'},
				{url:'cuelogic/clients', name:'Clients', class:'fa-apple'}],
			bottom:{url:'terms-­and-­conditions', name:'Terms and Conditions'}
		};
	})
	.controller('AboutController', function($scope){
		$scope.message = "About Me";
	})
	.controller('ClientController', function($scope, $routeParams){
		$scope.message = "Our ";
		$scope.clientName = $routeParams.clientName
	})
	.controller('CareerController', function($scope){
		$scope.message = "Careers";
	})
	.controller('TocController', function($scope){
		$scope.message = "TOC list";
	})
	.controller('LoginController', function($scope, AuthService, Session, $location){
		$scope.usercredential = {}

		$scope.login = function () {
//console.log($scope.usercredential);
			var baseUrl = window.location.origin + window.location.pathname; 
		   
		    AuthService.login($scope.usercredential, baseUrl).success(function (res) {

		    	if(res.status == "SUCCESS"){
		    		Session.create(res.user.id, res.user.uname);
		    		$location.path('/about-us');
		    	}

		    	$scope.setStatusMsg(res.status, res.msg);
		    })
		    .error(function (error) {
		    	console.log(error);
		    	$scope.loginStatus = 'FAIL';
		    	$scope.loginStausMessage = "Some error occured while login";
		    });
		};

		
	})

	.factory('AuthService', function ($http, Session) {
		var authService = {};
	 
		authService.login = function (credentials, baseUrl) {	
		    return $http.post(baseUrl+'login.php',credentials);
		};

		authService.logout = function () {
		    return Session.destroy();
		};
	 
		authService.isAuthenticated = function () {
			return !!Session.get('sessid');
		};
	
	  return authService;
	})

	.factory('Session', function ($cookieStore) {

		return {
			create : function (sessionId, userId) {
				$cookieStore.put('sessid',sessionId);
				$cookieStore.put('uname',userId);
				return;
			},

			get : function (key) {
				return $cookieStore.get(key);
			},

			destroy : function () {
				$cookieStore.remove('sessid');
				$cookieStore.remove('uname');
				return;
			}
		}
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
			.when('/cuelogic/:clientName', {
				controller : 'ClientController',
				templateUrl : 'partials/client.html'
			})
			.when('/terms-­and-­conditions', {
				controller : 'TocController',
				templateUrl : 'partials/toc.html'
			})
			.when('/login', {
				controller : 'LoginController',
				templateUrl : 'partials/login.html'
			})
			
	})
	.run(function($rootScope, AuthService, $location){
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			// if route requires auth and user is not logged in

			if (!AuthService.isAuthenticated()) {
				// redirect back to login
				$location.path('/login');
			}else if($location.url() ==='/login'){
				$location.path('/');
			}
			
		});
	});
