angular.module('heyyo')
.factory('flash',function($rootScope){
	var queue=[];
	var currentMessage="";
	$rootScope.$on("flash", function() {
    	currentMessage = queue.shift() || "";
  	});
  	$rootScope.$on("$stateChangeSuccess", function() {
    	currentMessage = queue.shift() || "";
  	});

  	return{
  		setMessage:function(message){
  			queue.push(message);
  		},
  		getMessage:function(){
  			return currentMessage;
  		},
      clear:function(){
        currentMessage =  "";
      }
  	};
});