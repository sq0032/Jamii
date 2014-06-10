var app = app || {};

app.User = Backbone.Model.extend({
	defaults:{
		//id			: 'user_id',
		name		: 'name',
		firs_name	: 'first_name',
		last_name	: 'last_name',
		email		: 'example@gmail.com',
		thumbnail	: 'unknown path',
		teams		: '',
	},
	/*
	initialize: function(){
		var that = this;
		this.teams = new app.Teams();
		this.teams.url = function(){
			return 'account/'+that.id+'/teams/';
		}
	},*/
	urlRoot:'/account/',
});
