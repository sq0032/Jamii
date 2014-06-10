var app = app || {};

app.appView = Backbone.View.extend({
	el: '#app',
	initialize:function(){
		//new global models
		app.user = new app.User();
		app.teamlist = new app.TeamList();
		//new global views
		this.navView = new app.NavView();
		this.navView.parentView = this;
		this.menuView = new app.MenuView();
		this.menuView.parentView = this;
		this.pageView = new app.PageView();
		this.pageView.parentView = this;
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