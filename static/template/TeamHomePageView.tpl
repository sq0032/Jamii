{
	"frame":
		"<ul class='nav-tabs'>
			<li><a link='team-view-main'>Home</a></li>
			<li><a link='team-view-workspace'>Taskboard</a></li>
			<li><a link='team-view-inbox'>Inbox</a></li>
			<li><a link='team-view-files'>Shared files</a></li>
		</ul>
		<div id='team-view-container'>
			<div id='team-view-main'>
			</div>
			<div id='team-view-workspace' style='display:none'>
			</div>
			<div id='team-view-inbox' style='display:none'>
			</div>
			<div id='team-view-files' style='display:none'>
			</div>
		</div>",
	"footer":
		"<div style='height:50px'></div>
		<div id='footer' style='background-color:000000; color:FFFFFF; height:50px; width:100%; position:fixed; bottom:0px'>
			<div class='row'>
				<div class='col-xs-2 col-xs-offset-2'><p>@2014 Conrad Center</p></div> 
				<div class='col-xs-2'><a href='#'>policy</a></div>
				<div class='col-xs-2'><a href='#'>about us</a></div>
				<div class='col-xs-2'><a href='#'>contact us</a></div>
			</div>
		</div>",
	"main":
		"<h2>
			<%=team.get('name')%>
		</h2>
		<div id='team-intro'>
			<%=team.get('introduction')%>
		</div>",
		
	"tree":
		"<h2>
			Tree
		</h2>",
		
	"pitches":
		"<h2>
			Pitches
		</h2>",
		
	"milestones":
		"<h2>
			Milestones
		</h2>"
}