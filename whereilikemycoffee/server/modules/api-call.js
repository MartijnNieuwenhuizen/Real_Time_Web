export var foursquare = {};

foursquare.apiCall = function() {
	
	// Create Url
	var apiUrl;
	var url = {
		BaseUrl: "https://api.foursquare.com/",
		explore: "v2/venues/explore",
		location: "ll=52.367153,4.893645",
		// location: "ll=40.773122,-73.957780",
		oath: "oauth_token=35PH4RM0KL4F5VJRXATA0UMJW20OGBNVLPTPKTNIEDKHDC4J&v=20160413",
		query: "query=coffee",
	}
	apiUrl = url.BaseUrl + url.explore + "?" + url.location + "&" + url.oath;

	// Make the call	
	try {
		
		var request = HTTP.get(apiUrl).data;
		return request;

	} catch (error) { return error; }

}

foursquare.insertPlace = function(place) {

	var _place = place;

	Places.insert({
		name: _place.venue.name,
		latLong: {
			lat: _place.venue.location.lat,
			long: _place.venue.location.lng
		},
		adress: {
			street: _place.venue.location.address,
			city: _place.venue.location.city,
			country: _place.venue.location.country,
			zipCode: _place.venue.location.postalCode,
			distance: _place.venue.location.distance
		},
		id: _place.venue.id,
		rating: _place.venue.rating,
		url: _place.venue.url,
		// currentCheckings: _place.venue.hereNow.count,
		currentCheckings: _place.venue.hereNow.count,
		checkedIn: function() {
			if( _place.venue.hereNow.count != 0 ) {
				return "true"
			}
			
		}
	});	

}

foursquare.updatePlace = function(place, newCheckinCount, dbId) {

	var _place = place;
	var _newCheckinCount = newCheckinCount;
	var _dbId = dbId

	console.log(_place.venue.name, " Needs an update");
	console.log("Old Count: ", _place.venue.hereNow.count, " New Count: ", _newCheckinCount);

	Places.update({_id: _dbId}, {
		name: _place.venue.name,
		latLong: {
			lat: _place.venue.location.lat,
			long: _place.venue.location.lng
		},
		adress: {
			street: _place.venue.location.address,
			city: _place.venue.location.city,
			country: _place.venue.location.country,
			zipCode: _place.venue.location.postalCode,
			distance: _place.venue.location.distance
		},
		id: _place.venue.id,
		rating: _place.venue.rating,
		url: _place.venue.url,
		currentCheckings: _newCheckinCount,
		checkedIn: function() {
			if( _newCheckinCount != 0 ) {
				return "true"
			}
			
		}
	});	

}

foursquare.checkCurrentCheckins = function(place, checkID) {

	var _place = place;
	var _checkID = checkID;

	var dbId = _checkID._id;	
	var dbCheckinCount = _checkID.currentCheckings;
	var APICheckinCount = _place.venue.hereNow.count;

	if ( dbCheckinCount != APICheckinCount ) { 

		foursquare.updatePlace(_place, APICheckinCount, dbId);

	}

}

foursquare.setData = function() {
	
	var data = foursquare.apiCall();
	var places = data.response.groups[0].items; 

	places.forEach(function(place) {

		var _place = place; // The item form the api Call
		var checkID = Places.findOne({id: _place.venue.id}); // the item form the DB
			
		if ( !checkID ) {

			foursquare.insertPlace(_place);

		} else {

			foursquare.checkCurrentCheckins(_place, checkID);

		}

	});

}