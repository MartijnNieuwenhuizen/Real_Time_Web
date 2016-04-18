detailPlace = {};

// setTimeout(function() {
// 	var amount = Places.find().count();
// 	var lastItem = DetailPlace.find({}, {skip: amount, limit: 1});
// 	console.log(bla); 
// 	// debugger;
// }, 1000);




detailPlace.addContent = function(content) {
	
	var _content = content;
	_content.inserted = true;
	
	console.log(_content._id);




	// var trackId = this._id;
	// Session.set('likedTrack', trackId);
	// var selectedSong = Session.get('likedTrack');
	// Tracks.update({_id: selectedSong}, {$inc: {scoreDislike: 1}});
	

}

// likeButton.onclick() {



// }





Template.detailPlace.helpers({
	place: function() {
		// var amount = Places.find().count();
		// return lastItem = Places.find({}, {skip: amount, limit: 1});
		return Places.find({ checkedIn: true }).fetch(); // last in the session
	}
});