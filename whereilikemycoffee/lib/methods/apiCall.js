Meteor.methods({
    'apiCall': function(userPosition){
		
		var apiUrl;
		var url = {
			BaseUrl: "https://api.foursquare.com/",
			explore: "v2/venues/explore",
			location: "ll=" + userPosition.lat + "," + userPosition.lng,
			oath: "oauth_token=35PH4RM0KL4F5VJRXATA0UMJW20OGBNVLPTPKTNIEDKHDC4J&v=20160413",
			query: "query=coffee",
		}
		apiUrl = url.BaseUrl + url.explore + "?" + url.location + "&" + url.oath;

		// Make the call	
		try {
			
			var request = HTTP.get(apiUrl).data;
			request.currentLocation = userPosition;

			if (Meteor.isServer) {

				var _result = request;
				var _location = userPosition;
				var places = _result.response.groups[0].items; 

				places.forEach(function(place) {

					var _place = place; // The item form the api Call
					var checkID = Places.findOne({id: _place.venue.id}); // the item form the DB
						
					if ( !checkID ) {
						
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
							currentUserLocation: {
								lat: _location.lat,
								lng: _location.lng
							},
							id: _place.venue.id,
							rating: _place.venue.rating,
							url: _place.venue.url,
							currentCheckings: _place.venue.hereNow.count,
							checkedIn: (_place.venue.hereNow.count > 0) ? true : false // Thx Cas for this inline if-statement
						});	

					} else {

						var dbId = checkID._id;	
						var dbCheckinCount = checkID.currentCheckings;
						var APICheckinCount = _place.venue.hereNow.count;

						if ( dbCheckinCount != APICheckinCount ) { 

							console.log(_place.venue.name, " Needs an update");
							console.log("Old Count: ", _place.venue.hereNow.count, " New Count: ", APICheckinCount);

							Places.update({_id: dbId}, {
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
								currentUserLocation: {
									lat: _location.lat,
									lng: _location.lng
								},
								id: _place.venue.id,
								rating: _place.venue.rating,
								url: _place.venue.url,
								currentCheckings: APICheckinCount,
								checkedIn: (APICheckinCount > 0) ? true : false

							});	

						}

					}

				});

			}

			return request;


		} catch (error) { return error; }


	}
});