var app = app || {};

app.TaskCardView = Backbone.View.extend({
	tagName: 'div',
	className: 'taskcard',
	events:{
		"click"		: "getName",
		"reorder"	: "reorder",
		"test"		: "test",
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
		var id	 = this.taskcard.cid;
		var order= this.taskcard.get('order');
		//alert(this.taskcard.get('name'));
		var html = '<p>' +name+ ' ' +id+ ' order:' +order+ '</p>'
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
	test:function(){
		//this.taskcard.save();
	},
});

app.TaskListView = Backbone.View.extend({
	tagName: 'div',
	className: 'tasklist',
	events:{
		"sortupdate"	:"dropTask",
	},
	initialize:function(){
		if(typeof(this.model)=='undefined'){
			this.model = new app.TaskList();
		}
		this.list = this.model;
		
		this.cards = new app.TaskCards(this.list.get('cards'));
		this.cards.comparator = 'order';
		this.cards.sort();
		
		this.render();
		//this.listenTo(this.cards, "reset", this.render);
		
		//this.cards.fetch({'reset':true});
		
		//this.cardview = null;
		//this.render();
	},
	render:function(){
		
		var that = this;
		//alert('test');
		this.cards.each(function(card){
			//alert(card.get('name'));
			var cardview = new app.TaskCardView({model:card});
			//alert(cardview.el);
			that.$el.append(cardview.el);
		});
	},
	dropTask:function(event, ui){
		var cards = this.$(".taskcard");
		var listid = this.list.id;
		$.each(cards, function(order, card){
			//alert(listid);
			$(card).trigger('reorder',[order,listid]);
			//$(card).trigger('test');
		});
		//this.list.save();
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
		$(".tasklist").sortable({
			connectWith:".tasklist",
		});
	},
});