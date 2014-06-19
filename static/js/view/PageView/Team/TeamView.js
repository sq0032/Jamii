var app = app || {};

app.TeamView = Backbone.View.extend({
	tagName: 'div',
	events:{
	},
	initialize:function(){
		this.teamView = null
		this.team = this.model;	//this.model is passed from outside world
		//alert(this.team.get('id'));
		this.listenTo(this.team, "change", this.renderHomePage);
		//this.renderHomePage();
		
		this.team.fetch();
	},
	render: function(){
	},
	renderHomePage:function(){
		//alert(this.team.get('id'));
		this.cleanTeamPage();
		this.teamView = new app.TeamHomePageView({model:this.team});
		this.$el.html(this.teamView.el);
	},
	renderWorkspacePage:function(){
		this.cleanTeamPage();
		this.teamView = new app.TeamWorkspacePageView({model:this.team});
		this.$el.html(this.teamView.el);
	},
	renderInboxPage:function(){
		this.cleanTeamPage();
		this.teamView = new app.TeamInboxPageView();
		this.$el.html(this.teamView.el);
	},
	renderLearnPage:function(){
		this.cleanTeamPage();
		this.teamView = new app.TeamLearnPageView();
		this.$el.html(this.teamView.el);
	},
	cleanTeamPage:function(){
		if(this.teamView!=null){
			this.teamView.remove();
			this.teamView = null;
		}
	},
});