// Meteor.methods({
//     'userLocation': function(){

//         var userPosition = {
//             lat: 52.367153,
//             lng: 4.893645
//         };
//         // var userPosition = {
//         //     lat: 40.773122,
//         //     lng: -73.957780
//         // };
      
//         if ( Meteor.isClient ) {

//             try {
//                 return new Promise(function(resolve, reject) {

//                     if (navigator.geolocation) {
//                         navigator.geolocation.getCurrentPosition(showPosition);
//                     }
//                     function showPosition(position) {
//                         userPosition.lat = position.coords.latitude;
//                         userPosition.lng = position.coords.longitude;

//                         console.log(userPosition);

//                         Meteor.setTimeout(function() {
//                             resolve(userPosition);
//                         }, 500);
//                     }               

//                 });

//             } catch (error) { 
            
//                 return error; 

//             }

//         }

//         if ( Meteor.isServer ) {

//             try {
                
//                 return userPosition;

//             } catch (error) { 
            
//                 return error; 

//             }

//         }

//     }
// });