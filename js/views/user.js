// this is where all the views live.

(function($){

// basically just iterates over a collection, creates a new view per model and puts it in ul.
App.Views.UserDisplay = Backbone.View.extend({
	initialize: function(){	
			_.bindAll(this, 'render');
			this.render();		
	},
	
	render: function() {
		var $ul = $("<ul>").addClass("gallery");	
		this.collection.each(function(user, index) {
			var item = new App.Views.User({model:user});
			var renderedContent = item.render().el;
			$ul.append(renderedContent);
		  })
		$container = $("#container");
		$container.empty();
		$container.append($ul);
    }
})

// basic user item
App.Views.User = Backbone.View.extend({
 	tagName: 'li',
	className: 'user_img',
 
	initialize: function(){	
			_.bindAll(this, 'render');
			this.template = _.template($('#caption-user-tmpl').html());
			this.render();		
	},
  
    render: function() {	
		this.renderedContent = this.template(this.model.toJSON());
		$(this.el).html(this.renderedContent);
			
			// rollover caption effect setup
			$caption = $(this.el).find('div.description');
			$caption.css('opacity', 0)  
					//..set width same as the image...  
				.css('width', $caption.siblings('img').width())  
				.parent().css('width', $caption.siblings('img').width())  
				.css('display', 'block');  
				return this; 	
    },
	
	events: {
			"mouseenter div.wrapper"   : "hoverOn",
			"mouseleave div.wrapper"   : "hoverOff",
		},
		
		
	hoverOn: function(e) { 
		//when mouse hover over the wrapper div  
				//get it's children elements with class description '  
				//and show it using fadeTo 
				$(this.el).find('div.description').stop().fadeTo(500, 0.7); 
			},
		
		
		hoverOff: function(e) { //when mouse out of the wrapper div  
				//use fadeTo to hide the div  
				$(this.el).find('div.description').stop().fadeTo(500, 0);
				}	
		
});

// basically just iterates over a collection, creates a new view per model and puts it in ul.
App.Views.UserSearchDisplay = Backbone.View.extend({
	initialize: function(){	
			_.bindAll(this, 'render');
			this.render();		
	},
	
	render: function() {
		var $ul = $("<ul>").addClass("gallery");	
		this.collection.each(function(user, index) {
			var item = new App.Views.UserSearch({model:user});
			var renderedContent = item.render().el;
			$ul.append(renderedContent);
		  })
		$container = $("#container");
		$container.empty();
		$container.append($ul);
    }
})


// for user search results
App.Views.UserSearch = App.Views.User.extend({
	initialize: function(){	
			_.bindAll(this, 'render');
			this.template = _.template($('#search-user-tmpl').html());
			this.render();		
	},
	events: {
			"click" : "user_recent"
		},
		
	user_recent: function(){
		var userID = this.model.get("id");
		App.Main.display("users" , null, userID);	
	}
		
});

// basically just iterates over a collection, creates a new view per model and puts it in ul.
App.Views.LocationSearchDisplay = Backbone.View.extend({
	initialize: function(){	
			_.bindAll(this, 'render');
			this.render();		
	},
	
	render: function() {
		var $ul = $("<ul>");	
		this.collection.each(function(user, index) {
			var item = new App.Views.LocationSearch({model:user});
			var renderedContent = item.render().el;
			$ul.append(renderedContent);
		  })
		$container = $("#container");
		$container.empty();
		$container.append($ul);
    }
})

// for user search results
App.Views.LocationSearch = App.Views.User.extend({
	initialize: function(){	
			_.bindAll(this, 'render');
			this.template = _.template($('#location-user-template').html());
			this.render();		
	},
	event: {
	 "click": "recent_user"	
	},
	
	
	recent_user: function() {
			var user_id = this.model.get("id");	
			App.Main.display("users",null, user_id);
	}
});

App.Views.CurrentUser = Backbone.View.extend({ 
	tagName: "div",
	id: "currentUser",

	initialize: function() {
		_.bindAll(this, 'render');
		this.template = _.template($('#current-user-template').html());
		this.render();	
	},
	
	render: function() {
		var collection = this.collection;
			this.renderedContent = this.template(collection.models[0].toJSON())
			$(this.el).html(this.renderedContent);
			$("#header").append(this.el);
			return this;
	},
	
});


// display details of a photo
App.Views.MediaDetail = Backbone.View.extend({
	
		tagName: 'section',
		id: 'main',
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($('#media-detail-template').html());
			this.model = this.collection.models[0].toJSON();
			if (this.model.location) {
				if (this.model.location.latitude){ 
				App.Helpers.reverseGeo(this.model.location);
				}
			} else {
				App.insta.settings.address = null;	
			}
			this.render();
					 
		},
	
		render: function() {	
			this.renderedContent = this.template(this.model);
			$(this.el).html(this.renderedContent);
			
			$container = $("#container");
			$container.empty();
			$container.append(this.el);
			return this; 	
		}
	})






})(jQuery);