import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	// scripts that need to start on the start of the server
	Meteor.call('apiCall', function (error, result) { 

		// create this function elsewhere
		function insertPlace(place) {

			var _this = place;

			Places.insert({
				name: _this.venue.name,
				latLong: {
					lat: _this.venue.location.lat,
					long: _this.venue.location.lng
				},
				adress: {
					street: _this.venue.location.address,
					city: _this.venue.location.city,
					country: _this.venue.location.country,
					zipCode: _this.venue.location.postalCode,
					distance: _this.venue.location.distance
				},
				id: _this.venue.id,
				rating: _this.venue.rating,
				url: _this.venue.url,
				currentCheckings: _this.venue.hereNow.count
			});	

		}

		if (error) {
			console.log(error);
		} else {	

			var places = result.response.groups[0].items;
			places.forEach(function(place) {

				var _this = place;
				var checkID = places.findOne({id: _this.venue.id});

				if ( !checkID ) {

					insertPlace(_this);

				} else {

					Places.remove(checkID); // Remove item
					insertPlace(_this); // Reïnsert Item

				}

			});
		}
	});

});
