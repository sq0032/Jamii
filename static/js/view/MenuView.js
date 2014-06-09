var app = app || {};

app.MenuView = Backbone.View.extend({
	el: '#menu',
	events: {
		//"click button"	: "toggleMenu",

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
			var html = '<a href="#'+team.get('href')+'" class="list-group-item">'+team.get('name')+'</a>';
			that.$("#team-menu").append(html);
		});
	},
});
