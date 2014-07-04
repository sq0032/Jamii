var app = app || {};

//InboxHeaderView
/*
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
*/

//TeamInboxPageView
app.PersonalView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'personal-view',
	events:{
	},
	initialize:function(){
		this.msgBoxes	= new app.MsgBoxes();
		this.msgBoxes.fetch({'reset':true});
		
		msgBoxes	= new app.MsgBoxes();
		msgBoxes.fetch({'reset':true});
		
		this.inboxHeaderView 	= new app.InboxHeaderView();
		this.inboxHeaderView.parentView = this;
		this.inboxMsgListView 	= new app.InboxMsgBoxListView({'msgBoxes':this.msgBoxes});
		this.inboxMsgListView.parentView = this;
		this.inboxMessageView 	= new app.InboxMessageView();
		//this.inboxMessageView.parentView = this;
		this.render();
	},
	render: function(){
		//var html = _.template(app.template['InboxView'], {});
		//this.$el.html(html);
		this.$el.append(this.inboxHeaderView.el);
		this.$el.append(this.inboxMsgListView.el);
		this.$el.append(this.inboxMessageView.el);
	},
	renderMessageView: function(){
		this.$el.append(this.inboxMessageView.el);
	},
});