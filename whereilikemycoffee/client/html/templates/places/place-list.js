Template.placeList.helpers({
	place: function() {
		return Places.find().fetch();
	}
})
