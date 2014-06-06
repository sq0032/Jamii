var app = app || {};

app.appView = Backbone.View.extend({
	el: '#app',
	initialize:function(){
		//new global models
		app.user = new app.UserModel();

		//new global views
		navView = new app.NavView();
		menuView = new app.MenuView();
		//this.listenTo(this.collection, "change", this.render);
		
		this.listenTo(app.user, "change", this.render)
		
		//fetch data
		app.user.fetch({'reset':true});
		this.render();
	},
	render:function(){
		//$('#test').html('test');
	},

});