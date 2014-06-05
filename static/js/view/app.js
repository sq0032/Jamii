var app = app || {};

app.appView = Backbone.View.extend({
	el: '#app',
	initialize:function(){
		app.user = new app.UserModel();

		//this.listenTo(this.collection, "change", this.render);
		
		this.listenTo(app.user, "change", this.render)
		
		
		app.user.fetch({'reset':true});
		this.render();
	},
	render:function(){
		//$('#test').html('test');
	},

});