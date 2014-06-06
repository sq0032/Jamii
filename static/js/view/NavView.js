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
		alert('open personal page');
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
		alert('user sign out');
	},
});
