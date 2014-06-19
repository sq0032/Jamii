var app = app || {};

app.TeamHomePageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.team = this.model;
		this.render();
	},
	render: function(){
		var name = this.team.get('name');
		var html = _.template(app.template['TeamHomePageView'], {name:name})
		this.$el.html(html);
	},
});