var app = app || {};

app.appView = Backbone.View.extend({
	el: '#app',
	initialize:function(){
		app.user = new app.UserModel();
		//this.listenTo(this.collection, "change", this.render);
		this.render();
	},
	render:function(){

	},

});

