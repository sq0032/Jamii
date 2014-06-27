var app = app || {};

//InboxMessageView
app.InboxMessageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'message-view',
	events:{
		'click button'	: 'sendReply',
	},
	initialize:function(){
		//alert(this.model.get('subject'));
		
		if(typeof(this.model)=='undefined'){
			this.msgBox = new app.MsgBox();
		}else{
			this.msgBox = this.model;
		}
		this.messages 	= new app.Messages({'id':this.msgBox.get('id')});
		//alert(this.msgBox.id);
		
		//alert(messages.url());
		this.messages.fetch({'reset':true});
		
		this.listenTo(this.messages, 'reset', this.renderMessages);
		this.listenTo(this.messages, 'add', this.renderMessage);
		this.render();
	},
	render:function(){
		var msgBox = this.msgBox.toJSON();
		var disableBtn = ((typeof(this.model)=='undefined')?true:false);
		
		var header 		= _.template(app.template['InboxView']['message-view']['header'],{'msgBox':msgBox});
		var container 	= _.template(app.template['InboxView']['message-view']['container'],{});
		var footer 		= _.template(app.template['InboxView']['message-view']['footer'],{'disableBtn':disableBtn});
		
		this.$el.html(header+container+footer);
		//this.renderMessage();
	},
	renderMessages:function(){
		var that = this;
		this.messages.each(function(msg){
			that.renderMessage(msg);
		});
	},
	renderMessage:function(msg){
		var message = _.template(app.template['InboxView']['message-view']['message'],{msg:msg.toJSON()});
		this.$('#message-view-container').append(message);
	},
	sendReply:function(){
		var that	= this;
		var content = this.$('textarea').val();
		if($.trim(content)!=''){
			var message = new app.Message({	'poster'	: app.user.id,
											'message'	: content,
											'msgbox_id'	: this.msgBox.get('id'),
											});
			message.url = '/inbox/'+this.msgBox.get('id');
			/*$.when(message.save()).done(function(msg){
				alert('done');
			});*/
			message.save(null,{
				success: function(model, response){
					that.messages.add(model);
				},
				error: function(model, response){
					alert('error');
				}
			});
			
			this.$('textarea').val('');
			//this.messages.add(message);
			//this.renderMessage(message);
		}
		
	}
});

//InboxNewMessageView
app.InboxNewMessageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'new-message-view',
	events:{
		'click button'		: 'sendMessage',
		'click .user-tag'	: 'selectUser',
	},
	initialize:function(){
		this.render();
		var that = this;
		$.get("/inbox/user", function(data){
			that.usertag = data;
			that.renderUserTags();
		});
		
		this.user_tags 		= [];
		this.user_tag_ids 	= [];
	},
	render:function(){
		
		var header 		= _.template(app.template['InboxView']['new-message-view']['header'],{});
		var container 	= _.template(app.template['InboxView']['new-message-view']['container'],{});
		var footer 		= _.template(app.template['InboxView']['new-message-view']['footer'],{});
		
		this.$el.html(header+container+footer);
	},
	renderUserTags:function(){
		for(i=0; i<this.usertag.length; i++){
			var html = _.template(app.template['InboxView']['new-message-view']['user-tag'],{'usertag':this.usertag[i]});
			this.$('#user-tag-container').append(html);
		}
	},
	selectUser:function(event){
		aaa =event;
		var that = this;
		var $target = $(event.currentTarget);
		if($target.hasClass('selected')){
			var name	= $target.find('h4').html();
			var index	= this.user_tags.indexOf(name);
			this.user_tags.splice(index, 1);
			this.user_tag_ids.splice(index, 1);
		}else{
			var name	= $target.find('h4').html();
			var tag_id	= $target.find('h4').attr('data');
			this.user_tags.push(name);
			this.user_tag_ids.push(tag_id);
		}
		$target.toggleClass('selected');
		
		this.$('input:first').val(that.user_tags.toString());
		//this.$('input:last').val(that.user_tag_ids.toString());
/*		for(i=0; i<this.usertags.length; i++){
			this.$('input').val(that.user.)
		}*/
	},
	sendMessage:function(){
		var attendants 	= this.user_tag_ids;
		attendants.push(app.user.id);
		var message		= $("textarea").val();
		var subject		= $("#message-subject-input").val();
		
		var msgbox = new app.MsgBox({'attendants' 	: attendants,
									 'message'		: message,
									 'subject'		: subject});
		msgbox.save();
		
		this.user_tag_ids 	= [];
		this.user_tags		= [];
		this.$('input:first').val('');
		this.$('#message-subject-input').val('');
		this.$('textarea').val('');
		this.$('.user-tag').removeClass('selected');
		//alert('send');
	},
});

//InboxMsgBoxView
app.InboxMsgBoxView = Backbone.View.extend({
	tagName	: 'div',
	className: 'media',
	events:{
		'click'		: 'openMsgBox'
	},
	initialize:function(){
		this.msgBox = this.model;
		this.render();
	},
	render:function(){
		//alert(this.msgBox.get('attendants'));
		//var subject		= this.msgBox;
		var msgBox = this.msgBox;
		var box = _.template(app.template['InboxView']['list']['box'],{'msgBox':this.msgBox.toJSON()});
		this.$el.html(box);
	},
	openMsgBox:function(){
		var InboxView = this.parentView.parentView;
		if(InboxView.inboxMessageView){
			InboxView.inboxMessageView.remove();
		}
		InboxView.inboxMessageView = new app.InboxMessageView({model:this.msgBox});
		InboxView.renderMessageView();
	},
});

//InboxMsgBoxListView
app.InboxMsgBoxListView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'msgbox-list',
	events:{
		'click #new-message-button'	: 'newInboxMessage',
	},
	initialize:function(options){
		this.msgBoxes = options.msgBoxes;
		
		this.listenTo(this.msgBoxes, 'reset', this.render);
		//alert(options.collection);
		//this.render();
	},
	render:function(){
		var that = this;
		
		this.msgBoxes.each(function(msgBox){
			var msgBoxView = new app.InboxMsgBoxView({model:msgBox});
			msgBoxView.parentView = that;
			that.$el.append(msgBoxView.el);
		});
		
		var new_msg = _.template(app.template['InboxView']['list']['new-message-button'],{});
			this.$el.prepend(new_msg);
	},
	newInboxMessage:function(){
		var InboxView = this.parentView;
		if(InboxView.inboxMessageView){
			InboxView.inboxMessageView.remove();
		}
		InboxView.inboxMessageView = new app.InboxNewMessageView({});
		InboxView.renderMessageView();
	},
});

//InboxHeaderView
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

//TeamInboxPageView
app.TeamInboxPageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'inbox-view',
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