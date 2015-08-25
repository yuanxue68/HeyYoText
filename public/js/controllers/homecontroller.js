angular.module("heyyo").controller("HomeController",function($scope,$http,flash){
	$scope.flash = flash;
	$scope.submit=function(){
		$http({method:"POST",url:"/api/task/", data:{data:$scope.command}})
		.success(function(data){
			flash.setMessage("Success");
			flash.success=true;
			$scope.$emit("flash");
		})
		.error(function(err){
			flash.setMessage("Error Submitting Task");
			flash.success=false;
			$scope.$emit("flash");
		});
		$scope.command="";
	};
});