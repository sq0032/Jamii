var app = app || {};

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