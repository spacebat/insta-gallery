(function($){

// app structure
window.App = {};
// for classess 
App.Models = {};
App.Collections = {};
App.Views = {};
App.Routers = {};

// for class instances
App.collections = {};
App.views = {};




// helper functions
App.Helpers = {

	createCookie: function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	
	readCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	
	eraseCookie: function(name) {
		App.Helpers.createCookie(name,"",-1);
	},
	
	getaccessToken: function(id){
		var string = id;
		if (string.indexOf('access_token') != -1 ){ 
			var nvPairs = string.split("=");
			return nvPairs[1];
		} else {
			return null;
		}
	},
	
	
	
	timeConverter : function (UNIX_timestamp){
	 var a = new Date(UNIX_timestamp*1000);
	 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		 var year = a.getFullYear();
		 var month = months[a.getMonth()];
		 var date = a.getDate();
		 var hour = a.getHours();
		 var min = a.getMinutes();
		 var sec = a.getSeconds();
		 var time = date+','+month+' '+year+' '+hour+':'+min+':'+sec ;
		 return time;
	 },
	
	
	geoLookup: function(address) {
		
			// var latlng = new google.maps.LatLng();
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				  
				  var lat = results[0].geometry.location.Oa;
				  var lng = results[0].geometry.location.Pa;
					  
				  var latlng =  "lat=" + lat + "&lng=" + lng;
				  App.insta.settings.latlng = latlng;
				  App.Main.display("locations");
	
			  } else {
				console.log ("Geocoder failed due to: " + status);
			  } 
			 });
	
	},
	
	reverseGeo: function (location) {
			var lat = location.latitude;
			var lng = location.longitude;
			var latlng = new google.maps.LatLng(lat, lng);
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'latLng': latlng}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				  var address = results[0].formatted_address;
				  
				    App.insta.settings.address = address;
					App.views.mediadetail.render(); // render the media detail view again once address data is ready
	
			  } else {
				console.log ("Geocoder failed due to: " + status);
			  } 
			 });
	
	}

};

})(jQuery);