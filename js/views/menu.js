(function($){

// view for menu once user has signed into to instagram 
App.Views.MenuAuth = Backbone.View.extend({ // perhaps bind this to a new menu model at some point?
	tagName: "nav",
	id: "controls",

	initialize: function() {
		_.bindAll(this, 'render', 'bytag' ,'events' , 'controls');
		this.template = _.template($('#auth-menu-tmpl').html());
		this.render();
		
	},
	events: { // using routes rather than events for the web app - 
		"click #logout" : "logout",
		"click #searchButton" : "search",
	},
	
	render: function(){
		$(this.el).html(this.template());
		var $menu = $("#menu");
		$menu.empty();
		$menu.append(this.el);
		// return this;
	},
	
	
	feed: function(){
		App.Main.display("users/self/feed");	
	},
	
	search: function(e){
		var $checked = $("input[name='searchtype']:checked")
		var searchfor = $checked.val();
		var query = $("#search").val();
		switch(searchfor) {
			case "tag":
			App.router.navigate("/tagsearch/" + query, {trigger: true});
			break;
			
			case "user":
			App.router.navigate("/usersearch/" + query, {trigger: true});
			break;
			
			case "location":
			App.Helpers.geoLookup(query);
			break;
			
		}
	},
	
	
	popular: function(){
		App.Main.display("media/popular");
	},
	
	
	logout: function(){
		App.Helpers.eraseCookie('access_token');
		App.settings.accesstoken = null;
		window.location = "http://localhost/~ptutty/insta-gallery/";
		return false;
	}
})




// view for default menu
App.Views.MenuDefault = Backbone.View.extend({
	tagName: "nav",
	id: "controls",
	initialize: function() {
		console.log("initialize default menu");
		_.bindAll(this, 'render');
		this.template = _.template($('#default-menu-tmpl').html());
		this.render();
		
	},
	
	render: function(){
		console.log("render default");
		$(this.el).html(this.template({}));
		
		$menu = $("#menu");
		$menu.empty();
		$menu.append(this.el);
		// return this;
		
	},
	
	events: {
		"click #popularLink"  : "popular",
	},
	
	
	popular: function(){
	
	}
	
	
})

})(jQuery);