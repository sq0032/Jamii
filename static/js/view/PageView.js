var app = app || {};

app.TeamView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.render();
		alert(this.options.magic);
	},
	render: function(){
		this.$el.html('hello testview');
	},
});

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
		//var team = new app.Team()
		//this.contentView = new app.testView({magic:true});
		this.$el.html(id+name);
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
