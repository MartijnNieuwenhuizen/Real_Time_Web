Meteor.startup(function() {  

    GoogleMaps.load();
    
});

Template.map.helpers({  
    mapOptions: function() {
        if ( GoogleMaps.loaded() ) {  
            return {
                center: new google.maps.LatLng(52.367153, 4.893645),
                zoom: 16
            };
        }
    }
});

var markers = [];
var maps = {};

maps.activateMethod = function(map) {

    Meteor.setTimeout(function() {
        var userPosition = {};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        function showPosition(position) {
            userPosition.lat = position.coords.latitude;
            userPosition.lng = position.coords.longitude;
        }

        // Do the Api Call and send the userLocation as a parameter
        Meteor.setTimeout(function() {

            Session.set("userPosLat", userPosition.lat);
            Session.set("userPosLng", userPosition.lng);

            map.setCenter(new google.maps.LatLng(userPosition.lat, userPosition.lng));

            Meteor.apply('apiCall', [userPosition], true, function(error, result){
            if (error) { console.log(error); } else {

                // console.dir(result);

            }
        });
        }, 1000);  

        Meteor.setInterval(function() {
            Meteor.apply('apiCall', [userPosition], true, function(error, result){
                if (error) { console.log(error); } else {

                    // console.dir(result);

                }
            });
        }, 10000) 

    }, 500);

}

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

    markers.push(marker);

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
    var iconBaseUrl = "./img/icons/";
    var iconType = {
        zero: "zero.svg",
        one: "1.svg",
        two: "2.svg",
        three: "3.svg",
        four: "4.svg",
        five: "5.svg",
        biggerThanFive: "more-than-5.svg",
        biggerThanTen: "more-than-10.svg"
    }

    if ( thisCurrentCheckings === 0 ) {

        iconUrl = iconBaseUrl + iconType.zero;

    } else if ( thisCurrentCheckings === 1 ) {

        iconUrl = iconBaseUrl + iconType.one;
    
    } else if ( thisCurrentCheckings === 2 ) {

        iconUrl = iconBaseUrl + iconType.two;

    } else if ( thisCurrentCheckings === 3 ) {

        iconUrl = iconBaseUrl + iconType.three;

    } else if ( thisCurrentCheckings === 4 ) {

        iconUrl = iconBaseUrl + iconType.four;

    } else if ( thisCurrentCheckings === 5 ) {

        iconUrl = iconBaseUrl + iconType.five;

    } else if ( thisCurrentCheckings > 5 && thisCurrentCheckings <= 10 ) {
        
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

    maps.notificationSound();
    
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

maps.notificationSound = function() {

    var notificationAudio = new Audio('./sounds/notification.mp3');
    notificationAudio.play();

}

maps.setFilters = function() {
        
    var allButton = document.querySelector('.sidebar-choices .all');
    var busyButton = document.querySelector('.sidebar-choices .busy');
    var quietButton = document.querySelector('.sidebar-choices .quiet');

    allButton.addEventListener('click', maps.showFilterResults, false);
    busyButton.addEventListener('click', maps.showFilterResults, false);
    quietButton.addEventListener('click', maps.showFilterResults, false);

}

maps.showSingleItem = function(item) {
    
    var _item = item;
    item.classList.add("show");
    item.classList.remove("hide");

}

maps.hideSingleItem = function(item) {
    
    var _item = item;
    item.classList.add("hide");
    item.classList.remove("show");

}

maps.showFilterSidebarResults = function(hash) {

    var _hash = hash;
    
    var sidebarPlaces = document.querySelectorAll('.place-list--item');
    Array.prototype.forEach.call(sidebarPlaces, function(sidebarPlace) {

        var item = sidebarPlace;
        var checkinData = item.dataset.currentCheckins;

        if ( _hash === "busy" ) {
            if ( checkinData >= 1 ) {
                maps.showSingleItem(item);    
            } else {
                maps.hideSingleItem(item);
            }
        } else if ( _hash === "quiet" ) {
            if ( checkinData < 1 ) {
                maps.showSingleItem(item);
            } else {
                maps.hideSingleItem(item);
            }
        } else if ( _hash === "all" ) {
            maps.showSingleItem(item);
        }

    });

}

maps.showFilterResults = function(hash) {

    var _hash = window.location.hash.slice(1);
    var checkValue;
    var selectedPlaces = [];

    if ( this.hash ) { 
        _hash = this.hash.slice(1); 
    }

    maps.showFilterSidebarResults(_hash);

    if ( _hash === "busy" ) {
        checkValue = true;
    } else if ( _hash === "quiet" ) {
        checkValue = false;
    } else if ( _hash === "all" ) {
        
        markers.forEach(function(spesificMarker) {

            spesificMarker.setVisible(true);

        });
        return;

    }
    else {
        markers.forEach(function(spesificMarker) {

            spesificMarker.setVisible(true);

        });
        return;        
    }

    if ( Places.find({checkedIn: checkValue}) ) {

        var busyPlaces = Places.find({checkedIn: checkValue}).fetch();
        busyPlaces.forEach(function(item) {

            placeId = item._id;
            selectedPlaces.push(placeId);

        });

        markers.forEach(function(spesificMarker) {

            markerId = spesificMarker.id;
            
            if ( selectedPlaces.indexOf(markerId) != -1 ) {

                spesificMarker.setVisible(true);

            } else {
                        
                spesificMarker.setVisible(false);

            }

        });
            
    }

}


Template.map.onCreated(function() {

  	GoogleMaps.ready('map', function(map) {

        maps.setFilters();
        maps.activateMethod(map.instance);

        Meteor.setTimeout(function() {
            var currentLat = Session.get("userPosLat");
            var currentLng = Session.get("userPosLng");
            
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
                        
                        // console.log("CHECKING");

                        if ( thisMarkerInDb.currentCheckings != marker.currentCheckings ) {

                            // console.log(marker.id, " needs a change");
                            // console.log(marker.id, " current: ", marker.currentCheckings);
                            // console.log(marker.id, " new: ", thisMarkerInDb.currentCheckings);

                            var newCheckinNumber = thisMarkerInDb.currentCheckings;
                            maps.resetMarker(marker, map, newCheckinNumber);

                        }
                    }

                }, 5000);

            });
        }, 1500);

        maps.showFilterResults();

    });

});