var app = app || {};

app.TeamLearnPageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.render();
	},
	render: function(){
		this.$el.html('Learn');
	},
});

app.TeamInboxPageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.render();
	},
	render: function(){
		this.$el.html('Inbox');
	},
});


app.TeamWorkplacePageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.render();
	},
	render: function(){
		this.$el.html('WorkPlace');
	},
});

app.TeamHomePageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.render();
	},
	render: function(){
		this.$el.html('\
		<div id="team-page" style="padding:20px">\
			<div class="jumbotron">\
				<div class="container">\
					<div class="row">\
						<div class="col-sm-8">\
						  <h1>TEAM LOGO</h1>\
						  <p>...</p>\
						  <p>...</p>\
						  <p>...</p>\
						</div class="col-sm-4">\
						</div>\
					</div>\
					<div>\
				</div>\
			</div>\
			<div class="jumbotron">\
				<div class="container">\
					<div class="row">\
						<div class="col-xs-8">\
						  <h1></h1>\
						  <p>...</p>\
						  <p>...</p>\
						  <p>...</p>\
						  <p>...</p>\
						</div class="col-xs-4">\
						</div>\
					</div>\
					<div>\
				</div>\
			</div>\
			<div id="footer" style="background-color:000000; color:FFFFFF; height:50px; width:100%; position:fixed; bottom:0px">\
				<div class="row">\
					<div class="col-xs-2 col-xs-offset-2"><p>@2014 Conrad Center</p></div> \
					<div class="col-xs-2"><a href="#">policy</a></div>\
					<div class="col-xs-2"><a href="#">about us</a></div>\
					<div class="col-xs-2"><a href="#">contact us</a></div>\
				</div>\
			</div>\
		</div>\
		');
	},
});

app.TeamView = Backbone.View.extend({
	tagName: 'div',
	events:{
	},
	initialize:function(){
		this.teampageView = null
		this.renderHomePage();
	},
	render: function(){
	},
	renderHomePage:function(){
		this.cleanTeamPage();
		this.teampageView = new app.TeamHomePageView();
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
		this.contentView = new app.TeamView();
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
