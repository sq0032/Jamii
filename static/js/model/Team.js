var app = app || {};

app.TaskCard = Backbone.Model.extend({
	defaults:{
		id			: 'taskcardid',
		name		: 'taskcard',
		order		: 0,
	}
});

app.TaskCards = Backbone.Collection.extend({
	model	: app.TaskCard,
	url		: function(){
		return '/taskboard/card';
	},
});

app.TaskList = Backbone.Model.extend({
	defaults:{
		id		: 'tasklistid',
		name	: 'tasklist',
		order	: 0,
	},
	initialize: function(){
		this.cards = new app.TaskCards;
		this.cards.url = 'taskboard/list/'+this.id;
		//this.card
	},
});

app.TaskLists = Backbone.Collection.extend({
	model	: app.TaskList,
	url		: '/taskboard/list/'
});

app.TaskBoard = Backbone.Model.extend({
	defaults:{
		id		: 'taskboardid',
		name	: 'taskboard',
	},
	url:function(){
		return '/taskboard/'+this.id;
	}
});


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
