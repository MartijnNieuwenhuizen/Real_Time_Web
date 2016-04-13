import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	// Create Url
	var instaUrl;
	var url = {
		baseUrl: "https://api.instagram.com/v1/",
		locations: "locations",
		search: "search",
		lat: "lat=52.374011",
		lng: "lng=4.900909",
		distance: "distance=750",
		acces: "access_token=38815121.a319c85.e732d3df1bb2462fb2806a3134914782"
	}
	instaUrl = url.baseUrl + url.locations + "/" + url.search + "?" + url.lat + "&" + url.lng + "&" + url.distance + "&" + url.acces;

	// scripts that need to start on the start of the server
	Meteor.call('instagramAPI', instaUrl, function (error, result) { 

		// create this function elsewhere
		function insertLocation(location) {

			var _this = location;
			var now = new Date();

			Locations.insert({
				id: _this.id,
				tag: _this.name,
				latLong: {
					lat: _this.latitude,
					long: _this.longitude
				},
				addedToLib: now
			});	

		}

		if (error) {

			console.log(error);

		} else {	
			
			var locations = result.data;
			locations.forEach(function(location) {

				var _this = location;

				var instaUserUrl;
				var url = {
					baseUrl: "https://api.instagram.com/v1/",
					media: "locations",
					id: _this.id,
					acces: "access_token=38815121.a319c85.e732d3df1bb2462fb2806a3134914782"
				}
				
				var checkID = Locations.findOne({id: _this.id}); // Check if ID isn't already in the Collection

				if ( !checkID && checkHash === 0 ) {

					insertLocation(_this);

				}

			});
		}
	});
	
});
