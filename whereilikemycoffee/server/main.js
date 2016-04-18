import { Meteor } from 'meteor/meteor';
import { foursquare } from './modules/api-call';

Meteor.startup(() => {

	foursquare.setData();

	Meteor.setInterval(function(){
		console.log("checking");
		foursquare.setData();
	}, 10000);

});
