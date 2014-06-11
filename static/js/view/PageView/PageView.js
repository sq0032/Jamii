var app = app || {};

app.PageView = Backbone.View.extend({
	el: '#page-view',
	events: {
		//"click button"	: "toggleMenu",
	},
	initialize: function() {
		this.contentView = null;
		//this.listenTo(app.teamlist, "reset", this.renderTeamList);
		this.render();
	},
	render: function(){
	
	},
	test: function(){
		app.teamlist.each(function(team){
			alert(team.get('name'));
		});
	},
	renderTeamPage: function(id, name){
		this.cleanViews();
		var team = new app.Team({id:id});
		this.contentView = new app.TeamView({model:team});
		this.$el.html(this.contentView.el);
	},
	renderNewsFeed: function(){
		this.cleanViews();
		this.$el.html('NewsFeed');
	},
	cleanViews: function(){
		if(this.contentView!=null){
			this.contentView.remove();
			this.contentView = null;
		}
	},
});
