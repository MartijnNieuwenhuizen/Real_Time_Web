Meteor.call('apiCall', function(error, response){ 
  	
	var data = response;

	var locationData = {
		location: data.response.headerFullLocation,
		amount: data.response.totalResults
	};
	
	var places = data.response.groups[0].items; // Create for each on this one

	Template.placeList.helpers({
		locationData: locationData
	});

});