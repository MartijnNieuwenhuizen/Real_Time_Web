// Template.nearbyPlaces.helpers({  
// 	selector: function() {
// 		var mainNav = document.querySelector('.main-nav');
// 		console.log("mainNav");		
// 	}
// });
Template.main.rendered = function() {
    if(!this._rendered) {
    	this._rendered = true;
      
    	var mainNav = document.querySelector('.main-nav');
    	var disabledNavElements = document.querySelectorAll('.main-nav .disabled');

    	Array.prototype.forEach.call(disabledNavElements, function(el) {
    		console.log(el);
    		el.onclick = function(e) {
    			e.preventDefault();
    		}
    	});

    }
}