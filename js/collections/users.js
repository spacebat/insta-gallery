
	
/* collections */
App.Collections.Users = Backbone.Collection.extend({
    model: App.Models.User,
    initialize: function(models, options) {
        this.query = options.query;
    },
    url: function() {

		if (App.settings.accesstoken) {				
			this.token = "access_token=" + App.settings.accesstoken;	
		} else {
			this.token = "client_id=" + App.settings.clientid; // un-auth'ed query
		}
		 
        var request = "https://api.instagram.com/v1/" + this.query + this.token + "&callback=?";	
		return request;
    },
    parse: function(response) {
        return response.data;
    }
});
