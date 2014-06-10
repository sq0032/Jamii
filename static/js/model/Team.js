var app = app || {};

app.Team = Backbone.Model.extend({
	defaults:{
		//id			: 'user_id',
		name		: 'team\' name',
		introduction: 'team\'s introduction',
		//email		: 'example@gmail.com',
		//thumbnail	: 'unknown path',
	},
	urlRoot: '/team/',
});

app.Teams = Backbone.Collection.extend({
	model	: app.Team,
	url		: '/teams',
});
