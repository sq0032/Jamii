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
		"click #profile-header button": "loadLinkedIn",
	},
	initialize : function(){
		this.profile = {
			"_key": "~",
			"educations": {
			  "_total": 3,
			  "values": []
			},
			"industry": "",
			"interests": "Table Tennis, Contract Bridge, Programming",
			"pictureUrl": "https://media.licdn.com/media/p/5/005/041/10e/18df1f6.jpg",
			"skills": {
			  "_total": 28,
			  "values": []
			},
			"summary": "",
		}
		
		//this.listenTo(this.);
		//this.displayProfiles('123');
		this.render();
	},
	render:function(){
		//var profile = {thumbnail:''};
		var html = _.template(app.template['PersonalView']['tree-test'], {user:app.user, profile:this.profile});
		this.$el.html(html);
	},
	loadLinkedIn : function(){
		var that = this;
		IN.User.authorize(function(){that.onLinkedInAuth();});
	},
	onLinkedInAuth : function(){
		var that = this;
		//console.log(this); //this is View
		console.log('this.onLinkedInAuth');
		IN.API.Profile("me").fields("firstName", 
									"lastName", 
									"industry", 
									"educations", 
									"languages", 
									"location",
									"skills",
									"interests",
									"summary",
									"specialties",
									"three-past-positions",
									"three-current-positions").result(function(profiles){that.displayProfiles(profiles);});
		IN.API.Raw("/people/~/picture-urls::(original)").result(function(profiles){that.displayPicture(profiles);});
	},
	displayProfiles : function(profiles){
		this.profile = profiles.values[0];
		this.render();
	},
	displayPicture : function(pictures){
		this.profile.pictureUrl = pictures.values[0];
		this.render();
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
		/*this.personalpitchesView 	= new app.PersonalPitchesView();
		this.personalmilestonesView = new app.PersonalMilestonesView();
		
		//Create sub view anchors
		this.treeY			= 0;
		this.pitchesY		= 0;
		this.milestonesY	= 0;
		*/
		this.render();
	},
	render: function(){
		var html = _.template(app.template['PersonalView']['main-frame-test'], {});
		this.$el.html(html);
		
		this.$('#personal-view-container').append(this.personaltreeView.el);
		//this.$('#personal-view-container').append(this.personalpitchesView.el);
		//this.$('#personal-view-container').append(this.personalmilestonesView.el);
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