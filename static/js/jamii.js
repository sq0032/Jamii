$(function(){
	//Create Jamii app
	app.appview = new app.appView();
	
	//Test session
	/*
	var treeY 		= $("#personal-view-tree").position().top;
	var pitchesY 	= $("#personal-view-pitches").position().top;
	var milestonesY = $("#personal-view-milestones").position().top;
		
	$(window).resize(function(){
		treeY 		= $("#personal-view-tree").position().top;
		pitchesY 	= $("#personal-view-pitches").position().top;
		milestonesY = $("#personal-view-milestones").position().top;
	});

	//alert(milestonesY);
	$(".nav-tabs li").click(function(){
		var id = $(this).find("a").attr('link');
		var y = 0;
		//alert(id);
		switch(id){
			case "personal-view-tree":
				y = treeY;
				break;
			case "personal-view-pitches":
				y = pitchesY;
				break;
			case "personal-view-milestones":
				y = milestonesY;
				break;
		}
		var cur_y = $("#personal-view-container").scrollTop();
		var move_y= y-cur_y;
		$("#personal-view-container").animate({
			scrollTop: cur_y + move_y
		},1000);
	});
	*/

	
	//Fetch backbone templates
	app.template = {};
	$.get("static/template/TeamHomePageView.tpl", function(data){
		var data_str = JSON.stringify(data).escapeSpecialChars();
		app.template['TeamHomePageView'] = JSON.parse(JSON.parse(data_str));
	});
	$.get("static/template/TeamWorkspacePageView.html", function(data){
		app.template['TeamWorkspacePageView'] = data;
	});
	$.get("static/template/TaskBoardView.html", function(data){
		app.template['TaskBoardView'] = data;
	});
	
	$.get("static/template/InboxView.tpl", function(data){
		var data_str = JSON.stringify(data).escapeSpecialChars();
		app.template['InboxView'] = JSON.parse(JSON.parse(data_str));
	});
	
	$.get("static/template/PersonalView.tpl", function(data){
		var data_str = JSON.stringify(data).escapeSpecialChars();
		app.template['PersonalView'] = JSON.parse(JSON.parse(data_str));
		//app.template['PersonalView'] = data;
	});
	
	String.prototype.escapeSpecialChars = function() {
		return this.replace(/\\n/g, "")
				   .replace(/\\'/g, "")
				   .replace(/\\"/g, '\\"')
				   .replace(/\\&/g, "")
				   .replace(/\\r/g, "")
				   .replace(/\\t/g, "")
				   .replace(/\\b/g, "")
				   .replace(/\\f/g, "");
	};
	
	
	//Setting csrftoken for backbone Ajax request
	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');

	function csrfSafeMethod(method) {
		// these HTTP methods do not require CSRF protection
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	function sameOrigin(url) {
		// test that a given url is a same-origin URL
		// url could be relative or scheme relative or absolute
		var host = document.location.host; // host + port
		var protocol = document.location.protocol;
		var sr_origin = '//' + host;
		var origin = protocol + sr_origin;
		// Allow absolute or scheme relative URLs to same origin
		return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
			(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
			// or any other URL that isn't scheme relative or absolute i.e relative.
			!(/^(\/\/|http:|https:).*/.test(url));
	}
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
				// Send the token to same-origin, relative URLs only.
				// Send the token only if the method warrants CSRF protection
				// Using the CSRFToken value acquired earlier
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		}
	});
});