angular.module('my-factories',[])
	.factory('demo',function($http) {
		return {
			popup : function(message) {
				alert(message);
			},
			get : function(url,query) {
				var url = query ? url + '?' + query : url;
				var request = $http.jsonp(url);
				return request;
			}
		}
	});