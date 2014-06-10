var app = app || {};

//MenuView renders menu when teamlist and control lists are loaded, and calls PageView to render page content when a menu item is clicked.

app.MenuView = Backbone.View.extend({
	el: '#menu',
	events: {
		"click #user-menu a"		: "openUserPage",
		"click #team-menu a"		: "openTeamPage",
		"click #network-menu a"	: "openNewWorkPage",
	},
	initialize: function() {
		
		this.listenTo(app.teamlist, "reset", this.renderTeamList);
		this.render();
	},
	render: function(){
		
	},
	test: function(){
		app.teamlist.each(function(team){
			alert(team.get('name'));
		});
	},
	renderTeamList: function(){
		this.$("#team-menu").html('');
		var that = this;
		
		app.teamlist.each(function(team){
			var id		= team.get('id');
			var name	= team.get('name');
		
			var html 	= '<a href="#team/'+id+'" class="list-group-item" teamid="'+id+'">'+name+'</a>';
			that.$("#team-menu").append(html);
		});
	},
	openUserPage: function(e){
		var element = $(e.currentTarget);
		//alert('news');
		this.parentView.pageView.renderNewsFeed();
	},
	openTeamPage: function(e){
		var element = $(e.currentTarget);
		var teamid 	= element.attr('teamid');
		var name	= element.html();

		this.parentView.pageView.renderTeamPage(teamid, name);
	},
	/*
	openNewWorkPage: function(e){
		var element = $(e.currentTarget);
		this.parentView.pageView.renderTeamPage();
	},*/
});
