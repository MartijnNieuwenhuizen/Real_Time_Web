Router.route('/', function () {
	this.render('main');
});

Router.route('/nearby-places', function () {
	this.render('main');
});
// Router.route('/nearby-places/all', function () {
// 	this.render('main');
// });

// Router.route('/nearby-places/busy', function () {
// 	this.render('main');

// 	Template.placeList.helpers({
// 		place: function() {
// 			return Places.find({checkedIn: true}).fetch();
// 		}
// 	});
// });

// Router.route('/nearby-places/quiet', function () {
// 	this.render('main');

// 	Template.placeList.helpers({
// 		place: function() {
// 			return Places.find({checkedIn: false}).fetch();
// 		}
// 	});
// });