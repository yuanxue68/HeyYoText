angular.module("heyyo").controller("TasksController",function($scope,$http){
	$scope.getAll=function(){
		$http.get("/api/task/")
		.success(function(data){
			console.log(data);
			$scope.tasks=data;
		})
		.error(function(err){
			console.log("error in get /api/task");
		});
	};
	$scope.getAll();
});