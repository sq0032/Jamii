var app = app || {};

app.NavView = Backbone.View.extend({
	el: '#nav-view',
	events: {
		"click .navbar-brand"				: "openHomePage",
		"click #user-navview-thumbnail"		: "openPersonalPage",
		"click #user-navview-notification"	: "openNotification",
		"click #user-navview-inbox"			: "openInbox",
		"click #user-navview-setting"		: "openSettingPage",
		"click #user-navview-signout"		: "signout",
		
		//Team Menu	(might be changed later)
		"click #team-menu-home"		: "openTeamHomePage",
		"click #team-menu-workspace": "openTeamWorkspace",
		"click #team-menu-inbox"	: "openTeamInbox",
		"click #team-menu-learn"	: "openTeamLearn",
	},
	initialize: function() {
		//this.$userNav = this.$("#userNav");
		//this.$guestNav = this.$("#guestNav");
		//this.guestMode();
		//this.listenTo(app.loginUser, 'getNav', this.loginMode);
		this.render();
	},
	render: function(){
		//this
	},
	
	openHomePage: function(){
		alert('back to home page');
	},
	
	openPersonalPage: function(){
		//alert('open personal page');
		if(app.appview.pageView.contentView==null||
		   app.appview.pageView.contentView.el.id!='personal-view'){
			app.appview.pageView.renderPersonalView();
		}
	},
	openNotification: function(){
		alert('open notification box');
	},
	openInbox: function(){
		alert('open inbox box');
	},
	openSettingPage:function(){
		alert('open setting page');
	},
	signout:function(){
		window.location.assign("/logout");
	},
	
	//Team Menu
	openTeamHomePage:function(){
		if(app.appview.pageView.contentView==null||
		   app.appview.pageView.contentView.el.id!='team-view'){
			app.appview.pageView.renderTeamPage();
		}
		app.appview.pageView.contentView.renderHomePage();
	},
	openTeamWorkspace:function(){
		if(app.appview.pageView.contentView==null||
		   app.appview.pageView.contentView.el.id!='team-view'){
		}
		app.appview.pageView.contentView.renderWorkspacePage();
	},
	openTeamInbox:function(){
		if(app.appview.pageView.contentView==null||
		   app.appview.pageView.contentView.el.id!='team-view'){
		}
		app.appview.pageView.contentView.renderInboxPage();
	},
	openTeamLearn:function(){
		if(app.appview.pageView.contentView==null||
		   app.appview.pageView.contentView.el.id!='team-view'){
		}
		app.appview.pageView.contentView.renderLearnPage();
	},
});
