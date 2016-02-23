angular.module("heyyo").controller("TasksController",function($scope,$http,flash){
	$scope.getTasks=function(){
		$http.get("/api/text/"+$scope.form.number)
		.success(function(data){
			console.log(data);
			$scope.tasks=data;
			$scope.number = $scope.form.number;
		})
		.error(function(err){
			$scope.tasks = [];
		});
	};
	$scope.deleteTask=function(taskId, index){
		$http.delete("/api/text/"+$scope.number+"/"+taskId)
		.success(function(){
			console.log(index);
			$scope.tasks.splice(index,1);
		})
		.error(function(err){

		});
	};
	$scope.form = {};
});