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

### Roadmap
The Core idea or USP is "Show the best places in the town your in". This is being made in the branch [feature/places](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/places). Other features in the roadmap are added in the comming weeks.
![Roadmap](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/blob/feature/places/readme_images/roadmap.jpg "Roadmap")

### Branches
* feature/realtime-checkin [Show all the places](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/realtime-checkin)
* feature/places [Show all the places](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/places)
* feature/google-maps [Show all the places](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/google-maps)
* Server [The code running on the Digital Ocean server](https://github.com/MartijnNieuwenhuizen/Real_Time_Web/tree/feature/places)

# Setup
## client
*html*
	
	* views/template
		* map 
		* places

Every template has a own map, named after the template. Every map contains a/multiple html file(s) and a js file. They are combined becuase they both generate the contend in a template. The sass is seperated because this generates no content.


*sass*

	* base
	* components
	* modules

## public


## server

