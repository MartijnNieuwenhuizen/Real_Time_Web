// export var foursquare = {};

// // foursquare.apiCall = function(location) {
	
// // 	// Create Url
// // 	var apiUrl;
// // 	var url = {
// // 		BaseUrl: "https://api.foursquare.com/",
// // 		explore: "v2/venues/explore",
// // 		location: "ll=" + location.lat + "," + location.lng,
// // 		// location: "ll=40.773122,-73.957780",
// // 		oath: "oauth_token=35PH4RM0KL4F5VJRXATA0UMJW20OGBNVLPTPKTNIEDKHDC4J&v=20160413",
// // 		query: "query=coffee",
// // 	}
// // 	apiUrl = url.BaseUrl + url.explore + "?" + url.location + "&" + url.oath;

// // 	// Make the call	
// // 	try {
		
// // 		var request = HTTP.get(apiUrl).data;
// // 		return request;

// // 	} catch (error) { return error; }

// // }

// foursquare.insertPlace = function(place, location) {

// 	var _place = place;
// 	var _location = location;
// 	var lat = _location.lat;
// 	var lng = _location.lng;
// 	console.log(_location);
//     // var numLoc = lat.toString() + lng.toString();

// 	Places.insert({
// 		name: _place.venue.name,
// 		latLong: {
// 			lat: _place.venue.location.lat,
// 			long: _place.venue.location.lng
// 		},
// 		adress: {
// 			street: _place.venue.location.address,
// 			city: _place.venue.location.city,
// 			country: _place.venue.location.country,
// 			zipCode: _place.venue.location.postalCode,
// 			distance: _place.venue.location.distance
// 		},
// 		// currentUserLocation: numLoc,
// 		id: _place.venue.id,
// 		rating: _place.venue.rating,
// 		url: _place.venue.url,
// 		currentCheckings: _place.venue.hereNow.count,
// 		checkedIn: (_place.venue.hereNow.count > 0) ? true : false // Thx Cas for this inline if-statement
// 	});	

// }

// foursquare.updatePlace = function(place, newCheckinCount, dbId, location) {

// 	var _place = place;
// 	var _newCheckinCount = newCheckinCount;
// 	var _dbId = dbId;
// 	var _location = location;
// 	var lat = _location.lat;
// 	var lng = _location.lng;
// 	console.log(_location);
//     // var numLoc = lat.toString() + lng.toString();

// 	console.log(_place.venue.name, " Needs an update");
// 	console.log("Old Count: ", _place.venue.hereNow.count, " New Count: ", _newCheckinCount);

// 	Places.update({_id: _dbId}, {
// 		name: _place.venue.name,
// 		latLong: {
// 			lat: _place.venue.location.lat,
// 			long: _place.venue.location.lng
// 		},
// 		adress: {
// 			street: _place.venue.location.address,
// 			city: _place.venue.location.city,
// 			country: _place.venue.location.country,
// 			zipCode: _place.venue.location.postalCode,
// 			distance: _place.venue.location.distance
// 		},
// 		// currentUserLocation: numLoc,
// 		id: _place.venue.id,
// 		rating: _place.venue.rating,
// 		url: _place.venue.url,
// 		checkedIn: (_newCheckinCount > 0) ? true : false
// 	});	

// }

// foursquare.checkCurrentCheckins = function(place, checkID, location) {

// 	var _place = place;
// 	var _checkID = checkID;
// 	var _location = location

// 	var dbId = _checkID._id;	
// 	var dbCheckinCount = _checkID.currentCheckings;
// 	var APICheckinCount = _place.venue.hereNow.count;

// 	if ( dbCheckinCount != APICheckinCount ) { 

// 		foursquare.updatePlace(_place, APICheckinCount, dbId, _location);

// 	}

// }

// foursquare.setData = function(data, location) {

	
// 	var _data = data;
// 	var _location = location;
// 	var places = _data.response.groups[0].items; 

// 	places.forEach(function(place) {

// 		var _place = place; // The item form the api Call
// 		var checkID = Places.findOne({id: _place.venue.id}); // the item form the DB
			
// 		if ( !checkID ) {

// 			foursquare.insertPlace(_place, location);

// 		} else {

// 			foursquare.checkCurrentCheckins(_place, checkID, location);

// 		}

// 	});

// }