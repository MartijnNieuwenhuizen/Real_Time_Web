Router.route('/', function () {
	this.render('main');
});

Router.route('/nearby-places', function () {
	this.render('nearbyPlaces');
});