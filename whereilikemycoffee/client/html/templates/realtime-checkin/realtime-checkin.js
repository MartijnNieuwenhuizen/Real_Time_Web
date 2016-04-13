Template.realtimeCheckinList.helpers({
	Location: function() {
		return Locations.find().fetch();
	}
})