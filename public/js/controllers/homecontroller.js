angular.module("heyyo").controller("HomeController",function($scope,$http){
	$scope.submit=function(){
		$http({method:"POST",url:"/api/task/", data:{data:$scope.command}})
		.success(function(data){
			console.log(data);
		})
		.error(function(err){

		});
		$scope.command="";
	};
});