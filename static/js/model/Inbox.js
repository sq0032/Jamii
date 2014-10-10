var app = app || {};

app.Message = Backbone.Model.extend({
	defaults:{
	},
	url	:'/inbox/'+this.msgbox_id,
});

app.Messages = Backbone.Collection.extend({
	model	: app.Message,
	initialize:function(options){
		this.id = options.id;
	},
	url:function(){
		var that = this;
		if(typeof(this.id)=='undefined'){
			return '/inbox/'+0;
		}else{
			return '/inbox/'+that.id;
		}
		//'/inbox/msg/'
	},
});

app.MsgBox = Backbone.Model.extend({
	defaults:{
	},
	url		:'/inbox/'
});

app.MsgBoxes = Backbone.Collection.extend({
	model	: app.MsgBox,
	url		:'/inbox/'
});