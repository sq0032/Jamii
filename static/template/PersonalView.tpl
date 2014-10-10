{	"main-frame-test":
		"<div id='personal-view-container'>
		</div>",
	"tree-test":
		"<div id='profile'>
			<div id='profile-header'>
				<div id='profile-name'>
					<%= user.get('name') %>
				</div>
				<button>Import from LinkedIn</button>
			</div>
			<div class='clear'></div>
			<div id='profile-left'>
				<% if( profile.pictureUrl) { %>
					<img src='<%= profile.pictureUrl %>' width='64px' height='64px'>
				<% } else { %>
					<img src='/static/img/default_profile.jpg' width='64px' height='64px'>
				<% } %>
				<div class='profile-section-bar'>Experence</div>
				<div id='profile-experence'>
					<% if( profile.educations.values ) { %>
						<% _.each( profile.educations.values, function(education){ %>
							<p><strong><%= education.degree %></strong></p>
							<p><%= education.fieldOfStudy %></p>
							<p><%= education.schoolName %></p><br>
						<% }); %>
					<% } else { %>
						No education info
					<% } %>
				</div>
			</div>
			<div id='profile-right'>
				<div class='profile-section-bar'>Expertise</div>
				<div id='profile-industry'>
					<% if( profile.industry ) { %>
						<h3><%= profile.industry %></h3>
					<% } else { %>
						No expertise
					<% } %>
				</div>
				<div class='profile-section-bar'>Summary</div>
				<div id='profile-summary'>
					<% if( profile.summary ) { %>
						<%= profile.summary %>
					<% } else { %>
						No summary
					<% } %>
				</div>
				<div class='profile-section-bar'>Skills</div>
				<div id='profile-skill'>
					<% if( profile.skills.values ) { %>
						<% _.each( profile.skills.values, function(skill){ %>
							<div class='profile-skilltag'>
								<%= skill.skill.name %>
							</div>
						<% }); %>
					<% } else { %>
						No skills
					<% } %>
				</div>
			</div>
			<div class='clear'></div>
		</div>
		",
	"main-frame":
		"<ul class='nav-tabs'>
			<li><a link='personal-view-tree'>Tree</a></li>
			<li><a link='personal-view-pitches'>Pitches</a></li>
			<li><a link='personal-view-milestones'>Milestones</a></li>
		</ul>
		<div id='personal-view-container'>
		</div>",
		
	"tree":
		"<h2>
			Mark Hsu
		</h2>
		<div id='skill-view'>
			<img src='/media/thumbnail/2-s.jpg' height='200px'>
			<button type='button' class=''>
				<span class='glyphicon glyphicon-comment'></span>
			</button>
			<button type='button' class=''>
				<span class='glyphicon glyphicon-eye-open'></span>
			</button>
			<button type='button' class=''>
				<span class='glyphicon glyphicon-edit'></span>
			</button>
		</div>
		<div id='personal-intro'>
			Nam consequat accumsan volutpat. Maecenas cursus laoreet magna, eget interdum leo molestie et. Proin congue quam dui. Nullam mollis tellus in quam lobortis, ut iaculis purus cursus. Mauris ante elit, rhoncus quis facilisis accumsan, malesuada at ipsum. Sed magna ante, facilisis lobortis eros quis, tristique accumsan augue. Suspendisse eget neque interdum, ultrices dolor sit amet, accumsan elit. Vestibulum nisl libero, posuere eget tempor vel, mattis at eros. Duis lacinia velit at magna euismod, nec malesuada leo vestibulum. Fusce non lorem vel dolor suscipit egestas. Mauris luctus tortor nec lacinia auctor. Praesent ornare rhoncus elementum.
		</div>",
		
	"pitches":
		"<h2>
			Pitches
		</h2>
		<div id='personal-team'>
		</div>",
		
	"milestones":
		"<h2>
			Milestones
		</h2>"
}