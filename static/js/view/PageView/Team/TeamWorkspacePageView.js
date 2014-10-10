var app = app || {};

//Task Card View
app.TaskCardView = Backbone.View.extend({
	tagName: 'div',
	className: 'taskcard',
	events:{
		"click p"					: "editName",
		"keypress textarea"			: "test",
		"click button"				: "saveName",
		"reorder"					: "reorder",
		"test"						: "test",
		"click .glyphicon-remove"	: "deleteCard",
		"click .color-choice"		: "selectColor",
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
		//Set variables 
		var name = this.taskcard.get('name');
		var id	 = this.taskcard.get('id');
		var order= this.taskcard.get('order');
		var label= this.taskcard.get('label');
		//alert(this.taskcard.get('name'));
		
		//Set DOM objects
		//var content 	= '<p id="card'+id+'">' +name+ ' order:' +order+ '</p>';
		var content 	= '<p id="card'+id+'">' +name+ '</p>';
		var deletebtn 	= '<span class="glyphicon glyphicon-remove"></span>';
		var textarea	= '<textarea value="'+name+'"style="display:none"></textarea>';
		var colorpanel	= '<div class="color-panel">\
							<span class="color-choice" style="background-color:white"></span>\
							<span class="color-choice" style="background-color:red"></span>\
							<span class="color-choice" style="background-color:yellow"></span>\
							<span class="color-choice" style="background-color:green"></span>\
							<span class="color-choice" style="background-color:blue"></span>\
							<span class="color-choice" style="background-color:purple"></span>\
							</div>'
		var savebtn		= '<button type="button" class="btn btn-primary btn-sm hide">Save</button>';
		var colorlabel	= '<span class="color-label" style="background-color:'+label+'"></span>';
		var cleardiv	= '<div class="clear"></div>';
		
		//Render html page
		var html = deletebtn+content+colorlabel+textarea+savebtn+cleardiv+colorpanel+cleardiv;
		this.$el.html(html);
	},
	editName:function(event){
		var name = this.taskcard.get('name');
		
		this.$('p').toggle();
		this.$('span').toggle();
		this.$('textarea').toggle();
		this.$('textarea').val(name);
		this.$('button').toggleClass('hide');
		this.$('.color-panel').toggle();
		this.$('.color-choice').toggle();
	},
	saveName:function(){
		var name = this.$('textarea').val();
		if(name == ''){
			name = 'New task';
		}
		//alert(name);
		this.taskcard.set('name', name);
		this.taskcard.save();
		this.render();
	},
	reorder:function(ev,order,listid){
		order = order+1;
		var cur_order = this.taskcard.get('order');
		var cur_list  = this.taskcard.get('list');
		var name = this.taskcard.get('name');
		console.log(name+' cur:'+cur_order+' '+cur_list);
		console.log(name+' new:'+order+' '+listid);
		if(cur_order!=order || cur_list!=listid){
			this.taskcard.set('order',order);
			this.taskcard.set('list',listid);
			//alert(listid);
			//alert(this.taskcard.get('list'));
			this.taskcard.save();
			this.render();
		}
	},
	deleteCard:function(){
		this.taskcard.destroy();
		this.remove();
	},
	selectColor:function(event){
		var color = $(event.target).css('background-color');
		this.taskcard.set('label',color);
		
		this.$('.color-choice').css('border-color','black');
		$(event.target).css('border-color','red');
	},
	test:function(event){
		if (event.keyCode==13){
			this.saveName();
		}
	},
});

//Task List View
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

		//Set listener for collection change
		//this.listenTo(this.list.cards, "add", this.sortCards);
		//this.listenTo(this.list.cards, "destroy", this.sortCards);
		
		this.render();
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
		//alert(this.list.id);
		var card = new app.TaskCard({'order':n+1,
									'list':this.list.id});
		//card.url = '/taskboard/card/0';
		card.save();
		//alert(card.get('id'));
		var cardview = new app.TaskCardView({model:card});
		this.$('.taskcontainer').append(cardview.el);
		//this.list.cards.add(card);
		//this.renderlist();
	},
	test:function(){
		alert('change');
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

//Task Board View
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
		
		var divclear = '<div class="clear"></div>'
		this.$el.append(divclear);
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
		this.$("#taskboard-wrap").append(this.taskboard.el);
		$(".taskcontainer").sortable({
			connectWith:".taskcontainer",
		});
	},
});