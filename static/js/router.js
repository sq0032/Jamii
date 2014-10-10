var app = app || {};

app.Router = Backbone.Router.extend({
	routes:{
		":path1(/:path2)":"openPage",
		//":path":"openPage2",
	},
	openPage:function(path1, path2){
		//alert(team+id);
		if(path2==null){
			var href = path1;
		}else
			var href = path1+'/'+path2;
		//alert(href);
		$("[href='#"+href+"']").trigger('click');
	},
})

app.router = new app.Router();
Backbone.history.start();