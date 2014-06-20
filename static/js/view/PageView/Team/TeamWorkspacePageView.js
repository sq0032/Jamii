var app = app || {};

app.TaskCardView = Backbone.View.extend({
	tagName: 'div',
	className: 'taskcard',
	events:{
		//"click"						: "getName",
		"reorder"					: "reorder",
		"test"						: "test",
		"click .glyphicon-remove"	: "deleteCard",
	},
	initialize:function(){
		if(typeof(this.model)=='undefined'){
			//this.model = new app.TaskCard();
			alert('nothing in the model');
		}
		this.taskcard = this.model;
		//alert(this.taskcard.get('name'));
		//this.listenTo(this.taskcard, "reorder", this.reorder);
		this.render();
	},
	render:function(){
		var name = this.taskcard.get('name');
		var id	 = this.taskcard.get('id');
		var order= this.taskcard.get('order');
		//alert(this.taskcard.get('name'));
		
		var content 	= '<p id="card'+id+'">' +name+ ' order:' +order+ '</p>';
		var deletebtn 	= '<span class="glyphicon glyphicon-remove"></span>'
		var html = deletebtn+content;
		
		this.$el.html(html);
	},
	getName:function(){
		var name = this.taskcard.get('name');
		var id	 = this.taskcard.cid;
		var order= this.taskcard.get('order');
		alert(name+' '+id+' order:' +order);
		//console.log(name+id);
	},
	reorder:function(ev,order,listid){
		this.taskcard.set('order',order+1);
		this.taskcard.set('list',listid);
		//alert(listid);
		//alert(this.taskcard.get('list'));
		this.taskcard.save();
		this.render();
	},
	deleteCard:function(){
		//this.taskcard.set('name','test');
		//alert(this.taskcard.get('name'));
		this.taskcard.destroy();
		this.remove();
	},
	test:function(){
		//this.taskcard.save();
	},
});

app.TaskListView = Backbone.View.extend({
	tagName: 'div',
	className: 'tasklist',
	events:{
		"sortupdate"			:"sortCards",
		"click .newtaskcard"	:"addNewCard",
		"click .test"			:"test",
	},
	initialize:function(){
		if(typeof(this.model)=='undefined'){
			this.model = new app.TaskList();
		}
		this.list = this.model;
		
		this.list.cards = new app.TaskCards(this.list.get('cards'));
		//this.list.cards = this.cards;
		this.list.cards.comparator = 'order';
		this.list.cards.sort();
		
		this.render();
		//this.listenTo(this.list.cards, "reset", this.render);
		
		//this.list.cards.fetch({'reset':true});
		
		//this.cardview = null;
		//this.render();
	},
	render:function(){
		var listname 	= this.list.get('name');
		var header 		= '<div class="tasklistheader">'+listname+'</div>'
		var container	= '<div class="taskcontainer"></div>';
		var addcardbutton='<div class="newtaskcard">add card</div>';
		var test		= '<button class="test">test</button>';
		this.$el.html(header+container+addcardbutton);
		
		var that = this;
		//alert('test');
		this.list.cards.each(function(card){
			//alert(card.get('name'));
			var cardview = new app.TaskCardView({model:card});
			//alert(cardview.el);
			that.$('.taskcontainer').append(cardview.el);
		});
	},
	sortCards:function(event, ui){
		var cards = this.$(".taskcard");
		var listid = this.list.id;
		$.each(cards, function(order, card){
			$(card).trigger('reorder',[order,listid]);
		});
	},
	addNewCard:function(){
		//alert('test');
		var n = this.$(".taskcard").length;
		alert(this.list.id);
		var card = new app.TaskCard({'order':n+1,
									'list':this.list.id});
		card.url = '/taskboard/card/0';
		card.save();
		//alert(card.get('id'));
		this.list.cards.add(card);
		this.render();
	},
	test:function(){
		this.list.cards.sort();
		this.renderlist();
		this.list.save();
	},
	renderlist: function(){
		var that = this;
		this.$('.taskcontainer').html("");
		this.list.cards.each(function(card){
			//alert(card.get('name'));
			var cardview = new app.TaskCardView({model:card});
			//alert(cardview.el);
			that.$('.taskcontainer').append(cardview.el);
		});
	},
});

app.TaskBoardView = Backbone.View.extend({
	tagName: 'div',
	className: 'taskboard',
	events:{
	},
	initialize:function(){
		if(typeof(this.model)=='undefined'){
			this.model = new app.TaskBoard();
		}
		this.board = this.model;
		this.render();
	},
	render:function(){
		var that = this;
		this.lists = new app.TaskLists(this.board.get('lists'));
		this.lists.each(function(list){
			//alert(card.get('name'));
			var listview = new app.TaskListView({model:list});
			//alert(cardview.el);
			that.$el.append(listview.el);
		});
		//this.$el.append(this.listview1.el)
		//		.append(this.listview2.el);
				//.append(this.listview3.el);
	},
});

app.TeamWorkspacePageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.team = this.model;
		this.board = new app.TaskBoard();
		
		var teamid = this.team.get('id');
		this.board.set('id', teamid);
		
		this.listenTo(this.board, "change", this.renderBoard);
		
		this.board.fetch();
		this.render();
	},
	render: function(){
		var data = {};
		var html = _.template(app.template['TeamWorkspacePageView'],data);
		this.$el.html(html);
		
	},
	renderBoard: function(){
		this.taskboard = new app.TaskBoardView({model:this.board});
		this.$el.append(this.taskboard.el);
		$(".taskcontainer").sortable({
			connectWith:".taskcontainer",
		});
	},
});