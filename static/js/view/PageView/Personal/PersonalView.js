var app = app || {};

//PersonalMilestonesView
app.PersonalMilestonesView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'personal-view-milestones',
	events	:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var html = _.template(app.template['PersonalView']['milestones'], {});
		this.$el.html(html);
	}
});

//PersonalPitchesView
app.PersonalPitchesView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'personal-view-pitches',
	events	:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var html = _.template(app.template['PersonalView']['pitches'], {});
		this.$el.html(html);
	}
});

//PersonalTreeView
app.PersonalTreeView = Backbone.View.extend({
	tagName	: 'div',
	className:'full-page',
	id		: 'personal-view-tree',
	events	:{
	},
	initialize:function(){
		this.render();
	},
	render:function(){
		var html = _.template(app.template['PersonalView']['tree'], {});
		this.$el.html(html);
	}
});

//PersonalView
app.PersonalView = Backbone.View.extend({
	tagName	: 'div',
	id		: 'personal-view',
	events:{
		'click a'		: 'moveTo',
	},
	initialize:function(){
		//Create sub views
		this.personaltreeView 		= new app.PersonalTreeView();
		this.personalpitchesView 	= new app.PersonalPitchesView();
		this.personalmilestonesView = new app.PersonalMilestonesView();
		
		//Create sub view anchors
		this.treeY			= 0;
		this.pitchesY		= 0;
		this.milestonesY	= 0;
		
		this.render();
	},
	render: function(){
		var html = _.template(app.template['PersonalView']['main-frame'], {});
		this.$el.html(html);
		
		this.$('#personal-view-container').append(this.personaltreeView.el);
		this.$('#personal-view-container').append(this.personalpitchesView.el);
		this.$('#personal-view-container').append(this.personalmilestonesView.el);
	},
	moveTo: function(ev){
		var id = $(ev.target).attr('link');
		this.treeY 		= this.$("#personal-view-tree").position().top;
		this.pitchesY 	= this.$("#personal-view-pitches").position().top;
		this.milestonesY= this.$("#personal-view-milestones").position().top;
		
		var y = 0;
		var that = this;
		switch(id){
			case "personal-view-tree":
				y = that.treeY;
				break;
			case "personal-view-pitches":
				y = that.pitchesY;
				break;
			case "personal-view-milestones":
				y = that.milestonesY;
				break;
		}
		
		var cur_y = this.$("#personal-view-container").scrollTop();
		this.$("#personal-view-container").animate({
			scrollTop: cur_y + y
		},1000);
	},
});