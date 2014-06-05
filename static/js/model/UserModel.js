var app = app || {};

app.UserModel = Backbone.Model.extend({
	defaults:{
		//id			: 'user_id',
		name		: 'name',
		firs_name	: 'first_name',
		last_name	: 'last_name',
		email		: 'example@gmail.com',
	},
	urlRoot:'/account/',
});
