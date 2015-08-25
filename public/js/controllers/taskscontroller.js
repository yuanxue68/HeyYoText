angular.module("heyyo").controller("TasksController",function($scope,$http,flash){
	$scope.getAll=function(){
		$http.get("/api/task/")
		.success(function(data){
			console.log(data);
			$scope.tasks=data;
		})
		.error(function(err){

		});
	};
	$scope.deleteTask=function(id,index){
		$http.delete("/api/task/"+id)
		.success(function(){
			console.log(index)
			$scope.tasks.splice(index,1);
		})
		.error(function(err){

		});
	};
	$scope.getAll();
});