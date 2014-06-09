var app = app || {};

app.MenuItemView = Backbone.View.extend({
	tagName: 'a',
	events: {
		"click a"	: "openLink",

	},
	initialize: function() {
		alert(link.get('name'));
		//this.listenTo(app.loginUser, 'getNav', this.loginMode);
		this.render();
	},
	render: function(){
		//this
	},
	openLink: function(){
		alert('open');
		
	},
});
