angular.module("heyyo").config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('task',{
		url:'/tasks',
		controller: 'TasksController',
		templateUrl: 'views/tasks.html'
	})
	.state('home',{
		url:'/',
		controller: 'HomeController',
		templateUrl: 'views/home.html'
	})
	.state('help',{
		url:'/help',
		controller: 'HelpController',
		templateUrl:'views/help.html'
	});

});