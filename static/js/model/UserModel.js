var app = app || {};

app.UserModel = Backbone.Model.extend({
	defaults:{
		name: 'username',
	},
	urlRoot:'user/',
});
