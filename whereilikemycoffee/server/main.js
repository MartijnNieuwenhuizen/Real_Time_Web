import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	function serverSideCall() {
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
					currentCheckings: _this.venue.hereNow.count,
					checkedIn: function() {
						if( _this.venue.hereNow.count != 0 ) {
							return "true"
						}
						
					}
				});	

			}

			if (error) {
				console.log(error);
			} else {	

				console.log("Checking");

				var places = result.response.groups[0].items;
				places.forEach(function(place) {

					var _this = place; // The item form the api Call
					var checkID = Places.findOne({id: _this.venue.id}); // the item form the DB

					if ( !checkID ) {
						insertPlace(_this);
					} else {
						var dbId = checkID._id;

						var dbCheckinCount = checkID.currentCheckings;
						var APICheckinCount = _this.venue.hereNow.count;	

						if ( !checkID ) {

							console.log("New Item");
							insertPlace(_this);
						}
						// } else if ( dbCheckinCount != APICheckinCount ) {
							
						// 	console.log(_this.venue.name, " Needs an update");
						// 	console.log(Places.findOne({_id: dbId}));

						// 	Places.update({_id: dbId}, {currentCheckings: APICheckinCount});

						// 	// Places.update({id: dbId}, {
						// 	// 		currentCheckings: APICheckinCount,
						// 	// 		checkedIn: function() {
						// 	// 			if( APICheckinCount =! 0 ) {
						// 	// 				console.log(_this.venue.name);
						// 	// 				console.log(APICheckinCount);
						// 	// 				return "true"
						// 	// 			}
						// 	// 		}
						// 	// });
						// // 	// Places.update({_id: _this.venue.id}, { currentCheckings: APICheckinCount });
						// }
					}

				});
			}
		});
	}

	serverSideCall();

	Meteor.setInterval(function(){
		serverSideCall();
	}, 10000);

});
