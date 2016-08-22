;(function() {


  'use strict';
  angular
    .module('HMZEventMgrApp')
    .factory('QueryService', [
      '$http', '$q', 'site.config','$firebaseArray', QueryService
    ]);



  //////////////// factory



  function QueryService($http, $q, SiteConfig, $firebaseArray) {
	var ref = firebase.database().ref().child("attendees"),
	service = {
	  addAttendee : addAttendee,
	  getAttendees : queryAllAttendees
    };

    return service;


    //////////////// definition

	function addAttendee(data){
		var deferred = $q.defer();
		var attendees = $firebaseArray(ref);
		attendees.$add(data);
		deferred.resolve(attendees);
		return deferred.promise;
	}
	
	function queryAllAttendees(){
		var deferred = $q.defer();
		var attendees = $firebaseArray(ref);
		deferred.resolve(attendees);
		return deferred.promise;
	}
			
    function query(method, url, params, data) {

      var deferred = $q.defer();

      $http({
        method: method,
        url: url,
        params: params,
        data: data
      }).then(function(data) {
        if (!data.config) {
          console.log('Server error occured.');
        }
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  }


})();
