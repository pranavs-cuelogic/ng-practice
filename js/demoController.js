angular.module('controllers',[])
	.controller('demoCtrl',['$scope','demo',function($scope,demo) {
		$scope.message = "Hello world.";
	}]);