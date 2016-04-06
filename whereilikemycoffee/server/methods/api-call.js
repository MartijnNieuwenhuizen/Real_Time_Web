Meteor.methods({

	apiCall: function() {

		this.unblock(); // Don't let it be a Blocking Js Call

		// Create Url
		var apiUrl;
		var url = {
			BaseUrl: "https://api.foursquare.com/",
			explore: "v2/venues/explore",
			location: "ll=52.367153,4.893645",
			oath: "oauth_token=35PH4RM0KL4F5VJRXATA0UMJW20OGBNVLPTPKTNIEDKHDC4J&v=20160406",
			query: "query=coffee",
		}
		apiUrl = url.BaseUrl + url.explore + "?" + url.location + "&" + url.oath;

		// Make the call	
		try {
			
			var request = HTTP.get(apiUrl).data;
			return request;

		} catch (error) { return error; }

	}

});