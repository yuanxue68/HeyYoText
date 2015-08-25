angular.module('heyyo')
.directive('flash',function(){
	return{
		replace:true,
		restrict:'E',
		templateUrl:'views/directives/flash.html'
	};
});