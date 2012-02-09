(function($){

// JavaScript Document/* routers */
App.Routers.Routes = Backbone.Router.extend({
		routes: {
			'': 'home',
			':id' : 'auth',
			'/mediadetail/:id': 'mediadetail',
			'/user/:id': 'userdetail',
			'/myphotos/' : 'myphotos',
			'/popular/' : 'popular',
			'/feed/' : 'feed',
			'/tagsearch/:id': 'tagsearch',
			'/usersearch/:id': 'usersearch',
			'/locationsearch/:id': 'locationsearch'			
		},
		
		
		home: function() {
			App.insta.render();
			console.log("home");
		},
		
		auth: function(id) {
			console.log("auth");
			var access_token = App.Helpers.getaccessToken(id);
			App.Helpers.createCookie('access_token',access_token,14);
			App.insta.settings.accesstoken = access_token;
			App.insta.render();	
		},
		
		mediadetail: function(id) {
			console.log("media detail for photo: " + id);
			App.Main.display("media" , id);
		},
		
		userdetail: function(id) {
			console.log("user detail for photo: " + id);
			App.Main.display("users",null,id);
		},
		
		myphotos: function(){
			App.Main.display("users/self/media/recent/");
		},
		
		popular: function(){
			App.Main.display("media/popular");	
		},
		
		feed: function() {
			App.Main.display("users/self/feed");
		},
		
		tagsearch: function(id) {
			App.Main.display("tags", null, null, id);	
		},
		
		usersearch: function(id){
			App.Main.display("users/search" , null, null, id);
		},
		locationsearch: function(id){
			console.log("location search" + id);
			// App.Main.display("locations", null, null, id);
		}
	})


})(jQuery);