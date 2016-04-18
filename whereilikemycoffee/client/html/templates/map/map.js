Meteor.startup(function() {  
    GoogleMaps.load();
});

Template.map.helpers({  
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(52.367153, 4.893645),
                zoom: 15
            };
        }
    }
});

var maps = {};

maps.setMarker = function(place, icon, map) {

    var _place = place;
    var _icon = icon;
    var _map = map;
    
    var marker = new google.maps.Marker({
        draggable: false,
        animation: google.maps.Animation.DROP,
        class: "maps-marker",
        position: new google.maps.LatLng(_place.latLong.lat, _place.latLong.long),
        map: _map.instance,
        id: _place._id,
        icon: _icon,
        currentCheckings: _place.currentCheckings
    });     

    return marker;     

}

maps.setInfoWindow = function(place, marker) {

    var _place = place;
    var _marker = marker;
    
    var infowindow = new google.maps.InfoWindow({
        content: _place.name,
        marker: _marker
    });

    return infowindow;

}

maps.setCheckinIcon = function(place) {

    var _place = place;
    
    var thisCurrentCheckings = _place.currentCheckings;
    var iconUrl;  
    var iconBaseUrl = "http://martijnnieuwenhuizen.nl/esp/img/";
    var iconType = {
        zero: "zero.svg",
        one: "one.svg",
        biggerThanOne: "bigger-than-one.svg",
        biggerThanFive: "bigger-than-five.svg",
        biggerThanTen: "bigger-than-ten.svg",
    }

    if ( thisCurrentCheckings === 0 ) {

        iconUrl = iconBaseUrl + iconType.zero;

    } else if ( thisCurrentCheckings === 1 ) {

        iconUrl = iconBaseUrl + iconType.one;

    } else if ( thisCurrentCheckings > 1 ) {

        iconUrl = iconBaseUrl + iconType.biggerThanOne;

    } else if ( thisCurrentCheckings > 5 ) {
        
        iconUrl = iconBaseUrl + iconType.biggerThanFive;

    } else if ( thisCurrentCheckings > 10 ) {
        
        iconUrl = iconBaseUrl + iconType.biggerThanTen;

    };

    return iconUrl;

}

maps.addListeners = function(marker, infoWindow, map) {

    var _marker = marker;
    var _infoWindow = infoWindow;
    var _map = map

    marker.addListener('mouseover', function() {
                    
        infoWindow.open(_map.instance, marker);

    });
    marker.addListener('mouseout', function() {
            
        infoWindow.close();

    });
    marker.addListener('click', function() {

        maps.resetMarkerDemo(_marker, map);

    });

}

maps.resetMarker = function (marker, map, newCheckinNumber) {
    
    var _marker = marker;
    var _map = map;
    var _newCheckinNumber = newCheckinNumber;
    var place = {
        currentCheckings: _newCheckinNumber
    }

    _marker.setMap(null);
    _marker.animation = google.maps.Animation.DROP;
    _marker.currentCheckings = _newCheckinNumber;
    _marker.icon = maps.setCheckinIcon(place);
    _marker.setMap(_map.instance);
    
}

maps.resetMarkerDemo = function (marker, map) {
    
    var _marker = marker;
    var _map = map;
    var place = {
        currentCheckings: _marker.currentCheckings + 1
    }

    _marker.setMap(null);
    _marker.currentCheckings = _marker.currentCheckings + 1;
    _marker.icon = maps.setCheckinIcon(place);
    _marker.animation = google.maps.Animation.DROP;
    _marker.setMap(_map.instance);
    
}



Template.map.onCreated(function() {

  	GoogleMaps.ready('map', function(map) {
    		
    	var allPlacesInDB = Places.find().fetch();
    	allPlacesInDB.forEach(function(singlePlace) {

    	    var _thisPlace = singlePlace;

            var infoWindow = maps.setInfoWindow(_thisPlace, marker);
            var iconUrl = maps.setCheckinIcon(_thisPlace);
            var marker = maps.setMarker(_thisPlace, iconUrl, map);

            maps.addListeners(marker, infoWindow, map);

            Meteor.setInterval(function() {

                if ( Places.findOne({_id: marker.id}) ) {

                    var thisMarkerInDb = Places.findOne({_id: marker.id});

                    if ( thisMarkerInDb.currentCheckings != marker.currentCheckings ) {

                        console.log(marker.id, " needs a change");
                        console.log(marker.id, " current: ", marker.currentCheckings);
                        console.log(marker.id, " current: ", thisMarkerInDb.currentCheckings);

                        var newCheckinNumber = thisMarkerInDb.currentCheckings;
                        maps.resetMarker(marker, map, newCheckinNumber);


                    }
                }

            }, 10000);

    	});

    });

});