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