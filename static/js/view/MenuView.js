var app = app || {};

app.MenuView = Backbone.View.extend({
	el: '#menu',
	events: {
		"click button"				: "toggleMenu",
		"click #user-navview-thumbnail"		: "openPersonalPage",
		"click #user-navview-notification"	: "openNotification",
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
	toggleMenu: function(){
		this.$el.css('left','-230');
	},
});
