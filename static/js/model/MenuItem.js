var app = app || {};

app.MenuItem = Backbone.Model.extend({
	defaults:{
		//id			: 'user_id',
		name		: 'name',
		href		: '/',
	},
});


app.TeamList = Backbone.Collection.extend({
	model	: app.MenuItem,
	url		: function(){
				return 'account/teams/'},
});
