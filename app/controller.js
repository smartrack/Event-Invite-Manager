/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('HMZEventMgrApp')
    .controller('MainController', MainController);

  MainController.$inject = ['QueryService','$rootScope','$timeout','$location'];


  function MainController( QueryService, $rootScope, $timeout, $location ) {

    // 'controller as' syntax
    var self = this;
	
	if($location.$$path == "/results"){
		QueryService.getAttendees().then(function(response){		
		self.attendeesList = response;
		});
	}else {
		self.addAttendee = addNewAttendee;
		self.rangeonetofive = [{"name":"One","value":1},{"name":"Two","value":2},{"name":"Three","value":3},{"name":"Four","value":4},{"name":"Five","value":5}]
		$(".ui.embed").embed();
		$timeout(function(){
			$('.ui.radio').checkbox();
		},100);
	
	}
	
	function addNewAttendee(){
		
		if(self.inviteForm.$valid){
			self.formState = 'loading';
				$timeout(function(){
					QueryService.addAttendee(self.attendee).then(function(){
						self.formState = 'success';
						self.response = {'success': true};
					});
				},1000);
				
		}
		
	}
  }

})();