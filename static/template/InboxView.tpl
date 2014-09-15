{
	"header":
	"<div class='dropdown' style='float:left'>
		<a data-toggle='dropdown' href='#'>Dropdown trigger</a>
		<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel'>
			...
		</ul>
	</div>
	<input id='inbox-search' type='text' placeholder=' search message'></input>",
	
	"list":
	{
		"new-message-button":
		"<div id='new-message-button'>
			<span class='glyphicon glyphicon-plus'></span> New inbox message
		</div>",
		
		"box":
		"<a class='pull-left' href='#'>
			<img class='media-object' src='/media/<%=msgBox.thumbnail%>'>
		</a>
		<div class='media-body'>
			<h4 class='media-heading'>
				<% _.each(msgBox.attendants, function(attendant, index) { %>
					<% if(index>0){ %> 
						<%=attendant.name%>
					<% } %>
				<% }); %>
			</h4>
			<%= msgBox.subject %>
		</div>"
	},
	
	"message-view":
	{
		"header":
		"<div id='message-view-header'>
			<div id='message-create-date'><%= msgBox.create_datetime %></div>
			<div id='message-attendants'>
				<% _.each(msgBox.attendants, function(attendant) { %>
					<img src='/media/<%=attendant.thumbnail%>' width='64px' height='64px'>  
				<% }); %>
			</div>
			<h4 id='message-subject'>
				<%= msgBox.subject %>
			</h4>
			<div class='clear'></div>
		</div>",
		
		"container":
		"<div id='message-view-container'></div>",
		
		"message":
		"<div class='message-box'>
			<div class='message-poster'>
					<img src='/media/<%= msg.thumbnail %>' width='32px' height='32px'>
				</div>
				<div class='message-datetime'><%= msg.create_datetime %></div>
				<div class='message'>
					<%= msg.message %>
				</div>
			<div class='clear'>
			</div>
		</div>",
			
		"footer":
		"<div id='message-view-footer'>
			<textarea placeholder='reply here'></textarea>
			
			<% if(disableBtn==true) { %>
				<button type='button' class='btn btn-sm btn-primary' disabled='disabled'>Reply</button>
			<% } else { %>
				<button type='button' class='btn btn-sm btn-primary'>Reply</button>
			<% } %>
		</div>"
	},
	
	"new-message-view":
	{
		"header":
		"<div id='message-view-header'>
			<input type='text' class='form-control' placeholder='send to' disabled></input>
			<h4 id='message-subject'>
			</h4>
			<input id='message-subject-input' type='text' class='form-control' placeholder='subject'></input>
			<div class='clear'></div>
		</div>",
		
		"container":
		"<div id='user-tag-container'></div>",
		
		"user-tag":
		"<div class='user-tag'>
			
			<img src='/media/<%=usertag.thumbnail%>' alt='<%=usertag.name%>'>
			
			<div class='media-body'>
				<h4 class='media-heading' data='<%= usertag.id %>'>
					<%=usertag.name%>
				</h4>
			</div>
		<div class='clear'></div>
		</div>",
			
		"footer":
		"<div id='message-view-footer'>
			<textarea placeholder='say something'></textarea>
			<button type='button' class='btn btn-sm btn-primary'>Send</button>
		</div>"
	}
}