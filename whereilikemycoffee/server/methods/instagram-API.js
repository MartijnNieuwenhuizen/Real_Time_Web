Meteor.methods({

	instagramAPI: function(url) {

		this.unblock(); // Don't let it be a Blocking Js Call

		var apiUrl = url;

		// Make the call	
		try {
			
			var request = HTTP.get(apiUrl).data;
			return request;

		} catch (error) { return error; }

	}

});