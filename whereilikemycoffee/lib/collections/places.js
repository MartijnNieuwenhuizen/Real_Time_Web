Places = new Mongo.Collection('places');

if (Meteor.isServer) {
	Meteor.publish('thePlaces', function() {
		return Places.find();
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('thePlaces');
}