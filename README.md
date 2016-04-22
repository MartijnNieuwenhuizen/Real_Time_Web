# Real Time Web
## Where I Like My Coffee
Where I Like My Coffee is an App that shows you the best coffee places in town and let you discover the city by a view cups of coffee. The feature that distinguishes it with other coffee ranking sites is the real-time feature. This feature uses the Foursquare API (later other data sources will be added) to show you which places/parts of the city are busy.
This concept can later be transferred to show your where to drink a Beer, and so on.

**Possible features are:**
Show real-time login from people to a new place on Google Maps.
Add 3th party data from other Coffee Ranking sites
Rank a Coffee place on the following items:

* How's the Coffee (strong, surprising and so on)
* Did you get a glass of water with your coffee
* How was the service
* How's the location (terrace, view and so on)

### The Core Feature
See the coffee places in your neighborhood and check where you can drink a coffee (busy OR quiet). This is realtime data so you can see realtime where People are checking in, and the amount of people checked in at one place.

The Foursquere API is now used to generate this data, unfortunately the Instagram API wasn't workable, but in the future, I also want to add the Twitter and Facebook API to show even more accurate numbers.
![Roadmap](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/blob/feature/places/readme_images/roadmap.jpg "Roadmap")

### Branches
* feature/realtime-checkin [RealTime Instagram checkin](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/realtime-checkin)
* feature/places [Show all the places](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/places)
* feature/google-maps [Show all the places on the map and the realtime checkins with Foursquere](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/google-maps)
* Server [The code running on the Digital Ocean server](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/places)

# Setup
	* CLIENT
		* html
			* views
				* base
				* map 
				* places
					* place-list-item.html
					* place-list.html
					* place-list.js
					
			* pages
				* nearby-places
		
		* sass
			* base // contains all the basic styling elements
				* colors
				* layout
				* typografie

			* components
				* links
				* lists

			* modules
				* home
				* js
				* main-nav
				* map-container
				* place-list
				* place-list--item
				* sidebar
				* sidebar--choices

	* LIB
		* collections
			* places

		* methods
			* apiCall

		* router
			routers

	* PUBLIC
		* img
			* icons

		* sounds

	* SERVER
		* main


Every HTML template is stored in a single map. If a template contains a detail-page, it's in the same map with a  --detail addition. The Sass is stored in a Sass file because it doesn't generates content contrary to the html and js.

All the methods and collections are stored in the lib folder so both the server and the client can use them.

# Meteor setting
Autopublish and insecure are removed from meteor at the server branch. This is done for security reasons. To make the app still workable, PubSub and Methods are set.