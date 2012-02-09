
/* ######## Classes  ####### */	

// everthing exists in App namespace.
// models, collections, routers classes in UPPERCASE and in own namespace  i.e. App.View.Photos
// instances of  models, collections and routers classes in lowercase also namespaced using App.photos_view



/* ###### top level view */
// checks cookies on page load
// checks login status on render call.
//   

App.Views.InstaView = Backbone.View.extend({ 
	initialize: function() {
		console.log("initialize app");
			this.cookiecheck();
	},
	
	
	render: function(){ // logged in
		if (App.settings.accesstoken){
			
			if (!this.header_auth) {
				this.header_auth = new App.Views.MenuAuth(); // show full menu
			}
			return true;
			
		} else { // not logged in
		
			console.log("not logged in");
			if (!this.header_noauth) {
				this.header_noauth = new App.Views.MenuDefault(); // display log in menu
			}
				return false;
			}; 
		
	},
	
	cookiecheck: function(){
		var accesstoken = App.Helpers.readCookie('access_token');
		if (accesstoken){
			App.settings.accesstoken = accesstoken;	
		}
	}
	
});	


