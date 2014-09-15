var app = app || {};

//TeamMilestoneView
app.TeamMilestonesView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'team-view-milestones',
	events	:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var html = _.template(app.template['TeamHomePageView']['milestones'], {});
		this.$el.html(html);
	}
});

//TeamPitchesView
app.TeamPitchesView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'team-view-pitches',
	events	:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var html = _.template(app.template['TeamHomePageView']['pitches'], {});
		this.$el.html(html);
	}
});

//TeamTreeView
app.TeamTreeView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'team-view-tree',
	events	:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var html = _.template(app.template['TeamHomePageView']['tree'], {});
		this.$el.html(html);
	}
});

//TeamMainView
app.TeamMainView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'team-view-main',
	events	:{
	},
	initialize:function(){
		this.team = this.model;
		
		this.render();
	},
	render:function(){
		var html = _.template(app.template['TeamHomePageView']['main'],{team:this.team});
		this.$el.html(html);
	}
});

app.TeamHomePageView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'team-page',
	events:{
		//'click a'		: 'moveTo',
		'click .nav-tabs a' : 'goTo',
	},
	initialize:function(){
		this.team = this.model;
		
		//Create sub views
		/*
		this.teamMainView 		= new app.TeamMainView({model:this.team});
		this.teamTreeView 		= new app.TeamTreeView();
		this.teamPitchesView 	= new app.TeamPitchesView();
		this.teamMilestonesView = new app.TeamMilestonesView();
		*/
		
		this.teamMainView 			= new app.TeamMainView({model:this.team});
		this.teamWorkSpacePageView 	= new app.TeamWorkspacePageView({model:this.team});
		this.teamInboxPageView 		= new app.TeamInboxPageView();
		this.teamSharedFilesView	= new app.TeamSharedFilesView({model:this.team});
		this.render();
	
	},
	render: function(){
		var html = _.template(app.template['TeamHomePageView']['frame'])
		this.$el.html(html);
		/*
		this.$('#team-view-container').append(this.teamMainView.el);
		this.$('#team-view-container').append(this.teamTreeView.el);
		this.$('#team-view-container').append(this.teamPitchesView.el);
		this.$('#team-view-container').append(this.teamMilestonesView.el);
		*/
		
		this.$('#team-view-main').append(this.teamMainView.el);
		this.$('#team-view-workspace').append(this.teamWorkSpacePageView.el);
		this.$('#team-view-inbox').append(this.teamInboxPageView.el);
		this.$('#team-view-files').append(this.teamSharedFilesView.el);
	},
	moveTo: function(ev){
		var id = $(ev.target).attr('link');
		this.mainY 		= this.$("#team-view-main").position().top;
		this.treeY 		= this.$("#team-view-tree").position().top;
		this.pitchesY 	= this.$("#team-view-pitches").position().top;
		this.milestonesY= this.$("#team-view-milestones").position().top;
		
		var y = 0;
		var that = this;
		switch(id){
			case "team-view-main":
				y = that.mainY;
				break;
			case "team-view-tree":
				y = that.treeY;
				break;
			case "team-view-pitches":
				y = that.pitchesY;
				break;
			case "team-view-milestones":
				y = that.milestonesY;
				break;
			default:
				y = 0;
		}
		
		var cur_y = this.$("#team-view-container").scrollTop();
		this.$("#team-view-container").animate({
			scrollTop: cur_y + y
		},1000);
	},
	goTo: function(ev){
		var id = $(ev.target).attr('link');
		this.$("#team-view-main").hide();
		this.$("#team-view-workspace").hide();
		this.$("#team-view-inbox").hide();
		this.$("#team-view-files").hide();
		
		this.$("#"+id).show();
	}
});