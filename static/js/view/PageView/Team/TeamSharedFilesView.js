var app = app || {};

//app.

app.TeamSharedFilesView = Backbone.View.extend({
	tagName: 'div',
	id: 'sharedfile-container',
	events:{
	
	},
	initialize:function(){
		this.team = this.model;
		
		var that = this;
		this.dropboxoptions = {
			// Required. Called when a user selects an item in the Chooser.
			success: function(files) {
				var file		= new app.SharedFile({
					name: files[0].name,
					icon: files[0].icon,
					link: files[0].link,
					team_id : that.team.get('id');
				});
				
				var icon		= '<img class="file-icon" src="'+files[0].icon+'">';
				var link		= '<a href="'+files[0].link+'">'+files[0].name+'</a>';
				var name		= '<div class="file-name">'+icon+link+'</div>';
				var uploader	= '<div class="file-uploader">Mark Hsu</div>'
				var clear		= '<div class="clear"></div>'
				var thumbnail	= '<img src="'+files[0].thumbnailLink+'">';
				var datetime	= new Date();
				var update		= '<div class="file-update-datetime">'+datetime.getHours()+':'+datetime.getMinutes()+' '+datetime.toDateString()+'</div>';

				that.$('#file-links').append('<li class="file-link">'+name+update+uploader+clear+'</li>');
				alert('success!');
			},
			cancel: function() {

			},
			linkType: "direct", // or "direct"
			multiselect: false, // or true
		};
		
		this.render();
	},
	render: function(){
		var html = _.template(app.template['SharedfileView']['container']);
		this.$el.html(html);
		
		var button = Dropbox.createChooseButton(this.dropboxoptions);
		this.$("#dropbox-upload").append(button);
		
	},
	renderFile: function(file){
		//this.taskboard = new app.TaskBoardView({model:this.board});
		//this.$("#taskboard-wrap").append(this.taskboard.el);
		//$(".taskcontainer").sortable({
		//	connectWith:".taskcontainer",
		//});
	},
});