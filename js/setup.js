
/* ######## Classes  ####### */	

// everthing exists in App namespace.
// models, collections, routers classes in UPPERCASE and in own namespace  i.e. App.View.Photos
// instances of  models, collections and routers classes in lowercase also namespaced using App.photos_view



/* ###### top level controller class - pulls in everything else.  #########*/

App.Views.InstaView = Backbone.View.extend({ 
	initialize: function() {
			this.cookiecheck();
			this.router = new App.Routers.Routes();
	},
	
	render: function(){
		if (App.insta.settings.accesstoken){
			this.header = new App.Views.MenuAuth(); // see /js/views/menu.js
			if (!App.views.currentuser){
				App.Main.display("users/self");
			}
			App.insta.router.navigate("/feed/", {trigger: true});
			
		} else {
			this.header = new App.Views.MenuDefault();
			// display popular photos if not logged in
			App.insta.router.navigate("/popular/", {trigger: true});
			
		}; 
		
		 
		
	},
	
	settings: {
		// clientid: 'f5c6a010c64440e1bbd1fba3082581af' // insta.mungopod.com
		clientid: '865ab5fa377f4793bf7dcbb215758668' // localhost
	},
	
	cookiecheck: function(){
		var accesstoken = App.Helpers.readCookie('access_token');
		if (accesstoken){
			this.settings.accesstoken = accesstoken;	
		}
	}
	
});	


