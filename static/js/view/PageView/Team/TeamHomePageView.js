var app = app || {};

app.TeamHomePageView = Backbone.View.extend({
	tagName: 'div',
	events:{
	
	},
	initialize:function(){
		this.team = this.model;
		this.render();
	},
	render: function(){
		var name = this.team.get('name');
		this.$el.html('\
		<div id="team-page" style="padding:20px">\
			<div class="jumbotron">\
				<div class="container">\
					<div class="row">\
						<div class="col-sm-8">\
						  <h1>'+name+'</h1>\
						  <p>...</p>\
						  <p>...</p>\
						  <p>...</p>\
						</div class="col-sm-4">\
						</div>\
					</div>\
					<div>\
				</div>\
			</div>\
			<div class="jumbotron">\
				<div class="container">\
					<div class="row">\
						<div class="col-xs-8">\
						  <h1></h1>\
						  <p>...</p>\
						  <p>...</p>\
						  <p>...</p>\
						  <p>...</p>\
						</div class="col-xs-4">\
						</div>\
					</div>\
					<div>\
				</div>\
			</div>\
			<div id="footer" style="background-color:000000; color:FFFFFF; height:50px; width:100%; position:fixed; bottom:0px">\
				<div class="row">\
					<div class="col-xs-2 col-xs-offset-2"><p>@2014 Conrad Center</p></div> \
					<div class="col-xs-2"><a href="#">policy</a></div>\
					<div class="col-xs-2"><a href="#">about us</a></div>\
					<div class="col-xs-2"><a href="#">contact us</a></div>\
				</div>\
			</div>\
		</div>\
		');
	},
});