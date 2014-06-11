var app = app || {};

app.TeamView = Backbone.View.extend({
	tagName: 'div',
	events:{
	},
	initialize:function(){
		this.teampageView = null
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
		this.teampageView = new app.TeamHomePageView({model:this.team});
		this.$el.html(this.teampageView.el);
	},
	renderWorkspacePage:function(){
		this.cleanTeamPage();
		this.teampageView = new app.TeamWorkplacePageView();
		this.$el.html(this.teampageView.el);
	},
	renderInboxPage:function(){
		this.cleanTeamPage();
		this.teampageView = new app.TeamInboxPageView();
		this.$el.html(this.teampageView.el);
	},
	renderLearnPage:function(){
		this.cleanTeamPage();
		this.teampageView = new app.TeamLearnPageView();
		this.$el.html(this.teampageView.el);
	},
	cleanTeamPage:function(){
		if(this.teampageView!=null){
			this.teampageView.remove();
			this.teampageView = null;
		}
	},
});