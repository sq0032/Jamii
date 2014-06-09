var app = app || {};

app.appView = Backbone.View.extend({
	el: '#app',
	initialize:function(){
		//new global models
		app.user = new app.User();
		app.teamlist = new app.TeamList();
		//new global views
		navView = new app.NavView();
		menuView = new app.MenuView();
		//this.listenTo(this.collection, "change", this.render);
		
		this.listenTo(app.user, "change", this.render)
		
		//fetch data
		app.user.fetch().pipe(function(){
			app.teamlist.fetch({'reset':true});
		}).done(function(){
			console.log('done');
		}).fail(function(){
			console.log('fail');
		});
		
		this.render();
	},
	render:function(){

	},

});