var app = app || {};

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