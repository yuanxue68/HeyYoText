angular.module("heyyo").controller("HelpController",function($scope,$http){
	$scope.getHelp=function(){
		$http.get("/help.json")
		.success(function(data){
			console.log(data);
			$scope.helps=data;
		})
		.error(function(err){

		});
	};

	$scope.getHelp();
});