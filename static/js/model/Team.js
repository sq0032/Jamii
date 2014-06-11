var app = app || {};

app.Team = Backbone.Model.extend({
	defaults:{
		id			: 'teamid',
		name		: 'team\' name',
		introduction: 'team\'s introduction',
		member		: [],
		leader		: 'leaderid',
		mentor		: [],
		msg_box		: 'boxid',
	},
	urlRoot: '/team/',
});

app.Teams = Backbone.Collection.extend({
	model	: app.Team,
	url		: '/teams',
});
