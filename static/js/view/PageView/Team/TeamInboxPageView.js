var app = app || {};


app.InboxHeaderView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'inbox-view-header',
	events:{
		
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var header = _.template(app.template['InboxView']['header'],{});
		this.$el.html(header);
	},
});

app.InboxMsgBoxView = Backbone.View.extend({
	tagName	: 'div',
	className: 'media',
	events:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var box = _.template(app.template['InboxView']['list']['box'],{});
		this.$el.html(box);
	},
});

app.InboxMsgBoxListView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'msgbox-list',
	events:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var that = this;
		for(i=0; i<4; i++){
			var msgbox = new app.InboxMsgBoxView();
			that.$el.append(msgbox.el);
		}
		
		var new_msg = _.template(app.template['InboxView']['list']['new-message-button'],{});
			this.$el.append(new_msg);
	},
});

app.InboxMessageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'message-view',
	events:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var header 		= _.template(app.template['InboxView']['message-view']['header'],{});
		var container 	= _.template(app.template['InboxView']['message-view']['container'],{});
		var footer 		= _.template(app.template['InboxView']['message-view']['footer'],{});
		
		this.$el.html(header+container+footer);
		this.renderMessage();
	},
	renderMessage:function(){
		var that = this;
		for(i=0; i<4; i++){
			var message = _.template(app.template['InboxView']['message-view']['message'],{});
			this.$('#message-view-container').append(message);
		}
	}
});

app.TeamInboxPageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'inbox-view',
	events:{
	},
	initialize:function(){
		this.inboxHeaderView 	= new app.InboxHeaderView();
		this.inboxMsgListView 	= new app.InboxMsgBoxListView();
		this.inboxMessageView 	= new app.InboxMessageView();
		this.render();
	},
	render: function(){
		//var html = _.template(app.template['InboxView'], {});
		//this.$el.html(html);
		this.$el.append(this.inboxHeaderView.el);
		this.$el.append(this.inboxMsgListView.el);
		this.$el.append(this.inboxMessageView.el);
	},
});