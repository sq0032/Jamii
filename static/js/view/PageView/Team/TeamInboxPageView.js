var app = app || {};

app.TeamInboxPageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'inbox-view',
	events:{
	},
	initialize:function(){
		this.render();
	},
	render: function(){
		var html = _.template(app.template['InboxView'], {});
		this.$el.html(html);
	},
});