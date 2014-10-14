define(function(require){
	var $ = require('jquery'),
		_ = require('underscore'),
		monster = require('monster'),
		toastr = require('toastr');

	var app = {
		name: 'vygr_app1',

		i18n: [ 'en-US' ],

        // Method used by the Monster-UI Framework, shouldn't be touched unless you're doing some advanced kind of stuff!
		load: function(callback){
			var self = this;

			self.initApp(function() {
				callback && callback(self);
			});
		},

		// Method used by the Monster-UI Framework, shouldn't be touched unless you're doing some advanced kind of stuff!
		initApp: function(callback) {
			var self = this;

			/* Used to init the auth token and account id of this app */
			monster.pub('auth.initApp', {
				app: self,
				callback: callback
			});
		},

		// Entry Point of the app
		render: function(container){
                        var self = this,
				container = container || $('#ws-content');

			// Get the initial dynamic data we need before displaying the app
			self.listDevices(function(data) {
				// Load the data in a Handlebars template
				var appTemplate = $(monster.template(self, 'layout', { devices: data }));

				// Once everything has been attached to the template, we can add it to our main container
				(container)
					.empty()
					.append(appTemplate);
			});                        
                        
		},
                
                // API Calls
		listDevices: function(callback) {
			var self = this;

			self.callApi({
				resource: 'device.list',
				data: {
					accountId: self.accountId
				},
				success: function(devices) {
					callback(devices.data);
				}
			});
		}
                
	};

	return app;
});
