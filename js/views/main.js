
// the main controller class.
App.Main = {
	
	
	// controls display of body of page
	display: function(endpoint, mediaID, userID, query) {
		$(".simplebutton").removeClass("active");
		
		switch(endpoint) {
				case "media/popular":
				// if view already exists
				if (App.views.popular) {
					App.views.popular.render(); // just render view
				} else { // create collection, view , fetch data.
					App.collections.popular = new App.Collections.Users([],{query: endpoint + "?"}); 
					App.collections.popular.fetch({success: function(users, response){
						App.views.popular = new App.Views.UserDisplay({collection: App.collections.popular}); 
					 	}
					 }); 
				}
				
				$("#popularLink").addClass("active");
	
				break;
				
				case "users/self/feed":
				
					if (App.views.feed) {
						App.views.feed.render();
					} else {
						App.collections.feed = new App.Collections.Users([],{query: endpoint + "?"}); 
						App.collections.feed.fetch({success: function(users, response){
							App.views.feed = new App.Views.UserDisplay({collection: App.collections.feed});
						}
					 	});
					}
				
					 $("#feedLink").addClass("active");
				
				break;
				
				case "users/self/media/recent/":
				
					if (App.views.mymedia) {
						App.views.mymedia.render();
					} else {
						App.collections.mymedia = new App.Collections.Users([],{query: endpoint + "?"}); 
						App.collections.mymedia.fetch({success: function(users, response){
							App.views.mymedia = new App.Views.UserDisplay({collection: App.collections.mymedia});
						}
					 	});
					}				
			
					$("#meLink").addClass("active");
					break;
				
				case "users/search":
					App.collections.usersearch = new App.Collections.Users([],{query: endpoint + "?q=" + query + "&"}); 
					App.collections.usersearch.fetch({success: function(users, response){
						App.views.usersearch = new App.Views.UserSearchDisplay({collection: App.collections.usersearch});
					}
					});
				break;
				
				case "tags":			
						App.collections.tags = new App.Collections.Users([],{query: endpoint + "/" + query + "/media/recent?"}); 
						App.collections.tags.fetch({success: function(users, response){
							App.views.tags = new App.Views.UserDisplay({collection: App.collections.tags});
						}
					 	});
				break;	
				
				
				case "locations":			
						App.collections.locations = new App.Collections.Users([],{query: endpoint + "/search?" + App.insta.settings.latlng + "&"}); 
						App.collections.locations.fetch({success: function(users, response){
							App.views.locations = new App.Views.LocationSearchDisplay({collection: App.collections.locations});
						}
					 	});
				break;	
				
				case "users/self":			
						App.collections.currentuser = new App.Collections.Users([],{query: endpoint + "?"}); 
						App.collections.currentuser.fetch({success: function(users, response){
							App.views.currentuser = new App.Views.CurrentUser({collection: App.collections.currentuser});
						}
					 	});
				break;	
				
				
				case "media": // for detailed info about media
						App.collections.mediadetail = new App.Collections.Users([],{query: endpoint + "/" + mediaID + "?"}); 
						App.collections.mediadetail.fetch({success: function(users, response){
							App.views.mediadetail = new App.Views.MediaDetail({collection: App.collections.mediadetail});
						}
					 	});
				break;	
				
				case "users": // for request /users/{user-id}/media/recent 
						App.collections.userrecent = new App.Collections.Users([],{query: endpoint + "/" + userID + "/media/recent?"}); 
						App.collections.userrecent.fetch({success: function(users, response){
							App.views.userrecent = new App.Views.UserDisplay({collection: App.collections.userrecent});
						}
					 	});
				break;	
				
				
			
		}
				
	}
}
