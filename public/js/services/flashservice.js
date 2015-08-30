angular.module('heyyo')
.factory('flash',function($rootScope){
	var queue=[];
	var currentMessage="";
  //push out the old value of flash message and push in the
  //new one, if no glash message just push in empty string 
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