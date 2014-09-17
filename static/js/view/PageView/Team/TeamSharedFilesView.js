var app = app || {};

//app.

app.TeamSharedFilesView = Backbone.View.extend({
	tagName: 'div',
	id: 'sharedfile-container',
	events:{
		'click #google-drive-btn': 'openGoogleDrive',
	},
	initialize:function(){
		this.team = this.model;
		
		this.files = new app.SharedFiles();
		this.files.team_id = this.team.get('id');
		
		var that = this;
		
		
		// Google Drive Setting
		this.setGoogleDrive();

		
		// Dropbox Setting
		this.dropboxoptions = {
			// Required. Called when a user selects an item in the Chooser.
			success: function(files) {
				var file		= new app.SharedFile({
					name: files[0].name,
					icon: files[0].icon,
					link: files[0].link,
					uploader: 'Mark Hsu',
					team_id : that.team.get('id'),
				});
				that.uploadFile(file);
				console.log(file.get('team_id'));
			},
			cancel: function() {
			},
			linkType: "direct", // or "direct"
			multiselect: false, // or true
		};
		
		this.listenTo(this.files, "reset", this.renderFiles);
		this.listenTo(this.files, "add", this.renderFile);
		
		this.files.fetch({reset:true});
		
		this.render();
	},
	render: function(){
		var html = _.template(app.template['SharedfileView']['container']);
		this.$el.html(html);
		
		var button = Dropbox.createChooseButton(this.dropboxoptions);
		this.$("#dropbox-upload").append(button);
		
	},
	renderFiles: function(files){
		var that = this;
		files.each(function(file){
			that.renderFile(file);
		});
	},
	renderFile: function(file){
		var d = new Date(file.get('upload_datetime'));
		console.log(file.get('upload_datetime'));
		console.log(d);
		
		var html = _.template(app.template['SharedfileView']['file-link'],
			{ file: file, datetime: d}
		);
		this.$('#file-links').append(html);
		
	},
	uploadFile: function(file){
		var that = this;
		file.save(null,{
			success: function(model, response){
				that.files.add(model);
				//console.log(model);
			},
			error: function(model, response){
				alert('error');
			}
		});
	},
	setGoogleDrive: function(){
		//this.GDrive;
		var that = this;
		this.GD_onApiLoad = function(){
			//alert('test');
			console.log('gapi');
			gapi.load('auth', {'callback': that.GD_onAuthApiLoad});
			//console.log('GD_onApiLoad');
			gapi.load('picker');
		}

		this.GD_onAuthApiLoad = function(){
			console.log('GD_onAuthApiLoad');
			window.gapi.auth.authorize({
				'client_id': '731636681051-h6opocjs62cgtlnr2kubt7i6n00os640.apps.googleusercontent.com',
				'scope' : ['https://www.googleapis.com/auth/drive']
			}, that.GD_handleAuthResult);
		}
		
		this.GD_oauthToken;
		this.GD_handleAuthResult = function(authResult){
		if(authResult && !authResult.error){
				oauthToken = authResult.access_token;
				that.GD_createPicker();
			}
		}

		this.GD_createPicker = function(){
			var picker = new google.picker.PickerBuilder()
				.addView(new google.picker.DocsUploadView())
				.addView(new google.picker.DocsView())
				.setOAuthToken(oauthToken)
				.setDeveloperKey('AIzaSyBdo4bJCNwRHMutC0WSpSs7pFQHiclQlo0')
				.setCallback(that.GD_pickerCallback)
				.build();
			picker.setVisible(true);
		}
		
		this.GD_pickerCallback = function(data){
			if (data.action == google.picker.Action.PICKED){
				
				var file = new app.SharedFile({
					name: data.docs[0].name,
					icon: data.docs[0].iconUrl,
					link: data.docs[0].url,
					uploader: 'Mark Hsu',
					team_id : that.team.get('id'),
				});
				that.uploadFile(file);
			}
		}
	},
	openGoogleDrive: function(){
		this.GD_onApiLoad();
	}
});